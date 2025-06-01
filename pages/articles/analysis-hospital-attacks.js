// pages/articles/analysis-hospital-attacks.js
import Head from 'next/head';
import Link from 'next/link';

export default function AnalysisHospitalAttacks() {
  return (
    <>
      <Head>
        <title>Examining Hospital Attacks – crosshairs</title>
        <meta
          name="description"
          content="Using witness testimonies and geospatial data to reconstruct incidents of hospital attacks."
        />
      </Head>

      <main
        style={{
          maxWidth: '800px',
          margin: '3rem auto',
          padding: '0 1rem',
          fontFamily: 'Utopia, serif',
          lineHeight: '1.6',
          color: '#333333',
        }}
      >
        {/* Title with teal highlight */}
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#00BFAE',
              color: '#FFFFFF',
              padding: '0.25rem 0.5rem',
              fontFamily: 'Utopia, serif',
              fontWeight: 600,
            }}
          >
            Examining Hospital Attacks
          </span>
        </h1>

        {/* Article content */}
        <p>
          In this investigation, we combine geospatial analysis with survivor and witness testimonies to reconstruct attacks on
          medical facilities. By triangulating videos, social media posts, and satellite shots, we chart the sequence of events
          and identify responsible munitions.
        </p>
        <p>
          <strong>Approach:</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>
            Gathering open-source videos showing impacts and damage around hospitals.
          </li>
          <li>
            Geolocating each video frame against satellite imagery to establish exact impact points.
          </li>
          <li>
            Eyewitness interviews and metadata analysis to timestamp each event.
          </li>
          <li>
            Cross-referencing with official flight track data where available to identify aircraft or munitions.
          </li>
          <li>
            Creating a layered map that shows damage progression and estimated munition trajectories.
          </li>
        </ul>
        <p>
          This transparent workflow allows external parties to follow each step—from raw video to final damage map—ensuring that
          conclusions about responsibility and sequence of events are verifiable by anyone with access to the same open‐source evidence.
        </p>

        {/* Back to Home button */}
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" legacyBehavior>
            <a
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: '#00BFAE',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontFamily: 'Utopia, serif',
              }}
            >
              ← Back to Home
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}
