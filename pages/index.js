// pages/index.js
import Head from 'next/head';
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
      </Head>

      {/* HERO / Title Section with two “buttons” */}
      <section
        style={{
          textAlign: 'center',
          margin: '4rem 0',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#333333', // dark gray
          }}
        >
          crosshairs
        </h1>

        <div className="nav-buttons">
          <Link href="/analysis" className="nav-button">
            Analysis
          </Link>
          <Link href="/about" className="nav-button">
            About
          </Link>
        </div>
      </section>

      {/* FEATURED ARTICLES / Teasers */}
      <section>
        {/* Wrap heading + grid in a container with 50px left/right padding */}
        <div style={{ padding: '0 50px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
            Featured Articles
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Card #1 */}
            <article
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <Link
                href="/articles/geolocation-gaza"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3 style={{ marginTop: 0 }}>Geolocating Change in Gaza</h3>
                <p style={{ color: '#666' }}>
                  A step-by-step account of how satellite imagery and ground testimony 
                  reveal damage patterns.
                </p>
                <small style={{ color: '#999' }}>May 15, 2025</small>
              </Link>
            </article>

            {/* Card #2 */}
            <article
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <Link
                href="/articles/forensic-map-syria"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3 style={{ marginTop: 0 }}>Tracing Fire-Damage in Syria</h3>
                <p style={{ color: '#666' }}>
                  How we used 3D modeling and open-source footage to map destruction timelines.
                </p>
                <small style={{ color: '#999' }}>April 28, 2025</small>
              </Link>
            </article>

            {/* Card #3 */}
            <article
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <Link
                href="/articles/analysis-hospital-attacks"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3 style={{ marginTop: 0 }}>Examining Hospital Attacks</h3>
                <p style={{ color: '#666' }}>
                  Using witness testimonies and geospatial data to reconstruct incidents.
                </p>
                <small style={{ color: '#999' }}>March 10, 2025</small>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Styled-JSX for the navigation “buttons” under the title */}
      <style jsx>{`
        .nav-buttons {
          display: inline-flex;
          gap: 2rem;
        }
        .nav-button {
          display: inline-block;        /* Ensures border-bottom appears directly under text */
          font-size: 1.25rem;
          color: #555555;
          text-decoration: none;         /* Remove default underline */
          padding-bottom: 0.25rem;       /* Add a small gap before the underline */
          cursor: pointer;
        }
        .nav-button:hover,
        .nav-button:active {
          border-bottom: 2px solid blue; /* Blue underline on hover or click */
        }
      `}</style>
    </>
  );
}
