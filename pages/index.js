// pages/index.js
import Head from 'next/head';
import VideoCard from '../components/VideoCard';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>crosshairs – Investigations &amp; Geolocation Analysis</title>
        <meta
          name="description"
          content="In-depth visual investigations, geolocations, and analysis articles."
        />
        {/* Load the Vimeo Player API so VideoCard can control playback */}
        <script
          src="https://player.vimeo.com/api/player.js"
          async
        ></script>
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
              padding: '0.25rem 0.5rem',      // highlight thickness
              fontFamily: 'Utopia, serif',   // use Utopia if available
            }}
          >
            crosshairs
          </span>
        </h1>

        {/* Navigation “buttons” below the title */}
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
        {/* Use className instead of inline style for padding */}
        <div className="cards-container">
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#D3D3D3' }}>
            Featured Stories
          </h2>

          <div className="cards-grid">
            {/* Card #1 */}
            <VideoCard
              videoId="1089467631"
              title="An Attack on a civilian car in Jenin City"
              excerpt="A step-by-step account of how satellite imagery and ground testimony reveal damage patterns."
              date="May 15, 2025"
              slug="jenin-car"
            />

            {/* Card #2 */}
            <VideoCard
              videoId="1089468404"
              title="A killing in Beita - Nablus"
              excerpt="How we used 3D modeling and open-source footage to map destruction timelines."
              date="April 28, 2025"
              slug="ameed"
            />

            {/* Card #3 */}
            <VideoCard
              videoId="1089473539"
              title="Mapping Settler Attacks in the Occupied West Bank"
              excerpt="Using witness testimonies and geospatial data to reconstruct incidents."
              date="March 10, 2025"
              slug="shatha-sabbagh"
            />
          </div>
        </div>
      </section>

      {/* Styled-JSX (including responsive media query) */}
      <style jsx>{`
        /* Container that wraps the “Featured Stories” heading + grid */
        .cards-container {
          padding: 0 50px; /* desktop: 50px on left/right */
        }

        /* Grid for video cards */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        /* Navigation buttons under the title */
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
          font-family: Utopia, serif;
        }
        .nav-button:hover,
        .nav-button:active {
          border-bottom: 2px solid #00BFAE;
        }

        /* ===== Responsive adjustments for phones ===== */
        @media (max-width: 600px) {
          .cards-container {
            padding: 0 10px; /* drop from 50px to 10px on small screens */
          }
        }
      `}</style>
    </>
  );
}
