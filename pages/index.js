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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
    }}>
      <span style={{
        animation: 'flash 1s infinite'
      }}>
        Crosshairs
      </span>
    </div>
  );
}
