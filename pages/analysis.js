// pages/analysis.js
import Head from 'next/head';
import Link from 'next/link';

export default function Analysis() {
  const stories = [
    {
      slug: 'jenin-car',
      title: 'An Attack on a Civilian Car in Jenin City',
      excerpt:
        'A step-by-step account of how satellite imagery and ground testimony reveal damage patterns.',
      date: 'May 15, 2025',
    },
    {
      slug: 'ameed',
      title: 'A Killing in Beita – Nablus',
      excerpt:
        'How we used 3D modeling and open-source footage to map destruction timelines.',
      date: 'April 28, 2025',
    },
    {
      slug: 'shatha-sabbagh',
      title: 'Mapping Settler Attacks in the Occupied West Bank',
      excerpt:
        'Using witness testimonies and geospatial data to reconstruct incidents.',
      date: 'March 10, 2025',
    },
  ];

  return (
    <>
      <Head>
        <title>Analysis – crosshairs</title>
        <meta name="description" content="All analysis articles on crosshairs." />
        {/* Google Fonts import */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,700;1,100;1,200;1,300;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
              fontFamily: "'Space Grotesk', 'Roboto Mono', sans-serif",
              fontWeight: 600, // Analysis title at 600
            }}
          >
            Analysis
          </span>
        </h1>

        {/* Navigation “buttons” below the title */}
        <div className="nav-buttons">
          <Link href="/" legacyBehavior>
            <a className="nav-button">Home</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="nav-button">About</a>
          </Link>
        </div>
      </section>

      {/* LIST OF ARTICLES */}
      <section>
        <div className="list-container">
          <h2
            style={{
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: 'grey', // text in cyan underneath
              fontFamily: "'Space Grotesk', 'Roboto Mono', sans-serif",
              fontWeight: 350,  // cyan text at 350
            }}
          >
            All Articles
          </h2>
          <ul className="story-list">
            {stories.map((story) => (
              <li key={story.slug} className="story-item">
                <Link href={`/articles/${story.slug}`} legacyBehavior>
                  <a className="story-link">
                    <div className="story-header">
                      <h3 className="story-title">{story.title}</h3>
                      <small className="story-date">{story.date}</small>
                    </div>
                    <p className="story-excerpt">{story.excerpt}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Styled‐JSX */}
      <style jsx>{`
        .list-container {
          max-width: 800px;
          margin: 0 auto 3rem auto;
          padding: 0 50px;
        }
        .story-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .story-item + .story-item {
          margin-top: 2rem;
          border-top: 1px solid #ddd;
          padding-top: 1.5rem;
        }
        .story-link {
          text-decoration: none;
          color: inherit;
        }
        .story-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .story-title {
          margin: 0;
          font-size: 1.5rem;
          color: #00BFAE; /* cyan title */
          font-family: 'Space Grotesk', 'Roboto Mono', sans-serif;
          font-weight: 350; /* cyan text at 350 */
        }
        .story-date {
          font-size: 0.9rem;
          color: #999;
          font-family: 'Space Grotesk', 'Roboto Mono', sans-serif;
          font-weight: 300; /* dark gray under it at 300 */
        }
        .story-excerpt {
          margin: 0.5rem 0 0 0;
          color: #666; /* dark gray */
          font-size: 1rem;
          font-family: 'Space Grotesk', 'Roboto Mono', sans-serif;
          font-weight: 300; /* dark gray under it at 300 */
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
          font-family: 'Space Grotesk', 'Roboto Mono', sans-serif;
          font-weight: 400; /* nav buttons at 400 */
        }
        .nav-button:hover,
        .nav-button:active {
          border-bottom: 2px solid #00BFAE;
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
          .list-container {
            padding: 0 10px;
          }
          .story-title {
            font-size: 1.25rem;
          }
          .story-excerpt {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
