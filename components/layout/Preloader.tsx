'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mengatur preloader hilang setelah 2 detik (2000 ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    
    return () => clearTimeout(timer);
  }, []);

  // Jika loading selesai, komponen ini tidak me-render apa-apa
  if (!isLoading) return null;

  return (
    <div className="preloader-container">
      <h1 className="preloader-text">Halo, Selamat Datang.</h1>
    </div>
  );
}