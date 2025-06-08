// pages/map.js
import Head from 'next/head';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import mapboxgl from 'mapbox-gl';

export default function MapPage() {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken =
      'pk.eyJ1IjoiaC1mYWkiLCJhIjoiY204cTFwazA3MGdzcDJqc2FhcThiNW0zaSJ9.wnQhzTrZaCPquno5APsbrg';

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/h-fai/cmbnzh69a00sq01sebq3920db',
      center: [34.8, 31.5],
      zoom: 6,
      minZoom: 5,
      maxZoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Map – crosshairs</title>
        <meta name="description" content="Interactive Map – crosshairs" />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,700;1,100;1,200;1,300;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Mapbox GL JS stylesheet */}
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      {/* HERO / Title Section */}
      <section
        style={{
          textAlign: 'center',
          margin: '4rem 0',
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '1.9rem',
              color: '#FFFFFF',
              backgroundColor: '#00BFAE',
              padding: '0.25rem 0.5rem',
              fontFamily: "'Space Grotesk', 'Roboto Mono', sans-serif",
              fontWeight: 600,
            }}
          >
            Map
          </span>
        </h1>

        <div className="nav-buttons">
          <Link href="/" legacyBehavior>
            <a className="nav-button">Home</a>
          </Link>
          <Link href="/analysis" legacyBehavior>
            <a className="nav-button">Analysis</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="nav-button">About</a>
          </Link>
        </div>
      </section>

      {/* MAP CONTAINER */}
      <div ref={mapContainer} className="map-container" />

      <style jsx>{`
        .map-container {
          width: 100%;
          height: 80vh;
          border-radius: 8px;
          margin: 0 auto 2rem auto;
          max-width: 1200px;
        }
        .nav-buttons {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1rem;
        }
        .nav-button {
          display: inline-block;
          font-size: 1.25rem;
          color: #555555;
          text-decoration: none;
          padding-bottom: 0.25rem;
          cursor: pointer;
          font-family: 'Space Grotesk', 'Roboto Mono', sans-serif;
          font-weight: 400;
        }
        .nav-button:hover,
        .nav-button:active {
          border-bottom: 2px solid #00BFAE;
        }
        @media (max-width: 600px) {
          .map-container {
            height: 60vh;
            padding: 0 10px;
          }
        }
      `}</style>
    </>
  );
}
