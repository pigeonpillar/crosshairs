import { useEffect } from 'react';

export default function Home() {
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
  }, []);

  return (
    <div style={{
      minHeight: '100svh', // viewport height that accounts for mobile browser UI
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    }}>
      <span style={{
        animation: 'flash 1s infinite',
        fontWeight: 'bold',
        fontSize: 'clamp(2rem, 8vw, 5rem)',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        Crosshairs
      </span>
    </div>
  );
}
