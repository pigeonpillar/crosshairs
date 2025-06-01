// pages/index.js (no changes needed here)
import Head from 'next/head';
import React from 'react';
import VideoCard from '../components/VideoCard';
import Link from 'next/link';

export default function Home() {
  const stories = [
    {
      videoId: '1089467631',
      title: 'An Attack on a Civilian Car in Jenin City',
      excerpt:
        'A step-by-step account of how satellite imagery and ground testimony reveal damage patterns.',
      date: 'May 15, 2025',
      slug: 'jenin-car',
    },
    {
      videoId: '1089468404',
      title: 'A Killing in Beita - Nablus',
      excerpt:
        'How we used 3D modeling and open-source footage to map destruction timelines.',
      date: 'April 28, 2025',
      slug: 'ameed',
    },
    {
      videoId: '1089473539',
      title: 'Mapping Settler Attacks in the Occupied West Bank',
      excerpt:
        'Using witness testimonies and geospatial data to reconstruct incidents.',
      date: 'March 10, 2025',
      slug: 'shatha-sabbagh',
    },
  ];

  return (
    <>
      <Head>
        <title>crosshairs – Investigations &amp; Geolocation Analysis</title>
        <meta
          name="description"
          content="In-depth visual investigations, geolocations, and analysis articles."
        />
        <script src="https://player.vimeo.com/api/player.js" async></script>
      </Head>

      {/* HERO / Title Section */}
      <section
        style={{
          textAlign: 'center',
          margin: '4rem 0',
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '1.9rem',
              color: '#FFFFFF',
              backgroundColor: '#00BFAE',
              padding: '0.25rem 0.5rem',
              fontFamily: 'Utopia, serif',
            }}
          >
            crosshairs
          </span>
        </h1>

        <div className="nav-buttons">
          <Link href="/analysis" legacyBehavior>
            <a className="nav-button">Analysis</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="nav-button">About</a>
          </Link>
        </div>
      </section>

      {/* FEATURED STORIES / CARDS */}
      <section>
        <div className="cards-container">
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#D3D3D3' }}>
            Featured Stories
          </h2>

          <div className="cards-grid">
            {stories.map((story) => (
              <VideoCard
                key={story.slug}
                videoId={story.videoId}
                title={story.title}
                excerpt={story.excerpt}
                date={story.date}
                slug={story.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .cards-container {
          padding: 0 50px;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .nav-buttons {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1rem;
        }
        .nav-button {
          display: inline-block;
          font-size: 1.25rem;
          color: #555555;
          text-decoration: none;
          padding-bottom: 0.25rem;
          cursor: pointer;
          font-family: 'Utopia', serif;
        }
        .nav-button:hover,
        .nav-button:active {
          border-bottom: 2px solid #00BFAE;
        }
        @media (max-width: 600px) {
          .cards-container {
            padding: 0 10px;
          }
        }
      `}</style>
    </>
  );
}
