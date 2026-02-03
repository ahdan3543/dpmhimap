
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Info, Award, Users } from 'lucide-react';
import { DUMMY_NEWS } from '@/data/dummy';
import NewsCard from '@/components/NewsCard';
import { News } from '@/types';

export default function Home() {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('news') || JSON.stringify(DUMMY_NEWS));
    setNewsList(saved.slice(0, 3));
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="relative h-[650px] flex items-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070" className="w-full h-full object-cover" alt="Hero Background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950 via-maroon-900/80 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
              DPM HIMA <br />
              <span className="text-maroon-400">PKO</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-medium">
              Lembaga legislatif yang berkomitmen menjaga transparansi dan menyalurkan aspirasi mahasiswa Pendidikan Kepelatihan Olahraga.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <Link href="/profil" className="btn-maroon flex items-center justify-center text-sm tracking-widest py-5 px-10">
                PROFIL DEWAN <Info className="ml-3" size={20} />
              </Link>
              <Link href="/aspirasi" className="bg-white text-maroon-900 px-10 py-5 rounded-full font-black text-sm tracking-widest flex items-center justify-center hover:bg-gray-100 transition-all shadow-xl">
                KIRIM ASPIRASI <MessageSquare className="ml-3" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-black text-maroon-900 uppercase tracking-[0.3em] mb-3 block">Informasi Terbaru</span>
            <h2 className="text-4xl font-black text-gray-900">Warta Kegiatan</h2>
          </div>
          <Link href="/berita" className="text-maroon-900 font-black text-xs uppercase tracking-widest flex items-center hover:underline bg-maroon-50 px-6 py-3 rounded-full transition-all">
            Lihat Semua <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {newsList.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
        {newsList.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 text-gray-400 font-medium">Belum ada berita terbaru.</div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-maroon-900 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-maroon-800 rounded-full -ml-32 -mt-32 opacity-20"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 leading-tight">Suaramu Adalah Kekuatan <br/> Perubahan Kami</h2>
          <p className="text-xl text-maroon-100 mb-12 max-w-2xl mx-auto relative z-10 opacity-80 leading-relaxed font-medium">
            Jangan biarkan aspirasimu tertahan. Sampaikan sekarang juga melalui platform digital resmi DPM HIMA PKO.
          </p>
          <Link href="/aspirasi" className="bg-white text-maroon-900 hover:bg-maroon-50 px-12 py-6 rounded-full font-black text-sm tracking-[0.2em] inline-flex items-center transition-all relative z-10 shadow-2xl uppercase active:scale-95">
            Mulai Kirim Aspirasi <MessageSquare className="ml-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
