import os
import re
import pandas as pd
import requests

# --- social-platform SDKs / scrapers ---
from telethon.sync import TelegramClient
from facebook_scraper import get_posts
import instaloader
import snscrape.modules.twitter as sntwitter
from TikTokApi import TikTokApi

# ——— CONFIG ———
CSV_PATH     = 'links.csv'
OUTPUT_DIR   = 'downloads'

# — Telegram (Telethon) —
TG_API_ID    = YOUR_API_ID_HERE       # from https://my.telegram.org
TG_API_HASH  = 'YOUR_API_HASH_HERE'
TG_SESSION   = 'telegram.session'

tg_client = TelegramClient(TG_SESSION, TG_API_ID, TG_API_HASH)

# — Instagram (Instaloader) —
insta = instaloader.Instaloader(
    download_videos=True,
    save_metadata=False,
    dirname_pattern=os.path.join(OUTPUT_DIR, 'instagram')
)

# — TikTok —
tt_api = TikTokApi.get_instance()

# ——— HELPERS ———
def download_file(url, subfolder=''):
    os.makedirs(os.path.join(OUTPUT_DIR, subfolder), exist_ok=True)
    fname = url.split('?')[0].rstrip('/').split('/')[-1]
    path = os.path.join(OUTPUT_DIR, subfolder, fname)
    resp = requests.get(url, stream=True)
    resp.raise_for_status()
    with open(path, 'wb') as f:
        for chunk in resp.iter_content(16_384):
            f.write(chunk)
    print(f"✔ {path}")
    return path

# ——— PLATFORM FUNCTIONS ———
def download_telegram(msg_url):
    tg_client.start()
    # Telethon can parse public message URLs directly
    msg = tg_client.get_messages(msg_url)
    if not msg or not msg[0].media:
        print("⚠ no media found:", msg_url)
        return
    msg[0].download_media(os.path.join(OUTPUT_DIR, 'telegram'))
    print(f"✔ Telegram → {msg_url}")

def download_facebook(post_url):
    # facebook-scraper yields a single dict for a single URL
    for post in get_posts(post_urls=[post_url], options={"comments": False}):
        # images field is a list; video is a single URL
        media_urls = post.get('images', []) + ([post['video']] if post.get('video') else [])
        if not media_urls:
            print("⚠ no media found:", post_url)
        for url in media_urls:
            download_file(url, 'facebook')
        break

def download_instagram(post_url):
    # extract shortcode, e.g. https://www.instagram.com/p/SHORTCODE/
    m = re.search(r"/p/([^/]+)/", post_url)
    if not m:
        print("⚠ can't parse shortcode:", post_url); return
    shortcode = m.group(1)
    post = instaloader.Post.from_shortcode(insta.context, shortcode)
    insta.download_post(post, target=os.path.join(OUTPUT_DIR, 'instagram'))

def download_x(tweet_url):
    m = re.search(r"twitter\.com/.+?/status/(\d+)", tweet_url)
    if not m:
        print("⚠ can't parse tweet ID:", tweet_url); return
    tweet_id = m.group(1)
    scraper = sntwitter.TwitterTweetScraper(tweet_id)
    for tweet in scraper.get_items():
        if not tweet.media:
            print("⚠ no media:", tweet_url)
            return
        for media in tweet.media:
            if hasattr(media, 'fullUrl'):         # Photo
                download_file(media.fullUrl, 'twitter')
            elif hasattr(media, 'variants'):      # Video variants
                # pick the highest bitrate
                vid = max(media.variants, key=lambda v: v.bitrate or 0)
                download_file(vid.url, 'twitter')
        return

def download_tiktok(tt_url):
    # TikTokApi can fetch bytes directly
    video_bytes = tt_api.video(url=tt_url)
    # pick an ID-based filename
    tt_id = re.search(r"/video/(\d+)", tt_url)
    fname = (tt_id.group(1) if tt_id else tt_url.split("/")[-1]) + ".mp4"
    path = os.path.join(OUTPUT_DIR, 'tiktok', fname)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(video_bytes)
    print(f"✔ TikTok → {path}")

# ——— MAIN ———
def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    df = pd.read_csv(CSV_PATH)
    for url in df['link'].dropna():
        try:
            if 't.me' in url or 'telegram.me' in url:
                download_telegram(url)
            elif 'facebook.com' in url:
                download_facebook(url)
            elif 'instagram.com' in url:
                download_instagram(url)
            elif 'twitter.com' in url or 'x.com' in url:
                download_x(url)
            elif 'tiktok.com' in url:
                download_tiktok(url)
            else:
                # fallback: just grab the raw URL
                download_file(url, 'other')
        except Exception as e:
            print(f"❌ ERROR on {url}: {e}")

if __name__ == '__main__':
    main()
