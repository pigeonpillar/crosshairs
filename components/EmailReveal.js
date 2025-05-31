// components/EmailReveal.jsx
'use client';
import React, { useState, useEffect } from 'react';

export default function EmailReveal({
  email = 'info@crosshairs.uk',
  delay = 3000,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const prefersReduced = 
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      style={{
        marginTop: '1.5rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-20px)',
        transition: prefersReduced
          ? 'none'
          : 'opacity 0.6s ease, transform 0.6s ease',
        fontSize: 'clamp(1rem, 4vw, 1.5rem)',
        color: '#D3D3D3',
      }}
    >
      Email:{' '}
      <a
        href={`mailto:${email}`}
        style={{ textDecoration: 'underline', color: '#D3D3D3' }}
      >
        {email}
      </a>
    </div>
  );
}
