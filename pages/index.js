// pages/index.js
import React from 'react';
import * as FlashTitleModule from '../components/FlashTitle';
import * as EmailRevealModule from '../components/EmailReveal';

const FlashTitle = FlashTitleModule.default || FlashTitleModule;
const EmailReveal = EmailRevealModule.default || EmailRevealModule;

export default function Home() {
  return (
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
    </div>
  );
}
