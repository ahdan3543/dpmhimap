
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Info, Award, Users } from 'lucide-react';
import { DUMMY_NEWS } from '../data/dummy';
import NewsCard from '../components/NewsCard';
import { News as NewsType } from '../types';

const Home: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsType[]>([]);

  useEffect(() => {
    const savedNews = JSON.parse(localStorage.getItem('news') || JSON.stringify(DUMMY_NEWS));
    setLatestNews(savedNews.slice(0, 3));
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-50">
          <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070" alt="PKO Athletic Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <div className="inline-block bg-red-600/20 text-red-400 px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-6 border border-red-500/30">
              Lembaga Legislatif Mahasiswa
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter uppercase">
              DPM HIMA <br />
              <span className="text-red-500">PKO</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed font-medium">
              Wadah aspirasi, legislasi, dan pengawasan demi terciptanya sinergi organisasi yang progresif di lingkungan Pendidikan Kepelatihan Olahraga.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/profil" className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-full font-black text-xs tracking-widest flex items-center justify-center transition-all shadow-lg shadow-red-900/40 uppercase">
                Lihat Profil <Info className="ml-2" size={18} />
              </Link>
              <Link to="/aspirasi" className="bg-white hover:bg-gray-100 text-red-900 px-8 py-4 rounded-full font-black text-xs tracking-widest flex items-center justify-center transition-all shadow-xl uppercase">
                Kirim Aspirasi <MessageSquare className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Quick Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-start space-x-6">
            <div className="bg-red-100 p-4 rounded-2xl text-red-900">
              <Users size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black mb-2 uppercase">Legislasi</h3>
              <p className="text-gray-500 text-sm">Perumusan undang-undang dan aturan internal mahasiswa.</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-start space-x-6">
            <div className="bg-red-100 p-4 rounded-2xl text-red-900">
              <Award size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black mb-2 uppercase">Pengawasan</h3>
              <p className="text-gray-500 text-sm">Mengawasi kinerja eksekutif demi keterbukaan informasi.</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-start space-x-6">
            <div className="bg-red-100 p-4 rounded-2xl text-red-900">
              <MessageSquare size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black mb-2 uppercase">Aspirasi</h3>
              <p className="text-gray-500 text-sm">Menampung setiap keluh kesah dan suara mahasiswa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-red-900 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Pembaruan Terbaru</span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">Warta dewan</h2>
            </div>
            <Link to="/berita" className="mt-6 md:mt-0 bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-red-900 hover:text-white transition-all flex items-center shadow-sm">
              Semua Berita <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
