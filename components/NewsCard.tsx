
import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { News, Category } from '../types';
import { formatDate } from '../lib/utils';

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.REWARD: return 'bg-yellow-100 text-yellow-800';
      case Category.PROKER: return 'bg-blue-100 text-blue-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryColor(news.category)}`}>
            {news.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{formatDate(news.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>{news.author}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-900 transition-colors">
          {news.title}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {news.excerpt}
        </p>
        <Link 
          href={`/berita/${news.slug}`} 
          className="inline-flex items-center space-x-2 text-red-900 font-bold text-sm hover:translate-x-1 transition-transform"
        >
          <span>Baca Selengkapnya</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
