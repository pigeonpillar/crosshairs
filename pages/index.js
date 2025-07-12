// pages/index.js

import Head from 'next/head';
import React from 'react';

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxHEBZ25UNQHYp1McBgZS_vPsoXgJh6ENdMdtNKcP6CZobnjzsA8eJwl6wOxKSGjpJcOw/exec';

export async function getServerSideProps() {
  let raw = null;
  let incidents = [];

  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    raw = await res.json();

    // 1) If it’s already an array of objects…
    if (Array.isArray(raw)) {
      incidents = raw;
    }
    // 2) If it’s under a “records” key…
    else if (Array.isArray(raw.records)) {
      incidents = raw.records;
    }
    // 3) If every value is an array (column-arrays), pivot into rows…
    else if (
      raw &&
      typeof raw === 'object' &&
      Object.values(raw).length > 0 &&
      Object.values(raw).every((col) => Array.isArray(col))
    ) {
      const cols = Object.keys(raw);
      const rowCount = raw[cols[0]].length;
      incidents = Array.from({ length: rowCount }, (_, i) => {
        const obj = {};
        cols.forEach((col) => {
          obj[col] = raw[col][i];
        });
        return obj;
      });
    }
    // 4) Fallback: take whatever values you can
    else if (raw && typeof raw === 'object') {
      incidents = Object.values(raw);
    }

    // Sort newest first by Incident date/time
    incidents.sort((a, b) => {
      const dA = new Date(`${a['Incident date']}T${a['incident time']}`);
      const dB = new Date(`${b['Incident date']}T${b['incident time']}`);
      return dB - dA;
    });
  } catch (error) {
    console.error('getServerSideProps error:', error);
  }

  return { props: { incidents } };
}

export default function Home({ incidents }) {
  return (
    <>
      <Head>
        <title>crosshairs – Incident Timeline</title>
        <meta
          name="description"
          content="Vertical timeline of incidents from Google Sheets"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,700;1,100;1,200;1,300;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        <h1 className="page-title">Incident Timeline</h1>
        <section className="timeline">
          {incidents.map((it, i) => (
            <div key={i} className="event">
              <div className="marker" />
              <div className="content">
                <time>
                  {it['Incident date']} @ {it['incident time']}
                </time>
                <h3>{it['الحدث'] || it.Incident}</h3>
                <p>
                  <strong>Posted:</strong> {it['Post Date']} @ {it['Post time']}
                </p>
                {it.Visuals && <p>🎥 Visuals: {it.Visuals}</p>}
                <p>🔊 Audio?: {it['Audio?']}</p>
                <p>
                  🔗 Link:{' '}
                  <a href={it.Link} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </p>
                <p>
                  📁 Folder/File:{' '}
                  <a
                    href={it['Folder/File']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open
                  </a>
                </p>
                <p>📑 Source Type: {it['Source Type']}</p>
                <p>🔗 References: {it.References}</p>
              </div>
            </div>
          ))}
          {incidents.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>
              No incidents to display.
            </p>
          )}
        </section>
      </main>

      <style jsx>{`
        .page-title {
          text-align: center;
          margin: 2rem 0;
          font-family: 'Space Grotesk', sans-serif;
        }
        .timeline {
          position: relative;
          margin: 2rem auto;
          max-width: 800px;
          padding-left: 2rem;
          border-left: 3px solid #00bfae;
        }
        .event {
          position: relative;
          margin-bottom: 2rem;
        }
        .marker {
          position: absolute;
          left: -10px;
          top: 4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00bfae;
        }
        .content {
          padding-left: 1rem;
          font-family: 'Roboto Mono', monospace;
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 1rem;
        }
        .content time {
          font-size: 0.85rem;
          color: #666;
        }
        .content h3 {
          margin: 0.5rem 0;
          font-family: 'Space Grotesk', sans-serif;
          color: #333;
        }
        .content p {
          margin: 0.25rem 0;
          line-height: 1.4;
        }
        .content a {
          color: #00bfae;
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          .timeline {
            padding-left: 1rem;
            border-left-width: 2px;
          }
          .content {
            padding: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
