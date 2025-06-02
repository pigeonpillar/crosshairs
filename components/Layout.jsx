// components/Layout.jsx
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: '80vh',
          maxWidth: '900px',
          margin: '2rem auto',
          padding: '0 1rem',
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
