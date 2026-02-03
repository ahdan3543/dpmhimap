import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import { ShieldCheck, Menu } from 'lucide-react';

export const metadata: Metadata = {
  title: "DPM HIMA PKO - Suara Mahasiswa, Aksi Nyata",
  description: "Website resmi Dewan Perwakilan Mahasiswa Himpunan Mahasiswa PKO. Pusat informasi, berita, dan aspirasi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col antialiased">
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              {/* CONTAINER LOGO */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Logo DPM HIMA PKO" 
                  className="w-full h-full object-contain relative z-10 transition-transform group-hover:scale-105"
                  // Menangani jika file logo.png belum ada di folder public
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.fallback-icon');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                {/* FALLBACK ICON (Muncul hanya jika gambar src gagal load) */}
                <div className="fallback-icon hidden absolute inset-0 bg-maroon-900 rounded-full flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110 shadow-md">
                  D
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-maroon-900 font-black text-xl leading-none tracking-tight">DPM HIMA PKO</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Legislatif Mahasiswa</span>
              </div>
            </Link>
            
            {/* Navigasi Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-bold text-gray-600 hover:text-maroon-900 transition-colors">Beranda</Link>
              <Link href="/profil" className="text-sm font-bold text-gray-600 hover:text-maroon-900 transition-colors">Profil</Link>
              <Link href="/berita" className="text-sm font-bold text-gray-600 hover:text-maroon-900 transition-colors">Berita</Link>
              <Link href="/aspirasi" className="text-sm font-bold text-gray-600 hover:text-maroon-900 transition-colors">Aspirasi</Link>
              <Link href="/admin" className="bg-maroon-900 text-white px-5 py-2.5 rounded-full text-xs font-black flex items-center space-x-2 hover:bg-maroon-950 transition-all shadow-lg shadow-maroon-900/20 active:scale-95">
                <ShieldCheck size={14} />
                <span>PANEL ADMIN</span>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-maroon-900 hover:bg-maroon-50 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
          </nav>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="bg-gray-950 text-gray-400 py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 text-white font-bold text-xl mb-6">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-10 h-10 object-contain"
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                />
                <span className="font-black tracking-tight">DPM HIMA PKO</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs text-gray-500">
                Wadah aspirasi dan pengawasan mahasiswa Pendidikan Kepelatihan Olahraga (PKO) demi terciptanya organisasi yang transparan, akuntabel, dan progresif.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-4 border-maroon-900 pl-3">Navigasi</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/profil" className="hover:text-white transition-colors">Visi & Misi Organisasi</Link></li>
                <li><Link href="/berita" className="hover:text-white transition-colors">Warta & Kegiatan Terbaru</Link></li>
                <li><Link href="/aspirasi" className="hover:text-white transition-colors">Layanan Aspirasi Online</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Akses Pengurus (Admin)</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-4 border-maroon-900 pl-3">Hubungi Kami</h4>
              <div className="space-y-4 text-sm">
                <p className="flex items-start space-x-3">
                  <span className="text-maroon-500 font-bold">📧</span>
                  <span>dpm.pko@upi.edu</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="text-maroon-500 font-bold">📍</span>
                  <span>Gedung Pusat Kegiatan Mahasiswa (PKM) FPOK UPI, Bandung.</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest font-bold">
            <span className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} DPM HIMA PKO. Suara Mahasiswa, Aksi Nyata.</span>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>Bandung, Indonesia</span>
              <span className="h-3 w-[1px] bg-gray-800"></span>
              <span>Multimedia Dept</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
