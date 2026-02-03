
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DUMMY_AKD } from '../data/dummy';
import { 
  Users, BookOpen, Target, ChevronRight, User, 
  Instagram, Quote, X, IdCard, GraduationCap, School, Briefcase, Layers
} from 'lucide-react';
import { AKD, Member } from '../types';

const Profile: React.FC = () => {
  const [akdList, setAkdList] = useState<AKD[]>([]);
  const [activeAKD, setActiveAKD] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    const savedAkd = JSON.parse(localStorage.getItem('akd') || JSON.stringify(DUMMY_AKD));
    setAkdList(savedAkd);
    if (savedAkd.length > 0) setActiveAKD(savedAkd[0].id);
  }, []);

  const selectedAKDData = akdList.find(akd => akd.id === activeAKD);

  return (
    <div className="pb-20">
      {/* Hero Header Profil */}
      <div className="bg-red-900 py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full -mr-32 -mt-32 opacity-20 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Profil Organisasi</h1>
          <div className="flex items-center text-red-200 space-x-2 text-sm uppercase tracking-[0.3em] font-bold">
            <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-white">Profil & Struktur</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {/* Visi Misi Section */}
            <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100">
              <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center">
                <Target className="mr-4 text-red-900" size={36} />
                Visi & Misi
              </h2>
              <div className="bg-red-50 p-8 rounded-[2rem] border-l-8 border-red-900 mb-8 relative overflow-hidden">
                <Quote className="absolute top-4 right-6 text-red-900/5" size={120} />
                <p className="text-gray-900 font-bold italic text-xl leading-relaxed relative z-10">
                  "Menjadikan DPM HIMA PKO sebagai lembaga legislatif yang responsif, transparan, dan profesional dalam mewujudkan kemaslahatan mahasiswa PKO."
                </p>
              </div>
            </section>

            {/* Struktur & Anggota Section */}
            <section id="akd" className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <h2 className="text-3xl font-black text-gray-900 flex items-center">
                  <Users className="mr-4 text-red-900" size={36} />
                  Struktur AKD
                </h2>
                <div className="flex flex-wrap gap-2">
                  {akdList.map(akd => (
                    <button
                      key={akd.id}
                      onClick={() => setActiveAKD(akd.id)}
                      className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        activeAKD === akd.id 
                        ? 'bg-red-900 text-white border-red-900 shadow-lg' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-red-900 hover:text-red-900'
                      }`}
                    >
                      {akd.name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedAKDData && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="mb-12 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 relative">
                    <p className="text-gray-600 leading-relaxed font-medium text-lg italic">"{selectedAKDData.description}"</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedAKDData.members.map(member => (
                      <div 
                        key={member.id} 
                        onClick={() => setSelectedMember(member)}
                        className="flex items-center space-x-6 p-6 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-2xl hover:border-red-900/30 transition-all group cursor-pointer"
                      >
                        <div className="w-20 h-20 rounded-[1.5rem] bg-red-900 flex-shrink-0 overflow-hidden shadow-lg border-2 border-white group-hover:rotate-3 transition-transform">
                          {member.photo ? (
                            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white font-black text-3xl">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-black text-gray-900 text-base leading-tight group-hover:text-red-900 transition-colors line-clamp-2">{member.name}</h4>
                          <p className="text-red-900 text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-70">{member.role}</p>
                        </div>
                        <div className="ml-auto bg-gray-50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <ChevronRight size={20} className="text-red-900" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8">
            {/* Sidebar Dokumen Dihapus Sesuai Permintaan */}
            <div className="bg-gray-50 p-10 rounded-[3rem] border-2 border-dashed border-gray-200 text-center">
              <Users className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-gray-400 font-black uppercase tracking-widest text-xs">Pilar Legislatif</h3>
              <p className="text-gray-400 text-[10px] mt-2">Menjunjung tinggi transparansi dan integritas organisasi.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL ANGGOTA */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-gray-950/90 backdrop-blur-xl" onClick={() => setSelectedMember(null)}></div>
          <div className="bg-white w-full max-w-5xl rounded-[3rem] md:rounded-[5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-500 border border-white/10">
            
            <div className="w-full md:w-[45%] h-96 md:h-auto relative bg-red-950">
              {selectedMember.photo ? (
                <img src={selectedMember.photo} alt={selectedMember.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10 font-black text-[20rem] select-none">
                  {selectedMember.name.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10"></div>
              <button onClick={() => setSelectedMember(null)} className="absolute top-8 right-8 p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all md:hidden"><X size={24} /></button>
            </div>

            <div className="flex-grow p-10 md:p-20 overflow-y-auto bg-white custom-scrollbar">
              <div className="hidden md:flex justify-end mb-8">
                <button onClick={() => setSelectedMember(null)} className="p-4 hover:bg-gray-100 rounded-full text-gray-300 hover:text-gray-900 transition-all group"><X size={40} className="group-hover:rotate-90 transition-transform" /></button>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-2 bg-red-900 text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-900/20">
                      <Layers size={14} />
                      <span>DIVISI: {selectedAKDData?.name}</span>
                    </div>
                  </div>
                  <div className="border-l-8 border-red-900 pl-8">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] uppercase tracking-tighter mb-4">{selectedMember.name}</h2>
                    <div className="flex items-center text-red-700 font-black text-xl md:text-2xl uppercase tracking-[0.1em]">
                      <Briefcase className="mr-3" size={24} />
                      <span>{selectedMember.role}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-5 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-white transition-all">
                    <div className="bg-white p-4 rounded-2xl text-red-900 shadow-sm group-hover:bg-red-900 group-hover:text-white transition-all"><IdCard size={24}/></div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">NIM</p>
                      <p className="text-lg font-black text-gray-900">{selectedMember.nim || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-white transition-all">
                    <div className="bg-white p-4 rounded-2xl text-red-900 shadow-sm group-hover:bg-red-900 group-hover:text-white transition-all"><GraduationCap size={24}/></div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Angkatan</p>
                      <p className="text-lg font-black text-gray-900">{selectedMember.angkatan || '-'}</p>
                    </div>
                  </div>
                </div>

                {selectedMember.motto && (
                  <div className="p-10 bg-red-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                    <Quote className="absolute top-4 right-8 text-white/10" size={100} />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-60">Motto</p>
                    <p className="text-xl md:text-2xl font-bold italic leading-relaxed relative z-10">"{selectedMember.motto}"</p>
                  </div>
                )}

                {/* Sosial Media Section */}
                {selectedMember.instagram && (
                   <a 
                   href={`https://instagram.com/${selectedMember.instagram}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center space-x-4 bg-gray-950 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-red-900 transition-all shadow-2xl group"
                 >
                   <Instagram size={22} className="group-hover:rotate-12 transition-transform" />
                   <span>Follow @{selectedMember.instagram}</span>
                 </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f1f1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Profile;
