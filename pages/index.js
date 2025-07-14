// pages/index.js

import Head from 'next/head';
import React, { useState, useMemo } from 'react';

// your working sheet script URL
const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbwTFeghc93ynbo-8s4YqrPx2ofhIINo4Zl8e9GDXVlFJ6oN4p1Gqj5pu9CWyt2ZtJyypQ/exec';

// helper to format ISO date → DD/MM/YYYY
function formatDate(iso) {
  if (!iso || iso === '-') return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-GB');
}

// helper to format ISO time → HH:mm
function formatTime(iso) {
  if (!iso || iso === '-') return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export async function getServerSideProps() {
  let incidents = [];
  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const raw = await res.json();
    const values = Object.values(raw);
    if (
      values.length === 1 &&
      typeof values[0] === 'object' &&
      !Array.isArray(values[0])
    ) {
      incidents = [values[0]];
    } else if (Array.isArray(values[0])) {
      incidents = values[0];
    } else {
      incidents = values;
    }
    incidents = incidents.filter((obj) => obj && Object.keys(obj).length > 0);
  } catch (err) {
    console.error(err);
  }
  return { props: { incidents } };
}

export default function Home({ incidents = [] }) {
  const [search, setSearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  // compute month/year periods for sidebar
  const periods = useMemo(() => {
    const set = new Set();
    incidents.forEach((it) => {
      const raw = it['Incident date'];
      if (raw && raw !== '-') {
        const d = new Date(raw);
        if (!isNaN(d)) {
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const yyyy = d.getFullYear();
          set.add(`${mm}/${yyyy}`);
        }
      }
    });
    return Array.from(set).sort((a, b) => {
      const [ma, ya] = a.split('/');
      const [mb, yb] = b.split('/');
      return new Date(`${ya}-${ma}-01`) - new Date(`${yb}-${mb}-01`);
    });
  }, [incidents]);

  // apply sidebar & search filtering
  const filtered = useMemo(() => {
    let arr = incidents;
    if (selectedPeriod) {
      arr = arr.filter((it) => {
        const d = new Date(it['Incident date']);
        if (isNaN(d)) return false;
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${mm}/${yyyy}` === selectedPeriod;
      });
    }
    const q = search.trim().toLowerCase();
    if (!q) return arr;
    return arr.filter((it) => {
      const title = (it['الحدث'] || it.Incident || '').toLowerCase();
      const pd = it['Post Date']?.toLowerCase() || '';
      const pt = it['Post time']?.toLowerCase() || '';
      const id = it['Incident date']?.toLowerCase() || '';
      const itime = it['incident time']?.toLowerCase() || '';
      return [title, pd, pt, id, itime].some((f) => f.includes(q));
    });
  }, [incidents, search, selectedPeriod]);

  const active = activeIndex != null ? filtered[activeIndex] : null;

  return (
    <>
      <Head>
        <title>crosshairs – Indonesian Hospital Timeline</title>
        <meta
          name="description"
          content="Vertical timeline of incidents from Google Sheets"
        />
      </Head>

      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <button
            className={!selectedPeriod ? 'active' : ''}
            onClick={() => setSelectedPeriod('')}
          >
            All
          </button>
          {periods.map((p) => (
            <button
              key={p}
              className={p === selectedPeriod ? 'active' : ''}
              onClick={() => setSelectedPeriod(p)}
            >
              {p}
            </button>
          ))}
        </aside>

        {/* Main timeline area */}
        <div className="main-area">
          <header>
            <h1>Indonesian Hospital Timeline</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by keyword or date…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </header>

          <section className="timeline">
            {filtered.map((it, i) => {
              // 1) extract Drive file ID from it.thumbnails
              const match = it.thumbnails?.match(/\/d\/([^/]+)/);
              const fileId = match?.[1];
              // 2) build direct img URL if we found an ID
              const imgSrc = fileId
                ? `https://drive.google.com/uc?export=view&id=${fileId}`
                : it.thumbnails;

              return (
                <div
                  key={i}
                  className={`event ${
                    activeIndex === i ? 'selected' : ''
                  }`}
                  onClick={() => setActiveIndex(i)}
                >
                  {/* render the thumbnail if present */}
                  {it.thumbnails && (
                    <div className="video-thumb">
                      <img
                        src={imgSrc}
                        alt="Video thumbnail"
                        width="100%"
                        height="200"
                      />
                      <div className="play-icon">▶</div>
                    </div>
                  )}

                  <div className="content">
                    <div className="incident-text">
                      {(() => {
                        const full = (
                          it['الحدث'] ||
                          it.Incident ||
                          'No title'
                        ).trim();
                        const words = full.split(/\s+/);
                        return words.length > 40
                          ? words.slice(0, 40).join(' ') + '…'
                          : full;
                      })()}
                    </div>
                  </div>
                </div>
              );
            })}
            {!filtered.length && (
              <p className="empty">No incidents to display.</p>
            )}
          </section>
        </div>

        {/* Detail pane */}
        {active && (
          <aside className="detail-pane">
            {String(active.Visuals || '').trim().toLowerCase() ===
              'yes' &&
              active.Link && (
                <div className="visual-box">
                  <iframe
                    src={
                      active.Link.includes('drive.google.com')
                        ? active.Link.replace(
                            '/view?usp=sharing',
                            '/preview'
                          )
                        : active.Link
                    }
                    title="detail-visual"
                    width="100%"
                    height="360"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

            <div className="content detail-content">
              <p dir="rtl">{active['الحدث'] || active.Incident}</p>
              <div className="meta-details">
                {formatDate(active['Post Date']) && (
                  <div className="meta-row">
                    <span className="meta-label">Posted date:</span>
                    <span className="meta-value">
                      {formatDate(active['Post Date'])}
                    </span>
                  </div>
                )}
                {formatTime(active['Post time']) && (
                  <div className="meta-row">
                    <span className="meta-label">Post time:</span>
                    <span className="meta-value">
                      {formatTime(active['Post time'])}
                    </span>
                  </div>
                )}
                {formatDate(active['Incident date']) && (
                  <div className="meta-row">
                    <span className="meta-label">Incident date:</span>
                    <span className="meta-value">
                      {formatDate(active['Incident date'])}
                    </span>
                  </div>
                )}
                {formatTime(active['incident time']) && (
                  <div className="meta-row">
                    <span className="meta-label">Incident time:</span>
                    <span className="meta-value">
                      {formatTime(active['incident time'])}
                    </span>
                  </div>
                )}
                {active['Source Type'] &&
                  active['Source Type'] !== '-' && (
                    <div className="meta-row">
                      <span className="meta-label">Source Type:</span>
                      <span className="meta-value">
                        {active['Source Type']}
                      </span>
                    </div>
                  )}
                {active.References &&
                  active.References.startsWith('http') && (
                    <div className="meta-row">
                      <span className="meta-label">References:</span>
                      <span className="meta-value">
                        <a
                          href={active.References}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </aside>
        )}
      </div>

      <style jsx>{`
        /* layout */
        .container {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }
        .sidebar {
          width: 160px;
          background: #f0f0f0;
          overflow-y: auto;
          padding: 1rem 0;
        }
        .sidebar button {
          display: block;
          width: 100%;
          padding: 0.5rem 1rem;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
        }
        .sidebar button.active,
        .sidebar button:hover {
          background: #ddd;
        }

        .main-area {
          flex: 1;
          overflow-y: auto;
        }
        header {
          text-align: center;
          padding: 1rem 0;
        }
        h1 {
          margin: 0;
          font-size: 1.75rem;
        }
        .search-container {
          margin-top: 0.5rem;
        }
        .search-container input {
          width: 60%;
          max-width: 400px;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        /* timeline center-left */
        .timeline {
          position: relative;
          max-width: 600px;
          margin: 2rem auto;
          padding-left: 2rem;
          border-left: 3px solid gray;
        }
        .event {
          position: relative;
          margin-bottom: 1rem;
          cursor: pointer;
        }

        /* thumbnail styling */
        .video-thumb {
          position: relative;
          margin-bottom: 0.5rem;
        }
        .video-thumb img {
          width: 100%;
          border-radius: 4px;
        }
        .play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          color: rgba(255, 255, 255, 0.8);
        }

        /* content box */
        .content {
          padding-left: 1rem;
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          font-size: 0.875rem;
          line-height: 1.4;
          font-weight: 300;
        }
        .incident-text {
          font-weight: bold;
        }
        .empty {
          text-align: center;
          color: #666;
        }

        /* detail pane */
        .detail-pane {
          width: 40%;
          background: #fafafa;
          overflow-y: auto;
          padding: 1rem;
          border-left: 1px solid #ddd;
        }
        .detail-content {
          margin-top: 1rem;
        }
        .visual-box {
          margin-bottom: 1rem;
          border: 2px solid gray;
          border-radius: 4px;
          overflow: hidden;
        }
        a {
          color: gray;
          text-decoration: underline;
        }

        /* meta-details styling */
        .meta-details {
          border-top: 1px solid #ddd;
          margin: 1rem 0;
          padding-top: 1rem;
        }
        .meta-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }
        .meta-row:last-child {
          border-bottom: none;
        }
        .meta-label {
          font-weight: bold;
          color: #555;
        }
        .meta-value {
          color: #333;
        }
      `}</style>
    </>
  );
}
