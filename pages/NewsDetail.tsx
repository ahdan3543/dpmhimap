
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Instagram } from 'lucide-react';
import { DUMMY_NEWS } from '../data/dummy';
import { formatDate } from '../lib/utils';

const NewsDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const news = DUMMY_NEWS.find(n => n.slug === slug);

  if (!news) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Berita tidak ditemukan</h2>
        <Link to="/berita" className="text-red-900 font-bold flex items-center">
          <ChevronLeft className="mr-2" /> Kembali ke Berita
        </Link>
      </div>
    );
  }

  const relatedNews = DUMMY_NEWS.filter(n => n.id !== news.id).slice(0, 3);

  return (
    <div className="pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-red-900">Beranda</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <Link to="/berita" className="hover:text-red-900">Berita</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <span className="text-gray-900 truncate">{news.title}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
          <span className="bg-red-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            {news.category}
          </span>
          <div className="flex items-center space-x-1">
            <Calendar size={16} />
            <span>{formatDate(news.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={16} />
            <span>{news.author}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-10 leading-tight">
          {news.title}
        </h1>

        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full aspect-video object-cover rounded-[2.5rem] shadow-lg mb-12"
        />

        <div className="prose prose-lg prose-red max-w-none text-gray-700 leading-loose">
          <p className="font-bold text-xl text-gray-900 mb-6 italic border-l-4 border-red-900 pl-6">
            {news.excerpt}
          </p>
          <p>{news.content}</p>
          <p>
            Dalam pelaksanaan kegiatan ini, DPM senantiasa menekankan pentingnya partisipasi aktif dari seluruh mahasiswa PKO. Keberhasilan program kerja bukan hanya dilihat dari kemeriahan acara, namun dari dampak jangka panjang yang dirasakan oleh civitas akademika.
          </p>
          <p>
            Ke depannya, DPM berencana untuk terus melakukan inovasi dalam setiap langkah kebijakan. Kami mengundang seluruh rekan-rekan mahasiswa untuk tetap kritis dan memberikan masukan konstruktif demi kemajuan bersama.
          </p>
        </div>

        {/* Share & Tags */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center space-x-3">
            <Tag size={20} className="text-gray-400" />
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-900 cursor-pointer transition-colors">#DPMHIMAPKO</span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-900 cursor-pointer transition-colors">#OrganisasiMahasiswa</span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-900 cursor-pointer transition-colors">#SportsEducation</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Share:</span>
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Facebook size={18} /></button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-sky-500 hover:text-white transition-all"><Twitter size={18} /></button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-pink-600 hover:text-white transition-all"><Instagram size={18} /></button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-red-900 hover:text-white transition-all"><Share2 size={18} /></button>
            </div>
          </div>
        </div>
      </article>

      {/* Related News */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 flex items-center">
            <div className="w-10 h-1 bg-red-900 mr-4"></div>
            Berita Terkait
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedNews.map(n => (
              <div key={n.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100">
                <img src={n.image} alt={n.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 line-clamp-2 mb-4">{n.title}</h4>
                  <Link to={`/berita/${n.slug}`} className="text-red-900 text-sm font-bold flex items-center">
                    Baca <ChevronLeft className="ml-1 rotate-180" size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;
