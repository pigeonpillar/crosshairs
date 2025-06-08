// components/VideoCard.jsx
'use client';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

export default function VideoCard({ videoId, title, excerpt, date, slug }) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current || !window.Vimeo) return;
    if (playerRef.current) return;
    playerRef.current = new window.Vimeo.Player(iframeRef.current, {
      id: videoId,
      background: true,
      muted: true,
      autoplay: true,
      loop: true,
    });
  }, [videoId]);

  return (
    <Link href={`/articles/${slug}`} legacyBehavior>
      <a style={{ textDecoration: 'none', color: 'inherit' }}>
        <article className="video-card">
          <div className="iframe-container">
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${videoId}?background=1&muted=1&loop=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              title={title}
            />
          </div>

          <h3 className="card-title">{title}</h3>
          <p className="card-excerpt">{excerpt}</p>
          <small className="card-date">{date}</small>

          <style jsx>{`
            .video-card {
              border: 1px solid #ddd;
              border-radius: 0px;
              padding: 1rem;
              transition: box-shadow 0.2s;
              cursor: pointer;
            }
            .video-card:hover {
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }
            .iframe-container {
              position: relative;
              padding-bottom: 56.25%;
              height: 0;
              margin-bottom: 1rem;
            }
            .iframe-container iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }

            /* ← font updates below */
            .card-title {
              margin: 0 0 0.5rem 0;
              font-family: 'Space Grotesk', 'Roboto Mono', sans-serif;
              font-weight: 400;       /* or whatever weight you prefer */
              font-size: 1.25rem;
              color: #939393;
            }
            .card-excerpt {
              margin: 0 0 0.5rem 0;
              font-family: 'Space Grotesk', 'Roboto Mono', sans-serif;
              font-weight: 300;
              color: #666;
            }
            .card-date {
              font-family: 'Space Grotesk', 'Roboto Mono', sans-serif;
              font-weight: 300;
              color: #999;
              font-size: 0.875rem;
            }
          `}</style>
        </article>
      </a>
    </Link>
  );
}
