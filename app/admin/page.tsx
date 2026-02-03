
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, LogOut, MessageSquare, Trash2, Edit, Plus, 
  FileText, Users, User, X, Save, Image as ImageIcon, AlertCircle, 
  Upload, Camera, Instagram, Quote, IdCard, GraduationCap, School, 
  Eye, Briefcase, Layers, CheckCircle2, Clock, Download, RefreshCw
} from 'lucide-react';
import { Aspiration, AspirationStatus, News, AKD, Category, Member } from '@/types';
import { formatDate } from '@/lib/utils';
import { DUMMY_NEWS, DUMMY_AKD } from '@/data/dummy';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'aspirasi' | 'berita' | 'akd'>('aspirasi');
  
  // Data States
  const [aspirations, setAspirations] = useState<Aspiration[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [akdList, setAkdList] = useState<AKD[]>([]);

  // Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAspiration, setSelectedAspiration] = useState<Aspiration | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<News> | null>(null);
  const [editingMember, setEditingMember] = useState<{akdId: string, member: Partial<Member>} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Muat data dari localStorage
  const loadAllData = () => {
    try {
      const savedAsp = JSON.parse(localStorage.getItem('aspirations') || '[]');
      const savedNews = JSON.parse(localStorage.getItem('news') || JSON.stringify(DUMMY_NEWS));
      const savedAkd = JSON.parse(localStorage.getItem('akd') || JSON.stringify(DUMMY_AKD));
      
      setAspirations(savedAsp.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setNews(savedNews);
      setAkdList(savedAkd);
    } catch (e) {
      console.error("Gagal memuat data dari localStorage", e);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (password === 'dpmhima23') {
      setIsLoggedIn(true);
      loadAllData();
    } else {
      setLoginError('KATA SANDI SALAH!');
    }
  };

  const exportToExcel = () => {
    if (aspirations.length === 0) {
      alert("Tidak ada data aspirasi untuk diunduh.");
      return;
    }
    
    // Header CSV
    const headers = ["ID Tiket", "Tanggal", "Nama Pengirim", "NIM", "Email/Kontak", "Kategori", "Isi Aspirasi", "Status"];
    
    // Baris Data
    const rows = aspirations.map(a => [
      a.ticketNumber,
      formatDate(a.createdAt),
      a.isAnonymous ? "Anonim" : (a.name || "-"),
      a.isAnonymous ? "Rahasia" : (a.nim || "-"),
      a.email || "-",
      a.category,
      a.message.replace(/"/g, '""').replace(/\n/g, ' '), // Escape quotes and newlines
      a.status
    ]);
    
    // Bangun string CSV dengan BOM untuk dukungan Excel (UTF-8)
    const csvContent = "\uFEFF" + [ 
      headers.join(","),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `Data_Aspirasi_DPM_PKO_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (editingMember) {
          setEditingMember({ ...editingMember, member: { ...editingMember.member, photo: base64String } });
        } else if (editingNews) {
          setEditingNews({ ...editingNews, image: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAspStatus = (id: string, status: AspirationStatus) => {
    const updated = aspirations.map(a => a.id === id ? { ...a, status } : a);
    setAspirations(updated);
    localStorage.setItem('aspirations', JSON.stringify(updated));
  };

  const deleteAsp = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus aspirasi ini secara permanen?')) {
      const updated = aspirations.filter(a => a.id !== id);
      setAspirations(updated);
      localStorage.setItem('aspirations', JSON.stringify(updated));
      if (selectedAspiration?.id === id) setSelectedAspiration(null);
    }
  };

  const saveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    let updatedNews: News[];
    if (editingNews.id) {
      updatedNews = news.map(n => n.id === editingNews.id ? (editingNews as News) : n);
    } else {
      const newEntry: News = {
        ...(editingNews as News),
        id: Date.now().toString(),
        slug: (editingNews.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        date: new Date().toISOString().split('T')[0]
      };
      updatedNews = [newEntry, ...news];
    }
    setNews(updatedNews);
    localStorage.setItem('news', JSON.stringify(updatedNews));
    closeModal();
  };

  const deleteNews = (id: string) => {
    if (confirm('Hapus berita ini?')) {
      const updated = news.filter(n => n.id !== id);
      setNews(updated);
      localStorage.setItem('news', JSON.stringify(updated));
    }
  };

  const saveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    const { akdId, member } = editingMember;
    const updatedAkdList = akdList.map(akd => {
      if (akd.id === akdId) {
        let updatedMembers: Member[];
        if (member.id) {
          updatedMembers = akd.members.map(m => m.id === member.id ? (member as Member) : m);
        } else {
          updatedMembers = [...akd.members, { ...member, id: Date.now().toString() } as Member];
        }
        return { ...akd, members: updatedMembers };
      }
      return akd;
    });
    setAkdList(updatedAkdList);
    localStorage.setItem('akd', JSON.stringify(updatedAkdList));
    closeModal();
  };

  const deleteMember = (akdId: string, memberId: string) => {
    if (confirm('Hapus anggota ini?')) {
      const updatedAkdList = akdList.map(akd => akd.id === akdId ? { ...akd, members: akd.members.filter(m => m.id !== memberId) } : akd);
      setAkdList(updatedAkdList);
      localStorage.setItem('akd', JSON.stringify(updatedAkdList));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setEditingMember(null);
    setSelectedAspiration(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 text-center animate-in zoom-in duration-500">
          <div className="bg-maroon-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-xl">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">Panel Pengurus</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="Kode Akses Admin" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-6 bg-gray-50 border-2 border-gray-100 focus:border-maroon-900 rounded-[2rem] outline-none transition-all text-center font-black text-xl" 
            />
            {loginError && <p className="text-red-600 text-[11px] font-black uppercase tracking-widest">{loginError}</p>}
            <button className="bg-maroon-900 text-white w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-maroon-900/20 active:scale-95 transition-all">Buka Kendali</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      {/* Header Admin */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-[60] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-maroon-900 rounded-xl flex items-center justify-center text-white font-black text-xl">D</div>
            <h1 className="text-sm font-black uppercase tracking-widest hidden sm:block">Dashboard Admin</h1>
          </div>
          <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl">
            {(['aspirasi', 'berita', 'akd'] as const).map(tab => (
              <button 
                key={tab} 
                onClick={() => { setActiveTab(tab); }} 
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-maroon-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab === 'akd' ? 'Struktur' : tab}
              </button>
            ))}
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-red-600 font-black text-[10px] uppercase tracking-widest px-5 py-2.5 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">Logout</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-6 md:p-12">
        {/* TAB: MONITORING ASPIRASI (UTAMA) */}
        {activeTab === 'aspirasi' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">Monitoring Aspirasi</h2>
                <p className="text-gray-500 font-medium mt-1">Daftar semua aspirasi yang masuk. Data ditampilkan secara lengkap dan dapat diunduh.</p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={loadAllData}
                  className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-maroon-900 shadow-sm active:rotate-180 transition-all duration-500"
                  title="Refresh Data"
                >
                  <RefreshCw size={20} />
                </button>
                <button 
                  onClick={exportToExcel}
                  className="bg-green-600 text-white px-8 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-green-900/10 flex items-center space-x-3 active:scale-95 transition-all"
                >
                  <Download size={18} />
                  <span>Download Excel</span>
                </button>
                <div className="bg-white px-8 py-4 rounded-[2rem] border border-gray-100 shadow-sm text-center min-w-[120px]">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Data</p>
                  <p className="text-2xl font-black text-maroon-900">{aspirations.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
               <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[1000px]">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Tiket & Tanggal</th>
                        <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Pengirim</th>
                        <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Isi Aspirasi</th>
                        <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Kategori</th>
                        <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Status</th>
                        <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {aspirations.length > 0 ? aspirations.map(a => (
                        <tr key={a.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="p-8">
                            <div className="font-mono font-black text-maroon-900 text-base">{a.ticketNumber}</div>
                            <div className="text-[9px] font-bold text-gray-400 uppercase mt-1">{formatDate(a.createdAt)}</div>
                          </td>
                          <td className="p-8">
                            <div className="font-bold text-gray-900 whitespace-nowrap">{a.isAnonymous ? 'ANONIM' : a.name}</div>
                            <div className="text-xs text-gray-500">{a.isAnonymous ? 'Mode Rahasia' : a.nim || '-'}</div>
                          </td>
                          <td className="p-8 max-w-xs">
                            <p className="text-gray-700 text-sm font-medium line-clamp-2 leading-relaxed italic">"{a.message}"</p>
                          </td>
                          <td className="p-8">
                            <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
                              {a.category}
                            </span>
                          </td>
                          <td className="p-8">
                            <select 
                              value={a.status} 
                              onChange={(e) => updateAspStatus(a.id, e.target.value as AspirationStatus)} 
                              className={`p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none border-2 transition-all cursor-pointer ${
                                a.status === AspirationStatus.BARU ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                a.status === AspirationStatus.PROSES ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                'bg-green-50 text-green-700 border-green-100'
                              }`}
                            >
                              {Object.values(AspirationStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="p-8 text-right">
                            <div className="flex justify-end items-center space-x-3">
                              <button onClick={() => setSelectedAspiration(a)} className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-maroon-900 hover:shadow-lg transition-all" title="Detail"><Eye size={18}/></button>
                              <button onClick={() => deleteAsp(a.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all" title="Hapus"><Trash2 size={18}/></button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={6} className="p-24 text-center">
                            <MessageSquare className="mx-auto text-gray-200 mb-6" size={80} />
                            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Belum ada aspirasi yang masuk sistem.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                </table>
               </div>
            </div>
          </div>
        )}

        {/* TAB: BERITA */}
        {activeTab === 'berita' && (
          <div className="space-y-10 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">Manajemen Berita</h2>
                <p className="text-gray-500 font-medium mt-1">Publikasikan dan kelola warta seputar kegiatan, proker, dan prestasi dewan.</p>
              </div>
              <button 
                onClick={() => { setEditingNews({ category: Category.KEGIATAN, author: 'Admin' }); setIsModalOpen(true); }} 
                className="bg-maroon-900 text-white px-10 py-5 rounded-[2.5rem] text-xs font-black uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3 active:scale-95 transition-all"
              >
                <Plus size={20}/>
                <span>Tulis Berita Baru</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map(n => (
                <div key={n.id} className="bg-white p-6 rounded-[3rem] border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-500">
                   <div className="h-48 rounded-[2.2rem] overflow-hidden mb-6 relative">
                     <img src={n.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-maroon-900 shadow-sm">
                          {n.category}
                        </span>
                     </div>
                   </div>
                   <h3 className="font-black text-gray-900 line-clamp-2 mb-4 group-hover:text-maroon-900 transition-colors leading-tight">{n.title}</h3>
                   <div className="mt-auto flex justify-between gap-3 pt-4 border-t border-gray-50">
                     <button onClick={() => { setEditingNews(n); setIsModalOpen(true); }} className="flex-grow flex items-center justify-center space-x-2 p-4 bg-gray-50 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-maroon-900 hover:text-white transition-all"><Edit size={16}/><span>Edit</span></button>
                     <button onClick={() => deleteNews(n.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: AKD */}
        {activeTab === 'akd' && (
          <div className="space-y-12 animate-in fade-in duration-500">
             <div>
                <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">Kelola Struktur</h2>
                <p className="text-gray-500 font-medium mt-1">Perbarui data jabatan dan biodata pengurus DPM HIMA PKO.</p>
              </div>
            {akdList.map(akd => (
              <div key={akd.id} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-50">
                   <h3 className="text-2xl font-black text-maroon-900 uppercase tracking-widest">{akd.name}</h3>
                   <button onClick={() => { setEditingMember({ akdId: akd.id, member: { role: 'Staf' } }); setIsModalOpen(true); }} className="bg-gray-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">+ Tambah Pengurus</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {akd.members.map(m => (
                    <div key={m.id} className="p-6 bg-gray-50 rounded-[2.5rem] flex flex-col items-center text-center group/member relative overflow-hidden transition-all hover:bg-white hover:shadow-2xl border border-transparent hover:border-maroon-900/10">
                      <div className="w-20 h-20 rounded-2xl bg-maroon-900 mb-5 overflow-hidden shadow-lg border-4 border-white transition-transform group-hover/member:rotate-3">
                        {m.photo ? <img src={m.photo} className="w-full h-full object-cover" /> : m.name.charAt(0)}
                      </div>
                      <p className="font-black text-xs text-gray-900 leading-tight mb-1 truncate w-full px-2">{m.name}</p>
                      <p className="text-[9px] font-black text-maroon-900 uppercase opacity-60 truncate w-full px-2">{m.role}</p>
                      <div className="absolute inset-0 bg-maroon-950/90 flex items-center justify-center space-x-4 opacity-0 group-hover/member:opacity-100 transition-opacity backdrop-blur-sm">
                        <button onClick={() => { setEditingMember({ akdId: akd.id, member: m }); setIsModalOpen(true); }} className="p-3 bg-white text-maroon-900 rounded-xl hover:scale-110 transition-transform"><Edit size={20}/></button>
                        <button onClick={() => deleteMember(akd.id, m.id)} className="p-3 bg-red-600 text-white rounded-xl hover:scale-110 transition-transform"><Trash2 size={20}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: DETAIL ASPIRASI */}
      {selectedAspiration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-md" onClick={closeModal}></div>
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <MessageSquare className="text-maroon-900" size={24} />
                <h3 className="text-2xl font-black uppercase tracking-tighter">Monitoring Aspirasi</h3>
              </div>
              <button onClick={closeModal} className="p-3 text-gray-400 hover:text-gray-950 transition-colors"><X size={32}/></button>
            </div>
            <div className="p-10 overflow-y-auto space-y-8 custom-scrollbar max-h-[75vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-bold uppercase text-[10px] tracking-widest">
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <p className="text-gray-400 mb-2">Pengirim</p>
                  <p className="text-gray-900">{selectedAspiration.isAnonymous ? 'ANONIM' : selectedAspiration.name}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <p className="text-gray-400 mb-2">Kontak</p>
                  <p className="text-gray-900 truncate">{selectedAspiration.email || 'Tidak dicantumkan'}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <p className="text-gray-400 mb-2">Kategori</p>
                  <p className="text-maroon-900 font-black">{selectedAspiration.category}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <p className="text-gray-400 mb-2">ID Tiket</p>
                  <p className="font-mono text-gray-900">{selectedAspiration.ticketNumber}</p>
                </div>
              </div>
              <div className="p-10 bg-white border-2 border-dashed border-gray-200 rounded-[3rem] relative">
                <Quote className="absolute top-4 right-6 text-gray-50" size={100} />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Pesan Lengkap</p>
                <p className="text-xl font-medium text-gray-800 leading-relaxed italic relative z-10">
                  "{selectedAspiration.message}"
                </p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => deleteAsp(selectedAspiration.id)} className="flex-grow py-5 rounded-3xl bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all border-2 border-red-100">Hapus Aspirasi</button>
                <button onClick={closeModal} className="flex-grow py-5 rounded-3xl bg-gray-950 text-white font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FORM (NEWS & MEMBER) */}
      {isModalOpen && (editingMember || editingNews) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-md" onClick={closeModal}></div>
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-2xl font-black uppercase tracking-tighter">{editingNews ? 'Konten Berita' : 'Biodata Pengurus'}</h3>
              <button onClick={closeModal} className="p-3 text-gray-400 hover:text-gray-950"><X size={32}/></button>
            </div>
            <div className="p-10 overflow-y-auto custom-scrollbar">
              {editingMember && (
                <form onSubmit={saveMember} className="space-y-8">
                   <div className="flex flex-col items-center mb-8">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <div className="w-32 h-32 bg-gray-100 rounded-[2.5rem] flex items-center justify-center text-gray-300 overflow-hidden border-4 border-white shadow-xl group-hover:border-maroon-900 transition-all">
                        {editingMember.member.photo ? <img src={editingMember.member.photo} className="w-full h-full object-cover" /> : <User size={48} />}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-maroon-900 text-white p-3 rounded-xl shadow-xl transform group-hover:scale-110 transition-transform"><Camera size={18} /></div>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                    <p className="mt-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Ganti Foto Profil</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input required type="text" placeholder="Nama Lengkap" value={editingMember.member.name || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, name: e.target.value}})} className="md:col-span-2 p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] outline-none focus:border-maroon-900 font-bold" />
                    <input required type="text" placeholder="Jabatan" value={editingMember.member.role || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, role: e.target.value}})} className="p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] outline-none focus:border-maroon-900 font-bold" />
                    <input type="text" placeholder="Instagram (tanpa @)" value={editingMember.member.instagram || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, instagram: e.target.value}})} className="p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] outline-none focus:border-maroon-900 font-bold" />
                    <input type="text" placeholder="NIM" value={editingMember.member.nim || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, nim: e.target.value}})} className="p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] outline-none focus:border-maroon-900 font-bold" />
                    <input type="text" placeholder="Angkatan" value={editingMember.member.angkatan || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, angkatan: e.target.value}})} className="p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] outline-none focus:border-maroon-900 font-bold" />
                    <textarea rows={2} placeholder="Motto Hidup" value={editingMember.member.motto || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, motto: e.target.value}})} className="md:col-span-2 p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] outline-none focus:border-maroon-900 font-medium text-sm"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-maroon-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Simpan Pengurus</button>
                </form>
              )}
              {editingNews && (
                <form onSubmit={saveNews} className="space-y-8">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative group cursor-pointer w-full" onClick={() => fileInputRef.current?.click()}>
                      <div className="w-full h-56 bg-gray-100 rounded-[2.5rem] flex items-center justify-center text-gray-300 overflow-hidden border-4 border-white shadow-xl group-hover:border-maroon-900 transition-all">
                        {editingNews.image ? <img src={editingNews.image} className="w-full h-full object-cover" /> : <ImageIcon size={56} />}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-maroon-900 text-white p-4 rounded-2xl shadow-xl"><Upload size={20} /></div>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </div>
                  <input required type="text" placeholder="Judul Warta" value={editingNews.title || ''} onChange={e => setEditingNews({...editingNews, title: e.target.value})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] outline-none focus:border-maroon-900 font-bold" />
                  <textarea rows={2} placeholder="Ringkasan (Excerpt)" value={editingNews.excerpt || ''} onChange={e => setEditingNews({...editingNews, excerpt: e.target.value})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] outline-none focus:border-maroon-900 text-sm font-medium"></textarea>
                  <textarea required rows={8} placeholder="Konten Warta Lengkap" value={editingNews.content || ''} onChange={e => setEditingNews({...editingNews, content: e.target.value})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] outline-none focus:border-maroon-900 text-sm font-medium"></textarea>
                  <button type="submit" className="w-full bg-maroon-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Publikasikan Warta</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f1f1; border-radius: 10px; }
      `}</style>
    </div>
  );
}
