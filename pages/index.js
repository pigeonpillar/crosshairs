// pages/index.js

import Head from 'next/head';
import React from 'react';

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbwTFeghc93ynbo-8s4YqrPx2ofhIINo4Zl8e9GDXVlFJ6oN4p1Gqj5pu9CWyt2ZtJyypQ/exec';

export async function getServerSideProps() {
  let raw = null;
  let incidents = [];

  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    raw = await res.json();

    if (Array.isArray(raw)) incidents = raw;
    else if (Array.isArray(raw.records)) incidents = raw.records;
    else if (
      raw && typeof raw === 'object' &&
      Object.values(raw).length > 0 &&
      Object.values(raw).every(col => Array.isArray(col))
    ) {
      const cols = Object.keys(raw);
      const rowCount = raw[cols[0]].length;
      incidents = Array.from({ length: rowCount }, (_, i) => {
        const obj = {};
        cols.forEach(col => { obj[col] = raw[col][i]; });
        return obj;
      });
    } else if (raw && typeof raw === 'object') {
      incidents = Object.values(raw);
    }

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
        <meta name="description" content="Vertical timeline of incidents from Google Sheets" />
      </Head>

      <main>
        <h1 className="page-title">Incident Timeline</h1>
        <section className="timeline">
          {incidents.map((it, i) => {
            // prepare embed URL
            console.log('Visuals & Link for index', i, it.Visuals, it.Link);
                  const embedUrl = it.Link && it.Link.includes('drive.google.com')
              ? it.Link.replace('/view?usp=sharing', '/preview')
              : it.Link;

            return (
              <div key={i} className="event">
                <div className="marker" />
                <div className="content">

                  {/* Visual material box */}
                  <div className="visual-box">
                    {String(it.Visuals).trim().toLowerCase() === 'yes' && it.Link ? (
                      <iframe
                        src={embedUrl}
                        title={`Visual material ${i}`}
                        width="100%"
                        height="360"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="no-visual">No visual material</div>
                    )}
                  </div>

                  {/* Incident description box */}
                  <div className="incident-box">
                    <div className="incident-text">
                      {it['الحدث']?.trim() || it.Incident?.trim() || 'No title'}
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid">
                    <div>
                      <p><strong>Posted date:</strong> {it['Post Date']}</p>
                      <p><strong>Post time:</strong> {it['Post time']}</p>
                    </div>
                    <div>
                      <p><strong>Incident date:</strong> {it['Incident date']}</p>
                      <p><strong>Incident time:</strong> {it['incident time']}</p>
                    </div>
                  </div>

                  {/* References link */}
                  {it['References']?.startsWith('http') && (
                    <p className="refs">
                      🔗 References:{' '}
                      <a href={it['References']} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
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
        }
        .timeline {
          position: relative;
          margin: 2rem auto;
          max-width: 800px;
          padding-left: 2rem;
          border-left: 3px solid red;
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
          background: red;
        }
        .content {
          padding-left: 1rem;
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 1rem;
        }
        .visual-box {
          margin-bottom: 1rem;
          border: 2px solid red;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        }
        .no-visual {
          color: #666;
        }
        .incident-box {
          margin-bottom: 1rem;
          padding: 0.75rem;
          border: 2px solid red;
          border-radius: 4px;
          background: #ffe5e5;
        }
        .incident-text {
          font-size: 1rem;
          font-weight: bold;
        }
        .grid {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .grid div p {
          margin: 0.25rem 0;
        }
        .refs {
          margin-top: 0.5rem;
        }
        .refs a {
          color: red;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
