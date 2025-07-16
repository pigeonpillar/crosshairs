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
  let error = null;
  
  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
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
    console.error('Error fetching data:', err);
    error = err.message || 'Failed to fetch incident data';
  }
  
  return { 
    props: { 
      incidents,
      error,
      lastUpdated: new Date().toISOString()
    } 
  };
}

export default function Home({ incidents = [], error: initialError, lastUpdated }) {
  const [search, setSearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Debug: Log the first incident to see its structure
  useEffect(() => {
    if (incidents.length > 0) {
      console.log('First incident data:', incidents[0]);
      console.log('All keys in first incident:', Object.keys(incidents[0]));
    }
  }, [incidents]);

  // Function to refresh data
  const refreshData = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await window.location.reload();
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setIsRefreshing(false);
    }
  };

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
    setIsLoading(true);
    
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
    if (!q) {
      setIsLoading(false);
      return arr;
    }
    
    const result = arr.filter((it) => {
      const title = (it['الحدث'] || it.Incident || '').toLowerCase();
      const pd = it['Post Date']?.toLowerCase() || '';
      const pt = it['Post time']?.toLowerCase() || '';
      const id = it['Incident date']?.toLowerCase() || '';
      const itime = it['incident time']?.toLowerCase() || '';
      return [title, pd, pt, id, itime].some((f) => f.includes(q));
    });
    
    setIsLoading(false);
    return result;
  }, [incidents, search, selectedPeriod]);

  // open first incident by default
  useEffect(() => {
    if (activeIndex === null && filtered.length > 0) {
      setActiveIndex(0);
    }
  }, [filtered]);

  const active = activeIndex != null ? filtered[activeIndex] : null;

  // Show error state
  if (error && !incidents.length) {
    return (
      <>
        <Head>
          <title>crosshairs – Indonesian Hospital Timeline</title>
          <meta
            name="description"
            content="Vertical timeline of incidents from Google Sheets"
          />
        </Head>
        <div className="error-container">
          <div className="error-content">
            <h1>Unable to Load Timeline</h1>
            <p>{error}</p>
            <button onClick={refreshData} className="retry-button">
              {isRefreshing ? 'Refreshing...' : 'Try Again'}
            </button>
          </div>
        </div>
        <style jsx>{`
          .error-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #f5f5f5;
          }
          .error-content {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            max-width: 400px;
          }
          .error-content h1 {
            color: #800020;
            margin-bottom: 1rem;
          }
          .error-content p {
            color: #666;
            margin-bottom: 1.5rem;
          }
          .retry-button {
            background: #800020;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.2s;
          }
          .retry-button:hover:not(:disabled) {
            background: #600018;
          }
          .retry-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}</style>
      </>
    );
  }

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
            {error && (
              <div className="error-banner">
                <span>{error}</span>
                <button onClick={refreshData} className="refresh-link">
                  Refresh
                </button>
              </div>
            )}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by keyword or date…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {lastUpdated && (
                <div className="last-updated">
                  Last updated: {new Date(lastUpdated).toLocaleString()}
                </div>
              )}
            </div>
          </header>

          <section className="timeline">
            {isLoading && (
              <div className="loading-overlay">
                <div className="loader"></div>
                <p>Loading incidents...</p>
              </div>
            )}
            
            {!isLoading && filtered.map((it, i) => {
              // Debug: Log all available fields for first item
              if (i === 0) {
                console.log('Incident fields:', Object.keys(it));
                console.log('Full incident data:', it);
              }
              
              // Get the ID from the sheet data
              const imageId = it.ID || it.id || it.Id;
              
              // Create the local image path
              let imgSrc = null;
              if (imageId && imageId !== '-' && imageId !== '') {
                // Use the ID to construct the path to the local image
                imgSrc = `/${imageId}.png`;
                console.log(`Incident ${i} using local image: ${imgSrc}`);
              }

              return (
                <div
                  key={i}
                  className={`event ${activeIndex === i ? 'selected' : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <div className="event-container">
                    {imgSrc && (
                      <div className="thumbnail-container">
                        <img 
                          src={imgSrc} 
                          alt="Incident thumbnail"
                          onError={(e) => {
                            console.error('Failed to load thumbnail:', imgSrc);
                            // Hide the thumbnail container if image fails to load
                            e.target.parentElement.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log('Thumbnail loaded successfully:', imgSrc);
                          }}
                        />
                        <div className="play-icon">▶</div>
                      </div>
                    )}
                    
                    <div className={`content ${imgSrc ? 'with-thumbnail' : ''}`}>
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
                </div>
              );
            })}
            {!isLoading && !filtered.length && (
              <p className="empty">
                {search || selectedPeriod 
                  ? 'No incidents found matching your filters.' 
                  : 'No incidents to display.'}
              </p>
            )}
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
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<p style="padding: 1rem; text-align: center; color: #666;">Unable to load visual content</p>';
                  }}
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
    padding-top: 0rem;
    position: relative;
  }

  header {
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 100;
    text-align: center;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(3, 3, 3, 0.1);
  }

  h1 {
    margin: 1rem;
    font-size: 2.5rem;
    color:rgb(0, 0, 0);
  }

  body {
    background:rgb(96, 95, 95);
  }

  .search-container {
    margin-top: 0.1rem;
  }

  .search-container input {
    width: 60%;
    max-width: 800px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .last-updated {
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.5rem;
  }

  .error-banner {
    background: #fff3cd;
    color: #856404;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin: 0.5rem auto;
    max-width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .refresh-link {
    background: none;
    border: none;
    color:rgb(0, 0, 0);
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.875rem;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #800020;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-overlay p {
    margin-top: 1rem;
    color: #666;
  }

  .timeline {
    position: relative;
    overflow-x: visible;
    max-width: 600px;
    margin: 1rem auto;
    padding-left: 4rem;
    min-height: 400px;
  }

  .event {
    width: 100%;
    margin-top: 2rem;
    max-width: 550px;
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .event:hover {
    transform: translateX(-5px);
  }

  .event-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-direction: row-reverse;
  }

  .thumbnail-container {
    position: relative;
    flex-shrink: 0;
    width: 120px;
    height: 80px;
    background: #f0f0f0;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .thumbnail-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(0, 0, 0, 0.6);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
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

  .content.with-thumbnail {
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
    padding: 2rem;
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
    min-height: 200px;
    background: #f5f5f5;
  }

  a {
    color: gray;
    text-decoration: underline;
  }

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

  .event.selected .event-container .content {
    border: 3px solid #800020;
  }
`}</style>

    </>
  );
}