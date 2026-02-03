
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, LogOut, MessageSquare, Trash2, Edit, Plus, 
  FileText, Users, User, X, Save, Image as ImageIcon, AlertCircle, Upload, Camera,
  Eye, Clock, CheckCircle2, Briefcase, Layers, Quote, IdCard, GraduationCap, School
} from 'lucide-react';
import { Aspiration, AspirationStatus, News, AKD, Category, Member } from '../types';
import { formatDate } from '../lib/utils';
import { DUMMY_NEWS, DUMMY_AKD } from '../data/dummy';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'aspirasi' | 'berita' | 'akd'>('aspirasi');

  const [aspirations, setAspirations] = useState<Aspiration[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [akdList, setAkdList] = useState<AKD[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAspiration, setSelectedAspiration] = useState<Aspiration | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<News> | null>(null);
  const [editingMember, setEditingMember] = useState<{akdId: string, member: Partial<Member>} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync data on load and tab switch to ensure fresh data
  const loadData = () => {
    const savedAsp = JSON.parse(localStorage.getItem('aspirations') || '[]');
    const savedNews = JSON.parse(localStorage.getItem('news') || JSON.stringify(DUMMY_NEWS));
    const savedAkd = JSON.parse(localStorage.getItem('akd') || JSON.stringify(DUMMY_AKD));
    
    setAspirations(savedAsp.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setNews(savedNews);
    setAkdList(savedAkd);
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (password === 'dpmhima23') { 
      setIsLoggedIn(true);
      loadData();
    } else {
      setLoginError('KODE AKSES TIDAK VALID!');
    }
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
    if (confirm('Hapus aspirasi ini secara permanen?')) {
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
    if (confirm('Hapus pengurus ini?')) {
      const updated = akdList.map(akd => akd.id === akdId ? { ...akd, members: akd.members.filter(m => m.id !== memberId) } : akd);
      setAkdList(updated);
      localStorage.setItem('akd', JSON.stringify(updated));
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white p-12 rounded-[4rem] shadow-2xl text-center border border-gray-100 animate-in zoom-in duration-500">
          <div className="bg-red-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 text-white shadow-xl shadow-red-900/20">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">Otentikasi Pengurus</h2>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-10">DPM HIMA PKO</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Kode Sandi Administrator" 
                className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[2rem] outline-none focus:border-red-900 text-center font-black text-xl transition-all" 
              />
              {loginError && <p className="text-red-600 text-[10px] font-black uppercase tracking-widest">{loginError}</p>}
            </div>
            <button className="w-full bg-red-900 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-red-900/20 active:scale-95 transition-all">Masuk Panel Kendali</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-80 bg-gray-950 text-white p-8 md:fixed md:h-screen z-50 flex flex-col">
        <div className="flex items-center space-x-4 mb-16">
          <div className="w-12 h-12 bg-red-900 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">D</div>
          <div>
            <h2 className="font-black text-sm uppercase tracking-widest leading-none">Admin Panel</h2>
            <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-tighter">Legislative Control</p>
          </div>
        </div>
        <nav className="space-y-4 flex-grow">
          {(['aspirasi', 'berita', 'akd'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center space-x-4 p-5 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-widest ${activeTab === tab ? 'bg-red-900 shadow-xl' : 'text-gray-500 hover:bg-white/5'}`}>
              {tab === 'akd' ? <Users size={18}/> : tab === 'berita' ? <FileText size={18}/> : <MessageSquare size={18}/>}
              <span>{tab === 'akd' ? 'Struktur' : tab}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center justify-center space-x-4 p-5 rounded-[1.5rem] text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500/5 transition-all border border-red-500/20 mt-8">
          <LogOut size={18}/> <span>Keluar Sistem</span>
        </button>
      </aside>

      <main className="flex-grow md:ml-80 p-8 md:p-14">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900">Manajemen {activeTab}</h1>
            <p className="text-gray-400 font-medium mt-2">Kelola data {activeTab} untuk keterbukaan informasi mahasiswa.</p>
          </header>
          
          {activeTab === 'aspirasi' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Tiket</th>
                      <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Pengirim</th>
                      <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Status</th>
                      <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {aspirations.length > 0 ? aspirations.map(a => (
                      <tr key={a.id} className="hover:bg-gray-50/50 transition-all group">
                        <td className="p-8">
                          <div className="font-mono font-black text-red-900">{a.ticketNumber}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">{formatDate(a.createdAt)}</div>
                        </td>
                        <td className="p-8">
                          <div className="font-bold text-gray-900">{a.isAnonymous ? 'ANONIM' : a.name}</div>
                          <div className="text-xs text-gray-400">{a.category}</div>
                        </td>
                        <td className="p-8">
                          <select 
                            value={a.status} 
                            onChange={e => updateAspStatus(a.id, e.target.value as AspirationStatus)}
                            className="p-3 rounded-xl text-[9px] font-black uppercase tracking-widest outline-none border-2 border-gray-100 focus:border-red-900 bg-white"
                          >
                            {Object.values(AspirationStatus).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="p-8 text-right">
                          <div className="flex justify-end space-x-3">
                            <button onClick={() => setSelectedAspiration(a)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-900 shadow-sm"><Eye size={18}/></button>
                            <button onClick={() => deleteAsp(a.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="p-20 text-center text-gray-400 font-black uppercase tracking-widest text-xs">Belum Ada Aspirasi Masuk</td>
                      </tr>
                    )}
                  </tbody>
                </table>
               </div>
            </div>
          )}

          {activeTab === 'berita' && (
            <div className="space-y-10 animate-in fade-in duration-500">
               <button onClick={() => { setEditingNews({ category: Category.KEGIATAN, author: 'Admin' }); setIsModalOpen(true); }} className="bg-red-900 text-white px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center space-x-3 active:scale-95 transition-all">
                <Plus size={18}/> <span>Tulis Berita Baru</span>
               </button>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.length > 0 ? news.map(n => (
                  <div key={n.id} className="bg-white p-6 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-500">
                    <div className="h-48 rounded-[2rem] overflow-hidden mb-6 relative">
                      <img src={n.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-red-900 uppercase">{n.category}</div>
                    </div>
                    <h3 className="font-black text-gray-900 line-clamp-2 mb-4 group-hover:text-red-900 transition-colors">{n.title}</h3>
                    <div className="mt-auto flex justify-between gap-3">
                      <button onClick={() => { setEditingNews(n); setIsModalOpen(true); }} className="flex-grow p-4 bg-gray-50 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-900 hover:text-white transition-all"><Edit size={16}/></button>
                      <button onClick={() => deleteNews(n.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full p-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Belum Ada Berita</div>
                )}
               </div>
            </div>
          )}

          {activeTab === 'akd' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              {akdList.map(akd => (
                <div key={akd.id} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                  <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-50">
                    <h3 className="text-xl font-black text-red-900 uppercase tracking-widest">{akd.name}</h3>
                    <button onClick={() => { setEditingMember({ akdId: akd.id, member: { role: 'Staf' } }); setIsModalOpen(true); }} className="bg-gray-950 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">+ Anggota</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {akd.members.map(m => (
                      <div key={m.id} className="p-4 bg-gray-50 rounded-3xl flex items-center space-x-4 group/member relative overflow-hidden transition-all hover:bg-white hover:shadow-xl border border-transparent hover:border-red-900/10">
                        <div className="w-12 h-12 rounded-xl bg-red-900 flex-shrink-0 flex items-center justify-center text-white font-black overflow-hidden shadow-md">
                          {m.photo ? <img src={m.photo} className="w-full h-full object-cover" /> : m.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-black text-[11px] truncate leading-none mb-1">{m.name}</p>
                          <p className="text-[9px] font-bold text-red-900 uppercase opacity-60 truncate">{m.role}</p>
                        </div>
                        <div className="absolute inset-0 bg-red-950/90 flex items-center justify-center space-x-4 opacity-0 group-hover/member:opacity-100 transition-opacity">
                          <button onClick={() => { setEditingMember({ akdId: akd.id, member: m }); setIsModalOpen(true); }} className="text-white"><Edit size={18}/></button>
                          <button onClick={() => deleteMember(akd.id, m.id)} className="text-red-400"><Trash2 size={18}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL PENAMPUNG FORM */}
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
                <form onSubmit={saveMember} className="space-y-6">
                   <div className="flex flex-col items-center mb-8">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <div className="w-32 h-32 bg-gray-100 rounded-[2rem] flex items-center justify-center text-gray-300 overflow-hidden border-4 border-white shadow-xl group-hover:border-red-900 transition-all">
                        {editingMember.member.photo ? <img src={editingMember.member.photo} className="w-full h-full object-cover" /> : <User size={48} />}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-red-900 text-white p-2.5 rounded-xl shadow-xl transform group-hover:scale-110 transition-transform"><Camera size={18} /></div>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                    <p className="mt-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Ketuk Area Foto Untuk Upload</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input required type="text" placeholder="Nama Lengkap" value={editingMember.member.name || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, name: e.target.value}})} className="md:col-span-2 p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-900 font-bold" />
                    <input required type="text" placeholder="Jabatan" value={editingMember.member.role || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, role: e.target.value}})} className="p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-900 font-bold" />
                    <input type="text" placeholder="NIM" value={editingMember.member.nim || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, nim: e.target.value}})} className="p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-900 font-bold" />
                    <input type="text" placeholder="Angkatan" value={editingMember.member.angkatan || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, angkatan: e.target.value}})} className="p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-900 font-bold" />
                    <input type="text" placeholder="Instagram (tanpa @)" value={editingMember.member.instagram || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, instagram: e.target.value}})} className="p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-900 font-bold" />
                    <textarea rows={2} placeholder="Motto Hidup" value={editingMember.member.motto || ''} onChange={e => setEditingMember({...editingMember, member: {...editingMember.member, motto: e.target.value}})} className="md:col-span-2 p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-900 font-medium text-sm"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-red-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Simpan Data Pengurus</button>
                </form>
              )}
              {editingNews && (
                <form onSubmit={saveNews} className="space-y-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative group cursor-pointer w-full" onClick={() => fileInputRef.current?.click()}>
                      <div className="w-full h-56 bg-gray-100 rounded-[2.5rem] flex items-center justify-center text-gray-300 overflow-hidden border-4 border-white shadow-xl group-hover:border-red-900 transition-all">
                        {editingNews.image ? <img src={editingNews.image} className="w-full h-full object-cover" /> : <ImageIcon size={56} />}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-red-900 text-white p-4 rounded-2xl shadow-xl"><Upload size={20} /></div>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </div>
                  <input required type="text" placeholder="Judul Berita" value={editingNews.title || ''} onChange={e => setEditingNews({...editingNews, title: e.target.value})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-900 font-bold" />
                  <textarea rows={2} placeholder="Ringkasan" value={editingNews.excerpt || ''} onChange={e => setEditingNews({...editingNews, excerpt: e.target.value})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-900 text-sm font-medium"></textarea>
                  <textarea required rows={8} placeholder="Konten Lengkap" value={editingNews.content || ''} onChange={e => setEditingNews({...editingNews, content: e.target.value})} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-red-900 text-sm font-medium"></textarea>
                  <button type="submit" className="w-full bg-red-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Publikasikan Berita</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DETAIL ASPIRASI */}
      {selectedAspiration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-md" onClick={closeModal}></div>
          <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Monitoring Aspirasi</h3>
              <button onClick={closeModal} className="p-3 text-gray-400 hover:text-gray-950 transition-colors"><X size={32}/></button>
            </div>
            <div className="p-10 overflow-y-auto space-y-10 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4 font-bold uppercase text-[10px] tracking-widest">
                <div className="p-6 bg-gray-50 rounded-[2rem]">
                  <p className="text-gray-400 mb-1">Pengirim</p>
                  <p className="text-gray-900">{selectedAspiration.isAnonymous ? 'ANONIM' : selectedAspiration.name}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-[2rem]">
                  <p className="text-gray-400 mb-1">Kategori</p>
                  <p className="text-gray-900">{selectedAspiration.category}</p>
                </div>
              </div>
              <div className="p-10 bg-white border-2 border-dashed border-gray-200 rounded-[3rem] relative">
                <Quote className="absolute top-4 right-6 text-gray-50" size={100} />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Pesan Aspirasi</p>
                <p className="text-xl font-medium text-gray-800 leading-relaxed italic relative z-10">"{selectedAspiration.message}"</p>
              </div>
              <button onClick={() => deleteAsp(selectedAspiration.id)} className="w-full py-5 rounded-2xl bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Hapus Permanen</button>
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
};

export default Admin;
