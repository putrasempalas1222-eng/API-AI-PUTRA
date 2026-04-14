import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState("Menunggu input...");

  const hitApi = async () => {
    setStatus("Sedang mengirim...");
    
    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // API Key ini harus sama dengan yang ada di .env.local
          "x-api-key": "kunci_rahasia_pribadi_123" 
        },
        body: JSON.stringify({ 
          message: "Halo dari Frontend!",
          timestamp: new Date().toISOString()
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus("Berhasil! Respon: " + JSON.stringify(data));
      } else {
        setStatus("Gagal: " + data.error);
      }
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Test Proxy API</h1>
      <button 
        onClick={hitApi}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Kirim Data ke API Rahasia
      </button>
      <pre style={{ marginTop: '20px', background: '#f4f4f4', padding: '15px' }}>
        {status}
      </pre>
    </div>
  );
}
