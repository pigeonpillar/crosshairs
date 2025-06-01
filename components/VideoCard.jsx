// components/VideoCard.jsx
'use client';
import React, { useRef, useEffect, useState } from 'react';
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
  const timeoutRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!iframeRef.current || !window.Vimeo) return;
    if (playerRef.current) return; // already initialized

    const vimeoPlayer = new window.Vimeo.Player(iframeRef.current, {
      id: videoId,
      background: true, // hides UI elements
      muted: true,
      autoplay: false,
      loop: false,
    });
    playerRef.current = vimeoPlayer;
  }, [videoId]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isHovering) {
      player
        .ready()
        .then(() => player.setCurrentTime(0))
        .then(() => player.play().catch(() => {}))
        .catch(() => {});

      timeoutRef.current = setTimeout(() => {
        player.pause().catch(() => {});
      }, 10000);
    } else {
      player.pause().catch(() => {});
      player.setCurrentTime(0).catch(() => {});
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovering]);

  return (
    <Link href={`/articles/${slug}`} legacyBehavior>
      <a style={{ textDecoration: 'none', color: 'inherit' }}>
        <article
          className="video-card"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="iframe-container">
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${videoId}?background=1&muted=1`}
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
