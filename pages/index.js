// pages/index.js

import Head from 'next/head';
import React, { useState, useMemo, useEffect } from 'react';

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

  // compute available periods (MM/YYYY)
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

  // filter incidents by period & search
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

  // open first incident by default
  useEffect(() => {
    if (activeIndex === null && filtered.length > 0) {
      setActiveIndex(0);
    }
  }, [filtered]);

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
              const match = it.thumbnails?.match(/\/d\/([^/]+)/);
              const fileId = match?.[1];
              const imgSrc = fileId
                ? `https://drive.google.com/uc?export=view&id=${fileId}`
                : it.thumbnails;

              return (
                <div
                  key={i}
                  className={`event ${activeIndex === i ? 'selected' : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  {it.thumbnails && (
                    <div className="video-thumb">
                      <img src={imgSrc} alt="Video thumbnail" width="100%" height="200" />
                      <div className="play-icon">▶</div>
                    </div>
                  )}

                  <div className="content">
                    {it['Incident date'] && it['Incident date'] !== '-' && (
                      <span className="date-label">{formatDate(it['Incident date'])}</span>
                    )}
                    <div className="separator" />
                    <div className="incident-text" dir="rtl">
                      {(() => {
                        const full = (it['الحدث'] || it.Incident || 'No title').trim();
                        const words = full.split(/\s+/);
                        return words.length > 40 ? words.slice(0, 40).join(' ') + '…' : full;
                      })()}
                    </div>
                  </div>
                </div>
              );
            })}
            {!filtered.length && <p className="empty">No incidents to display.</p>}
          </section>
        </div>

        {active && (
          <aside className="detail-pane">
            {String(active.Visuals || '').trim().toLowerCase() === 'yes' && active.Link && (
              <div className="visual-box">
                <iframe
                  src={
                    active.Link.includes('drive.google.com')
                      ? active.Link.replace('/view?usp=sharing', '/preview')
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

            <div className="content detail-content" dir="rtl">
              <p>{active['الحدث'] || active.Incident}</p>

              <div className="meta-details">
                {formatDate(active['Post Date']) && (
                  <div className="meta-row">
                    <span className="meta-label">Posted date:</span>
                    <span className="meta-value">{formatDate(active['Post Date'])}</span>
                  </div>
                )}
                {formatTime(active['Post time']) && (
                  <div className="meta-row">
                    <span className="meta-label">Post time:</span>
                    <span className="meta-value">{formatTime(active['Post time'])}</span>
                  </div>
                )}
                {formatDate(active['Incident date']) && (
                  <div className="meta-row">
                    <span className="meta-label">Incident date:</span>
                    <span className="meta-value">{formatDate(active['Incident date'])}</span>
                  </div>
                )}
                {formatTime(active['incident time']) && (
                  <div className="meta-row">
                    <span className="meta-label">Incident time:</span>
                    <span className="meta-value">{formatTime(active['incident time'])}</span>
                  </div>
                )}
                {active['Source Type'] && active['Source Type'] !== '-' && (
                  <div className="meta-row">
                    <span className="meta-label">Source Type:</span>
                    <span className="meta-value">{active['Source Type']}</span>
                  </div>
                )}
                {active.References && active.References.startsWith('http') && (
                  <div className="meta-row">
                    <span className="meta-label">References:</span>
                    <span className="meta-value">
                      <a href={active.References} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </span>
                  </div>
                )}
              </div>

              {formatDate(active['Source Date']) && (
                <div className="meta-row">
                  <span className="meta-label">Source Date:</span>
                  <span className="meta-value">{formatDate(active['Source Date'])}</span>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      <style jsx>{`
  .container {
    display: flex;
    height: 100vh;
    overflow-x: visible;
    overflow-y: hidden;
  }

  .sidebar {
    width: 90px;
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
    overflow-x: visible;
    padding-top: 6rem; /* يفترض أن ارتفاع الهيدر مع البادينغ يصل إلى حوالي 6rem */
  }

  header {
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 100;
    text-align: center;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
    color: #800020;
  }

  body {
    background: #EFEFEF;
  }

  .search-container {
    margin-top: 1.5rem;
  }

  .search-container input {
    width: 60%;
    max-width: 800px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .timeline {
    position: relative;
    overflow-x: visible;
    max-width: 600px;
    margin: 1rem auto;
    padding-left: 4rem;
  }

  .event {
    width: 100%;
    margin-top: 2rem;
    max-width: 550px;
    box-sizing: border-box;
  }

  .video-thumb {
    position: relative;
    margin: 0 0 1rem 0;
  }

  .video-thumb img {
    width: 100%;
    max-width: 100px;
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

  .content {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    background: #fff;
    padding: 1rem;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-size: 0.875rem;
    line-height: 1.4;
    font-weight: 300;
    flex: 1;
  }

  .date-label {
    background: #e0e0e0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: bold;
    color: #333;
  }

  .separator {
    width: 1px;
    height: 1.5rem;
    background: #ccc;
    margin: 0 1rem;
  }

  .incident-text {
    font-weight: bold;
    flex: 1;
    text-align: right;
    direction: rtl;
  }

  .empty {
    text-align: center;
    color: #666;
  }

  .detail-pane {
    width: 37%;
    background: #fafafa;
    overflow-y: auto;
    padding: 1rem;
    border-left: 1px solid #ddd;
  }

  .detail-content {
    margin-top: 1rem;
    display: block;
    direction: rtl;
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

  /* عرض الميتا من اليسار لليمين */
  .detail-content .meta-details {
    direction: ltr;
    text-align: left;
  }

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

  .event.selected .content {
    border: 3px solid #800020;
  }
`}</style>

    </>
  );
}
