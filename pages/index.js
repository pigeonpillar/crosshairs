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
              fontSize: '2.5rem',
              color: '#FFFFFF',
              backgroundColor: '#00BFAE',
              padding: '0.25rem 0.5rem', // adjust to make the highlight thinner or thicker
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
        {/* Wrap heading + grid in a container with 50px left/right padding */}
        <div style={{ padding: '0 50px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#D3D3D3' }}>
            Featured Stories
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Card #1 */}
            <VideoCard
              videoId="1065734388"
              title="Geolocating Change in Gaza"
              excerpt="A step-by-step account of how satellite imagery and ground testimony reveal damage patterns."
              date="May 15, 2025"
              slug="geolocation-gaza"
            />

            {/* Card #2 */}
            <VideoCard
              videoId="1049735308"
              title="Tracing Fire-Damage in Syria"
              excerpt="How we used 3D modeling and open-source footage to map destruction timelines."
              date="April 28, 2025"
              slug="forensic-map-syria"
            />

            {/* Card #3 */}
            <VideoCard
              videoId="1044162347"
              title="Examining Hospital Attacks"
              excerpt="Using witness testimonies and geospatial data to reconstruct incidents."
              date="March 10, 2025"
              slug="analysis-hospital-attacks"
            />
          </div>
        </div>
      </section>

      {/* Styled-JSX for the navigation “buttons” under the title */}
      <style jsx>{`
        .nav-buttons {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1rem; /* space above the buttons */
        }
        .nav-button {
          display: inline-block;            /* ensures border-bottom sits under text */
          font-size: 1.25rem;
          color: #555555;
          text-decoration: none;             /* remove default underline */
          padding-bottom: 0.25rem;           /* gap before underline */
          cursor: pointer;
        }
        .nav-button:hover,
        .nav-button:active {
          border-bottom: 2px solid #00BFAE;  /* teal underline on hover/click */
        }
      `}</style>
    </>
  );
}
