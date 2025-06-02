// components/Footer.jsx
export default function Footer() {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '1rem 2rem',
        marginTop: '2rem',
        backgroundColor: '#111',
        color: '#888',
        fontSize: '0.9rem',
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} GeoArchive. All rights reserved.
      </p>
      <p style={{ margin: '0.5rem 0 0 0' }}>
        Built by Ash — Analysis &amp; Geolocation Work
      </p>
    </footer>
  );
}
