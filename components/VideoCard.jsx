// components/VideoCard.jsx
'use client';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

/**
 * Props:
 *  • videoId (string) → Vimeo ID
 *  • title   (string)
 *  • excerpt (string)
 *  • date    (string)
 *  • slug    (string)
 */
export default function VideoCard({ videoId, title, excerpt, date, slug }) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current || !window.Vimeo) return;
    if (playerRef.current) return; // already initialized

    // Initialize the Vimeo player, autoplaying and looping
    const vimeoPlayer = new window.Vimeo.Player(iframeRef.current, {
      id: videoId,
      background: true, // hides UI elements
      muted: true,
      autoplay: true,
      loop: true,
    });
    playerRef.current = vimeoPlayer;
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

          <h3 className="title">{title}</h3>
          <p className="excerpt">{excerpt}</p>
          <small className="date">{date}</small>

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
              padding-bottom: 56.25%; /* 16:9 */
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
            .title {
              margin-top: 0;
              color: #939393;
              font-family: 'Utopia', serif;
              font-weight: 400;
            }
            .excerpt {
              color: #666;
              font-family: 'Utopia', serif;
              font-weight: 300;
            }
            .date {
              color: #999;
              font-family: 'Utopia', serif;
              font-weight: 300;
            }
          `}</style>
        </article>
      </a>
    </Link>
  );
}
