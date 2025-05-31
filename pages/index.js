// pages/index.js

import { useEffect } from 'react';

export default function Home() {
  // Run once on client side to inject the dot
  useEffect(() => {
    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: '8px',
      height: '8px',
      backgroundColor: 'black',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: '9999',
    });
    document.body.appendChild(dot);
  }, []);

  return (
    <div>
      {/* Your page content goes here */}
      <h1>Welcome to my Next.js page</h1>
    </div>
  );
}
