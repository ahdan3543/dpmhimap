
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, Newspaper, MessageSquare, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Profil', path: '/profil', icon: Users },
    { name: 'Berita', path: '/berita', icon: Newspaper },
    { name: 'Aspirasi', path: '/aspirasi', icon: MessageSquare },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center text-white font-bold text-xl">D</div>
              <div className="flex flex-col">
                <span className="text-red-900 font-extrabold text-xl leading-none">DPM HIMA PKO</span>
                <span className="text-gray-500 text-[10px] font-medium tracking-wider uppercase">Lembaga Legislatif Mahasiswa</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                    isActive ? 'text-red-900 bg-red-50' : 'text-gray-600 hover:text-red-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Link
              to="/admin"
              className="bg-red-900 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center space-x-2 hover:bg-red-950 transition-colors"
            >
              <ShieldCheck size={18} />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-red-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-lg text-base font-bold transition-colors ${
                  isActive ? 'text-red-900 bg-red-50' : 'text-gray-600 hover:text-red-900'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 p-3 rounded-lg text-base font-bold text-white bg-red-900"
          >
            <ShieldCheck size={20} />
            <span>Panel Admin</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center text-white font-bold text-xl">D</div>
              <span className="text-white font-extrabold text-2xl">DPM HIMA PKO</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Dewan Perwakilan Mahasiswa Himpunan Mahasiswa Pendidikan Kepelatihan Olahraga (DPM HIMA PKO) merupakan lembaga legislatif tertinggi di tingkat himpunan mahasiswa jurusan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-900 hover:text-white transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-900 hover:text-white transition-all">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Tautan Cepat</h3>
            <ul className="space-y-4">
              <li><Link to="/profil" className="hover:text-red-500 transition-colors">Visi & Misi</Link></li>
              <li><Link to="/profil" className="hover:text-red-500 transition-colors">Struktur Organisasi</Link></li>
              <li><Link to="/berita" className="hover:text-red-500 transition-colors">Berita Terkini</Link></li>
              <li><Link to="/aspirasi" className="hover:text-red-500 transition-colors">Kirim Aspirasi</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Kontak Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <span className="text-red-500">📍</span>
                <span>Sekretariat DPM HIMA PKO, Gedung PKM Lt. 2, Kampus Pusat.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500">📧</span>
                <span>dpm.pko@univ.ac.id</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500">📞</span>
                <span>+62 812 3456 7890</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} DPM HIMA PKO. Seluruh hak cipta dilindungi.</p>
          <p className="mt-4 md:mt-0">Dibuat dengan ❤️ oleh Bidang Multimedia</p>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
