// components/Header.jsx
import Link from 'next/link';

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#111',
        color: '#fff',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
        <Link
          href="/"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          GeoArchive
        </Link>
      </h1>

      <nav>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            gap: '1.5rem',
          }}
        >
          <li>
            <Link
              href="/"
              style={{ color: '#ccc', textDecoration: 'none' }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              style={{ color: '#ccc', textDecoration: 'none' }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/articles"
              style={{ color: '#ccc', textDecoration: 'none' }}
            >
              Articles
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              style={{ color: '#ccc', textDecoration: 'none' }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
