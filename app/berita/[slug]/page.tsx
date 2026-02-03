
import { DUMMY_NEWS } from '@/data/dummy';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ChevronLeft, Calendar, User } from 'lucide-react';

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const news = DUMMY_NEWS.find(n => n.slug === slug);

  if (!news) return <div className="p-20 text-center">Berita tidak ditemukan.</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/berita" className="inline-flex items-center text-maroon-900 font-bold mb-8 hover:underline">
        <ChevronLeft size={20} className="mr-1" /> Kembali ke Berita
      </Link>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
        <span className="bg-maroon-900 text-white px-3 py-1 rounded-full text-xs font-bold">{news.category}</span>
        <div className="flex items-center"><Calendar size={14} className="mr-1"/> {formatDate(news.date)}</div>
        <div className="flex items-center"><User size={14} className="mr-1"/> {news.author}</div>
      </div>

      <h1 className="text-3xl md:text-5xl font-black mb-10 leading-tight">{news.title}</h1>
      <img src={news.image} alt={news.title} className="w-full aspect-video object-cover rounded-[2.5rem] shadow-lg mb-12" />
      
      <div className="prose prose-lg prose-red max-w-none text-gray-700 leading-relaxed">
        <p className="font-bold text-xl italic mb-6 border-l-4 border-maroon-900 pl-6">{news.excerpt}</p>
        <p>{news.content}</p>
      </div>
    </article>
  );
}
