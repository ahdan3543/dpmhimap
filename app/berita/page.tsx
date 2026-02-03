
'use client';
import React, { useState, useEffect } from 'react';
import { DUMMY_NEWS } from '@/data/dummy';
import NewsCard from '@/components/NewsCard';
import { News } from '@/types';

export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('news') || JSON.stringify(DUMMY_NEWS));
    setNewsList(saved);
  }, []);

  return (
    <div className="pb-20">
      <div className="bg-maroon-900 py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-maroon-800 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Warta DPM PKO</h1>
          <p className="text-maroon-200">Kumpulan berita, kegiatan, dan penghargaan terbaru.</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
        {newsList.length === 0 && (
          <div className="text-center py-20 text-gray-400 italic">Belum ada berita yang dipublikasikan.</div>
        )}
      </div>
    </div>
  );
}
