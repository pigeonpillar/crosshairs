import Head from 'next/head';
import { useEffect, useState } from 'react';

// Helper: convert Drive ID/URL to embed link
const toDriveEmbed = (input) => {
  // Raw ID --> preview link
  if (/^[\w-]{10,}$/.test(input)) {
    return `https://drive.google.com/file/d/${input}/preview`;
  }
  const url = input.trim();
  // Already embed link
  if (url.includes('/preview')) return url;
  // Extract ID from common patterns
  const patterns = [
    /\/file\/d\/([\w-]+)/,
    /[?&]id=([\w-]+)/,
    /export=download&id=([\w-]+)/,
  ];
  for (const pat of patterns) {
    const m = url.match(pat);
    if (m && m[1]) {
      return `https://drive.google.com/file/d/${m[1]}/preview`;
    }
  }
  // Fallback
  return url;
};

export default function Home() {
  const [testimonies, setTestimonies] = useState([]);
  const dataUrl =
    'https://script.google.com/macros/s/AKfycbx_xzRThkdc_bKdrFuWBXJGtgXdpDTnGJcFdSk6LoVk6dMkRW1WxtgekZAO2fdO345dKg/exec';

  useEffect(() => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        // JSON structure: use data.Sheet1 if exists
        let items;
        if (Array.isArray(data)) {
          items = data;
        } else if (Array.isArray(data.Sheet1)) {
          items = data.Sheet1;
        } else {
          items = Array.isArray(data.records) ? data.records : Object.values(data).flat();
        }
        setTestimonies(items);
      })
      .catch((err) => console.error('Error loading testimonies:', err));
  }, []);

  return (
    <>
      <Head>
        <title>أرشيف الإفادات المرئية</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>أرشيف الإفادات المرئية</h1>
        {testimonies.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>جارٍ تحميل البيانات...</p>
        ) : (
          <div className="grid">
            {testimonies.map((item, idx) => (
              <div key={idx} className="card">
                {item.Testimony && <div className="testimony-title">{item.Testimony}</div>}
                {item.Video ? (
                  <iframe
                    src={toDriveEmbed(item.Video)}
                    allowFullScreen
                    loading="lazy"
                    title={`Video testimony ${idx + 1}`}
                  />
                ) : (
                  <div className="no-video">لا يوجد فيديو</div>
                )}
                {item.Name && <div className="name">{item.Name}</div>}
                {item.Description && <div className="description">{item.Description}</div>}
                {item.Length && <div className="tags">⏱️ {item.Length}</div>}
                {item.Tags && <div className="tags">🏷️ {item.Tags}</div>}
              </div>
            ))}
          </div>
        )}
      </main>
      <style jsx>{`
        main { padding: 20px; font-family: sans-serif; background: #f8f8f8; min-height: 100vh; }
        h1 { text-align: center; margin-bottom: 30px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .card { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); transition: transform 0.2s ease; }
        .card:hover { transform: translateY(-5px); }
        .testimony-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
        iframe { width: 100%; height: 200px; border: none; border-radius: 8px; background: #000; }
        .no-video { height: 200px; display: flex; align-items: center; justify-content: center; color: #888; background: #f0f0f0; border-radius: 8px; margin-bottom: 10px; }
        .name { font-weight: bold; margin-top: 10px; }
        .description { margin: 10px 0; color: #444; }
        .tags { margin-top: 8px; font-size: 12px; color: #555; }
      `}</style>
    </>
  );
}