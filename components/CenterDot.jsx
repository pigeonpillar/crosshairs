// components/CenterDot.jsx
import React from 'react'; // (optional if you’re on React 17+)

export default function CenterDot() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '8px',
        height: '8px',
        backgroundColor: 'black',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
