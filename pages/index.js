import { useEffect, useState } from 'react';

export default function Home() {
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
      }
    `;
    document.head.appendChild(style);

    const timer = setTimeout(() => {
      setShowEmail(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      fontFamily: 'sans-serif',
      textAlign: 'center',
    }}>
      <span style={{
        animation: 'flash 1s infinite',
        fontWeight: 'bold',
        fontSize: 'clamp(2rem, 8vw, 5rem)',
        lineHeight: 1.2,
      }}>
        crosshairs
      </span>

      <div style={{
        marginTop: '1.5rem',
        opacity: showEmail ? 1 : 0,
        transform: showEmail ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        fontSize: 'clamp(1rem, 4vw, 1.5rem)',
      }}>
        Email: <a href="mailto:info@crosshairs.uk" style={{
          color: '#000',
          textDecoration: 'underline',
        }}>
          info@crosshairs.uk
        </a>
      </div>
    </div>
  );
}
