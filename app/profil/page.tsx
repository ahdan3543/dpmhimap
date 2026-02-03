
'use client';
import React, { useState, useEffect } from 'react';
import { DUMMY_AKD } from '@/data/dummy';
import { Users, BookOpen, Target, ChevronRight, User, Instagram, Quote, X, IdCard, GraduationCap, School } from 'lucide-react';
import { AKD, Member } from '@/types';

export default function ProfilePage() {
  const [akdList, setAkdList] = useState<AKD[]>([]);
  const [activeAKD, setActiveAKD] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('akd') || JSON.stringify(DUMMY_AKD));
    setAkdList(saved);
    if (saved.length > 0) setActiveAKD(saved[0].id);
  }, []);

  const selectedAKDData = akdList.find(akd => akd.id === activeAKD);

  return (
    <div className="pb-20 bg-gray-50/30">
      {/* Header */}
      <div className="bg-maroon-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-maroon-800 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Profil Organisasi</h1>
          <div className="flex items-center text-maroon-200 space-x-2 text-sm uppercase tracking-widest font-bold">
            <span>Beranda</span>
            <ChevronRight size={14} />
            <span className="text-white">Profil & Struktur</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20 space-y-12">
        {/* Visi Misi Section */}
        <section className="bg-white p-8 md:p-14 rounded-[3rem] shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                <Target className="mr-4 text-maroon-900" size={32} />
                Visi Kami
              </h2>
              <div className="bg-maroon-50 p-8 rounded-[2rem] border-l-8 border-maroon-900 relative overflow-hidden">
                <Quote className="absolute top-2 right-4 text-maroon-900/5" size={80} />
                <p className="text-maroon-900 font-bold italic text-xl leading-relaxed relative z-10">
                  "Menjadikan DPM HIMA PKO sebagai lembaga legislatif yang responsif, transparan, dan profesional dalam mewujudkan kemaslahatan mahasiswa PKO."
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                <BookOpen className="mr-4 text-maroon-900" size={32} />
                Misi Utama
              </h2>
              <ul className="space-y-4">
                {[
                  "Optimalisasi fungsi legislasi dan pengawasan internal.",
                  "Membangun sistem aspirasi yang inklusif dan progresif.",
                  "Meningkatkan sinergitas dan keharmonisan antar pengurus.",
                  "Mewujudkan transparansi informasi bagi seluruh mahasiswa."
                ].map((misi, i) => (
                  <li key={i} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                    <span className="bg-maroon-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                    <span className="text-gray-700 font-medium text-sm leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Struktur & Anggota Section */}
        <section id="akd" className="bg-white p-8 md:p-14 rounded-[3rem] shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="text-3xl font-black text-gray-900 flex items-center">
              <Users className="mr-4 text-maroon-900" size={32} />
              Struktur Kepengurusan
            </h2>
            <div className="flex flex-wrap gap-2">
              {akdList.map(akd => (
                <button
                  key={akd.id}
                  onClick={() => setActiveAKD(akd.id)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                    activeAKD === akd.id 
                    ? 'bg-maroon-900 text-white border-maroon-900 shadow-lg' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-maroon-900 hover:text-maroon-900'
                  }`}
                >
                  {akd.name}
                </button>
              ))}
            </div>
          </div>

          {selectedAKDData && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                <p className="text-gray-500 font-medium italic text-center">"{selectedAKDData.description}"</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedAKDData.members.map(member => (
                  <div 
                    key={member.id} 
                    onClick={() => setSelectedMember(member)}
                    className="flex flex-col items-center p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-2xl hover:border-maroon-900/20 transition-all group cursor-pointer text-center"
                  >
                    <div className="w-24 h-24 rounded-[2rem] bg-maroon-900 mb-6 overflow-hidden shadow-xl border-4 border-white group-hover:rotate-3 transition-transform">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-black text-4xl">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h4 className="font-black text-gray-900 text-sm leading-tight group-hover:text-maroon-900 transition-colors mb-2">{member.name}</h4>
                    <p className="text-maroon-900 text-[10px] font-black uppercase tracking-widest opacity-70">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* MODAL DETAIL ANGGOTA */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-xl" onClick={() => setSelectedMember(null)}></div>
          <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="w-full md:w-2/5 h-80 md:h-auto relative bg-maroon-950">
              {selectedMember.photo ? (
                <img src={selectedMember.photo} alt={selectedMember.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-black text-9xl">
                  {selectedMember.name.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10"></div>
              <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all md:hidden"><X size={24} /></button>
            </div>

            <div className="flex-grow p-10 md:p-14 overflow-y-auto bg-white custom-scrollbar">
              <div className="hidden md:flex justify-end mb-6">
                <button onClick={() => setSelectedMember(null)} className="p-3 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-950 transition-all"><X size={32} /></button>
              </div>

              <div className="space-y-8">
                <div>
                   <span className="bg-maroon-50 text-maroon-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-maroon-100 mb-4 inline-block">
                    {selectedAKDData?.name}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tighter mb-2">{selectedMember.name}</h2>
                  <p className="text-maroon-900 font-black uppercase tracking-widest text-lg">{selectedMember.role}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">NIM</p>
                    <p className="font-bold text-gray-900">{selectedMember.nim || '-'}</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Angkatan</p>
                    <p className="font-bold text-gray-900">{selectedMember.angkatan || '-'}</p>
                  </div>
                </div>

                {selectedMember.motto && (
                  <div className="p-8 bg-maroon-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                    <Quote className="absolute top-4 right-6 text-white/10" size={80} />
                    <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-50">Kutipan Pribadi</p>
                    <p className="text-lg font-bold italic leading-relaxed relative z-10">"{selectedMember.motto}"</p>
                  </div>
                )}

                {selectedMember.instagram && (
                   <a 
                   href={`https://instagram.com/${selectedMember.instagram}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center space-x-4 bg-gray-950 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-maroon-900 transition-all shadow-xl group"
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
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f1f1; border-radius: 10px; }
      `}</style>
    </div>
  );
}
