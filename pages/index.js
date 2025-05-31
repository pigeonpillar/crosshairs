// pages/index.js
import React from 'react';
import * as FlashTitleModule from '../components/FlashTitle';
import * as EmailRevealModule from '../components/EmailReveal';

const FlashTitle = FlashTitleModule.default || FlashTitleModule;
const EmailReveal = EmailRevealModule.default || EmailRevealModule;

export default function Home() {
  return (
<<<<<<< HEAD
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      <FlashTitle text="crosshairs" />
      <EmailReveal email="info@crosshairs.uk" delay={3000} />
=======
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
>>>>>>> parent of 1c1a00ac (add)
    </div>
  );
}
