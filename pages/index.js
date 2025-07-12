// pages/index.js

import Head from 'next/head';
import React from 'react';

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbwTFeghc93ynbo-8s4YqrPx2ofhIINo4Zl8e9GDXVlFJ6oN4p1Gqj5pu9CWyt2ZtJyypQ/exec';

export async function getServerSideProps() {
  let incidents = [];

  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const raw = await res.json();

    // Flatten if data is under a key like "Sheet1", "Sheet2", etc.
    const values = Object.values(raw);
    if (values.length === 1 && typeof values[0] === 'object' && !Array.isArray(values[0])) {
      incidents = [values[0]]; // single row
    } else if (Array.isArray(values[0])) {
      incidents = values[0]; // array of rows
    } else {
      incidents = values;
    }

    // Optional: Filter out rows with no useful data
    incidents = incidents.filter(obj => obj && typeof obj === 'object' && Object.keys(obj).length > 0);

  } catch (error) {
    console.error('getServerSideProps error:', error);
  }

  return { props: { incidents } };
}

export default function Home({ incidents = [] }) {
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
            const incidentDate = it['Incident date'] !== '-' ? it['Incident date'] : '';
            const incidentTime = it['incident time'] !== '-' ? it['incident time'] : '';
            const postDate = it['Post Date'] !== '-' ? it['Post Date'] : '';
            const postTime = it['Post time'] !== '-' ? it['Post time'] : '';
            const visuals = String(it.Visuals || '').trim().toLowerCase();
            const link = it.Link !== '-' ? it.Link : '';
            const references = it['References'] && it['References'].startsWith('http') ? it['References'] : '';
            const title = it['الحدث']?.trim() || it['Incident']?.trim() || 'No title';

            const embedUrl = link.includes('drive.google.com')
              ? link.replace('/view?usp=sharing', '/preview')
              : link;

            return (
              <div key={i} className="event">
                <div className="marker" />
                <div className="content">

                  {/* Visuals */}
                  <div className="visual-box">
                    {visuals === 'yes' && link ? (
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

                  {/* Description */}
                  <div className="incident-box">
                    <div className="incident-text">{title}</div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid">
                    <div>
                      <p><strong>Posted date:</strong> {postDate}</p>
                      <p><strong>Post time:</strong> {postTime}</p>
                    </div>
                    <div>
                      <p><strong>Incident date:</strong> {incidentDate}</p>
                      <p><strong>Incident time:</strong> {incidentTime}</p>
                    </div>
                  </div>

                  {/* Reference Link */}
                  {references && (
                    <p className="refs">
                      🔗 References:{' '}
                      <a href={references} target="_blank" rel="noopener noreferrer">
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
