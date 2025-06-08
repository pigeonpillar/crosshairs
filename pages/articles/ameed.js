// pages/articles/forensic-map-syria.js
import Head from 'next/head';
import Link from 'next/link';

export default function ForensicMapSyria() {
  return (
    <>
      <Head>
        <title>The Killing of Ameed Bani Shamseh</title>
        <meta
          name="description"
          content="How we used 3D modeling and open-source footage to investigate the killing of Ameed Bani Shamseh."
        />
        {/* Google Fonts import */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,700;1,100;1,200;1,300;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main
        style={{
          maxWidth: '800px',
          margin: '3rem auto',
          padding: '0 1rem',
          fontFamily: "'Space Grotesk', 'Roboto Mono', sans-serif",
          fontWeight: 300,       // body text at weight 300
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
              fontFamily: "'Space Grotesk', 'Roboto Mono', sans-serif",
              fontWeight: 600,   // title at weight 600
            }}
          >
            The killing of Ameed Bani Shamseh
          </span>
        </h1>

        <p>
          This piece outlines our process for reconstructing a fire event in a Syrian town using 3D modeling and open‐source
          video footage. By geolocating key frames from multiple sources, we built a timeline of destruction and mapped the
          progression of the blaze.
        </p>
        <p>
          <strong>Methodology:</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>Collecting user-generated videos and photographs showing the fire at various timestamps.</li>
          <li>Georeferencing each viewpoint against satellite or drone imagery to establish exact locations.</li>
          <li>Creating a simplified 3D model of the affected neighborhood to simulate fire spread.</li>
          <li>Correlating wind data and structural layouts to estimate the fire’s path and timing.</li>
          <li>Producing a time-lapse map overlay showing incremental damage snapshots.</li>
        </ul>
        <p>
          The result is a visual forensic map that not only identifies damaged structures but also provides a minute-by-minute
          reconstruction of the incident. This approach enhances accountability by making every step of the analysis reproducible.
        </p>

        {/* Back to Home button */}
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" legacyBehavior>
            <a
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.5rem',
                backgroundColor: '#00BFAE',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '0px',
                fontFamily: "'Space Grotesk', 'Roboto Mono', sans-serif",
                fontWeight: 400,   // button at weight 400
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
