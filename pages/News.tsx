
import React, { useState, useMemo, useEffect } from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { DUMMY_NEWS } from '../data/dummy';
import { Category, News as NewsType } from '../types';
import NewsCard from '../components/NewsCard';

const News: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Sinkronisasi dengan localStorage (Admin)
    const savedNews = JSON.parse(localStorage.getItem('news') || JSON.stringify(DUMMY_NEWS));
    setNewsList(savedNews);
  }, []);

  const categories = ['Semua', ...Object.values(Category)];

  const filteredNews = useMemo(() => {
    return newsList.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Semua' || news.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, newsList]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentItems = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-red-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Warta DPM PKO</h1>
          <p className="text-red-200 text-lg md:text-xl max-w-2xl">Arsip lengkap berita kegiatan, program kerja, dan penghargaan dewan.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center mb-12">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari judul atau isi berita..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                  activeCategory === cat 
                  ? 'bg-red-900 text-white border-red-900 shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-red-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex justify-between items-center text-gray-500 font-medium text-sm">
          <p>Menampilkan {currentItems.length} dari {filteredNews.length} berita</p>
          <div className="flex space-x-2">
            <button className="p-2 text-red-900 bg-red-50 rounded-lg"><LayoutGrid size={20}/></button>
            <button className="p-2 text-gray-400 hover:text-red-900 transition-colors"><List size={20}/></button>
          </div>
        </div>

        {/* News Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentItems.map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Berita tidak ditemukan</h3>
            <p className="text-gray-500">Coba gunakan kata kunci lain atau filter kategori yang berbeda.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 rounded-xl font-bold transition-all ${
                  currentPage === page 
                  ? 'bg-red-900 text-white shadow-lg shadow-red-900/20' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-900'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
