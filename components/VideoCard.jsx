// components/VideoCard.jsx
'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * VideoCard renders:
 *  • a small Vimeo iframe above the text
 *  • on hover → plays ~5 seconds, then pauses
 *  • on mouse leave → immediately pauses
 *  • wraps the entire card in a Link so clicking anywhere navigates
 *
 * Props:
 *  • videoId (string) → the Vimeo video ID (e.g. "1065734388")
 *  • title   (string) → card title
 *  • excerpt (string) → card excerpt/description
 *  • date    (string) → card date (e.g. "May 15, 2025")
 *  • slug    (string) → route slug for the link (e.g. "geolocation-gaza")
 */
export default function VideoCard({ videoId, title, excerpt, date, slug }) {
  const iframeRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Wait until Vimeo Player API is loaded (we include it in <Head> of index.js)
    if (!iframeRef.current || !window.Vimeo) return;

    // Instantiate a Vimeo player for this iframe
    const vimeoPlayer = new window.Vimeo.Player(iframeRef.current, {
      id: videoId,
      muted: true,      // mute by default so hover-play doesn’t blast audio
      autoplay: false,  // do NOT autoplay on load
      background: false,
      loop: false,
    });

    setPlayer(vimeoPlayer);

    return () => {
      vimeoPlayer.unload().catch(() => {});
    };
  }, [videoId]);

  // Called when mouse enters the card → play 5 seconds, then pause
  const handleMouseEnter = () => {
    if (!player) return;
    player.setCurrentTime(0).then(() => {
      player.play().catch(() => {});
      setTimeout(() => {
        player.getPaused().then((paused) => {
          if (!paused) {
            player.pause().catch(() => {});
          }
        });
      }, 5000);
    });
  };

  // Called when mouse leaves → pause immediately
  const handleMouseLeave = () => {
    if (!player) return;
    player.pause().catch(() => {});
  };

  return (
    <Link href={`/articles/${slug}`} legacyBehavior>
      <a style={{ textDecoration: 'none', color: 'inherit' }}>
        <article
          style={{
            border: '1px solid #ddd',
            borderRadius: '0px',
            padding: '1rem',
            transition: 'box-shadow 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            handleMouseEnter();
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            handleMouseLeave();
          }}
        >
          {/* Vimeo iframe container */}
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              marginBottom: '1rem',
            }}
          >
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&muted=1`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title={title}
            />
          </div>

          {/* Text content beneath the video snippet */}
          <h3 style={{ marginTop: 0, color: '#939393', fontFamily: 'Utopia, serif', fontWeight: 400 }}>
            {title}
          </h3>
          <p style={{ color: '#666', fontFamily: 'Utopia, serif', fontWeight: 300 }}>{excerpt}</p>
          <small style={{ color: '#999', fontFamily: 'Utopia, serif', fontWeight: 300 }}>{date}</small>
        </article>
      </a>
    </Link>
  );
}
