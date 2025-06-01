// pages/about.js
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About – crosshairs</title>
        <meta
          name="description"
          content="About crosshairs: in-depth visual investigations and geolocation analysis by Ash."
        />
      </Head>

      {/* ABOUT SECTION */}
      <section
        style={{
          maxWidth: '800px',
          margin: '3rem auto',
          padding: '0 1rem',
          color: '#333333',
          lineHeight: '1.6',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#00BFAE' }}>
          About crosshairs
        </h1>

        <p>
          Welcome to <strong>crosshairs</strong>, a platform dedicated to deep‐dive visual investigations and geolocation analysis.
          I’m Ash, the researcher and creator behind this site. Through a combination of satellite imagery, open‐source footage,
          3D modeling, and ground‐level testimonies, I reconstruct events on the ground to uncover hidden patterns and offer
          new insights into complex situations.
        </p>

        <p>
          My background spans open‐source investigations and visual forensics. Over the years, I’ve collaborated with organizations such as
          Forensic Architecture and Al‐Haq, applying methodologies like 3D reconstruction and material evidence analysis to document
          human rights issues. This site is an extension of that work—each article you find here combines rigorous geospatial techniques
          with detailed narrative to present a clearer picture of events in regions where reliable, transparent information can be hard to
          come by.
        </p>

        <p>
          On <strong>crosshairs</strong>, you’ll find:
        </p>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>
            <strong>Interactive story maps</strong> that plot incidents on a timeline and allow you to explore layer by layer.
          </li>
          <li>
            <strong>Video snippets</strong> from field footage and drone captures, paused and replayed in context to highlight key moments.
          </li>
          <li>
            <strong>3D reconstructions</strong> showcasing how buildings, infrastructure, and terrain have changed over time.
          </li>
          <li>
            <strong>Written analysis</strong> that weaves together multimedia evidence—photos, testimonies, archival records—into a cohesive narrative.
          </li>
        </ul>

        <p>
          This project is powered by Mapbox, Blender, QGIS and various open‐source libraries, but its heart lies in the stories of people on
          the ground. My goal is to make each investigation as transparent as possible, so that readers can see not just conclusions but
          the evidence trail itself.
        </p>

        <p>
          If you have questions, feedback, or would like to collaborate on a project, feel free to{' '}
          <a href="mailto:info@crosshairs.uk" style={{ color: '#00BFAE', textDecoration: 'underline' }}>
            get in touch
          </a>. Thank you for visiting <strong>crosshairs</strong>—I hope these investigations shed light on the realities that too
          often remain hidden.
        </p>

        {/* Back to Home button */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/" legacyBehavior>
            <a
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.5rem',
                backgroundColor: '#00BFAE',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '0px',
              }}
            >
              ← Back to Home
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
