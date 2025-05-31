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

      {/* HERO / Title Section */}
      <section
        style={{
          textAlign: 'center',
          margin: '4rem 0',
        }}
      >
        {/* 
          Keep <h1> as a block so it sits alone.
          Inside it, use a <span> with inline-block + background
          to highlight only the text.
        */}
        <h1 style={{ marginBottom: '1rem' }}>
          <span
            style={{
              display: 'inline-block',      // only wraps the text itself
              fontSize: '2.5rem',
              color: '#FFFFFF',             // white text
              backgroundColor: '#00BFAE',   // teal highlight
              padding: '0.15rem 0.25rem',       // space around text inside highlight
            }}
          >
            crosshairs
          </span>
        </h1>

        {/* Buttons underneath, forced to the next line by default since <div> is block-level */}
        <div className="nav-buttons">
          <Link href="/analysis" legacyBehavior>
            <a className="nav-button">Analysis</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="nav-button">About</a>
          </Link>
        </div>
      </section>

      {/* FEATURED ARTICLES / Teasers */}
      <section>
        {/* Wrap heading + grid in a container with 50px left/right padding */}
        <div style={{ padding: '0 50px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color:'#D3D3D3', }}>
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
                legacyBehavior
              >
                <a style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ marginTop: 0 }}>Geolocating Change in Gaza</h3>
                  <p style={{ color: '#666' }}>
                    A step-by-step account of how satellite imagery and ground testimony 
                    reveal damage patterns.
                  </p>
                  <small style={{ color: '#999' }}>May 15, 2025</small>
                </a>
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
                legacyBehavior
              >
                <a style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ marginTop: 0 }}>Tracing Fire-Damage in Syria</h3>
                  <p style={{ color: '#666' }}>
                    How we used 3D modeling and open-source footage to map destruction timelines.
                  </p>
                  <small style={{ color: '#999' }}>April 28, 2025</small>
                </a>
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
                legacyBehavior
              >
                <a style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ marginTop: 0 }}>Examining Hospital Attacks</h3>
                  <p style={{ color: '#666' }}>
                    Using witness testimonies and geospatial data to reconstruct incidents.
                  </p>
                  <small style={{ color: '#999' }}>March 10, 2025</small>
                </a>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Styled-JSX for the navigation “buttons” under the title */}
      <style jsx>{`
        .nav-buttons {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1rem; /* a bit of space above the buttons */
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
