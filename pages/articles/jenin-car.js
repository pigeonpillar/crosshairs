// pages/articles/geolocation-gaza.js
import Head from 'next/head';
import Link from 'next/link';

export default function GeolocationGaza() {
  return (
    <>
      <Head>
        <title>An Attack on A Civilian Car in Jenin</title>
        <meta
          name="description"
          content="A step-by-step account of how satellite imagery and ground testimony reveal damage patterns in Gaza."
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
          fontWeight: 300, // body text at weight 300
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
              fontWeight: 600, // title at weight 600
            }}
          >
            An Attack on A Civilian Car in Jenin
          </span>
        </h1>

        {/* Article content */}
        <p>
          In this investigation, we combine high‐resolution satellite imagery with eyewitness reports to map and document
          changes across Gaza over time. By overlaying historical imagery with recent captures, we identify specific areas
          of damage and correlate them with verified ground testimonies.
        </p>
        <p>
          <strong>Key steps include:</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>Procuring multi‐temporal satellite datasets from sources like Maxar and Planet Labs.</li>
          <li>Aligning georeferenced ground photos and videos to validate timestamps and locations.</li>
          <li>Digitizing damage footprints (buildings, infrastructure) in a GIS environment.</li>
          <li>Generating before‐and‐after composite maps to highlight changes visually.</li>
          <li>Cross‐referencing findings with open‐source social media reports and NGO documentation.</li>
        </ul>
        <p>
          The resulting maps and narratives provide a clearer understanding of when, where, and how damage occurred. This
          method ensures transparency: every geolocated point is backed by open‐source imagery and corroborated
          testimony.
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
                fontWeight: 400, // button at weight 400
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
