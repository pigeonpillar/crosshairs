// pages/cards.js
import Head from 'next/head';
import Link from 'next/link';
import VideoCard from '../components/VideoCard';

export default function CardsPage() {
  return (
    <>
      <Head>
        <title>Stories – crosshairs</title>
        <meta
          name="description"
          content="All featured stories on crosshairs – video cards and summaries."
        />
      </Head>

      {/* PAGE HERO / TITLE */}
      <section
        style={{
          textAlign: 'center',
          margin: '3rem 0 2rem 0',
        }}
      >
        <h1
          style={{
            display: 'inline-block',
            fontSize: '2rem',
            color: '#00BFAE',
            fontFamily: 'Utopia, serif',
            fontWeight: 600,
          }}
        >
          All Featured Stories
        </h1>
        <div style={{ marginTop: '1rem' }}>
          <Link href="/" legacyBehavior>
            <a
              style={{
                fontFamily: 'Utopia, serif',
                fontSize: '1rem',
                color: '#555555',
                textDecoration: 'underline',
              }}
            >
              ← Back to Home
            </a>
          </Link>
        </div>
      </section>

      {/* CARDS GRID */}
      <section>
        <div className="cards-container">
          <div className="cards-grid">
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

            {/* You can add more VideoCard components here as needed */}
          </div>
        </div>
      </section>

      {/* Styled‐JSX for responsive grid container */}
      <style jsx>{`
        .cards-container {
          padding: 0 50px;
          margin-bottom: 3rem;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
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
