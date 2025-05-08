import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={{
      height: '100vh',
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
      }}>
        Crosshairs
      </span>
    </div>
  );
}
