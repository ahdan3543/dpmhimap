
'use client';
import React, { useState } from 'react';
import { Send, CheckCircle2, Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { generateTicket } from '@/lib/utils';
import { AspirationStatus } from '@/types';

export default function AspirasiPage() {
  const [formData, setFormData] = useState({
    name: '', nim: '', email: '', category: 'Akademik', message: '', isAnonymous: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ticket = generateTicket();
      const existing = JSON.parse(localStorage.getItem('aspirations') || '[]');
      const newAsp = { ...formData, id: Date.now().toString(), ticketNumber: ticket, status: AspirationStatus.BARU, createdAt: new Date().toISOString() };
      localStorage.setItem('aspirations', JSON.stringify([...existing, newAsp]));
      setTicketNum(ticket);
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 text-center">
        <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100">
          <CheckCircle2 size={56} className="text-green-600 mx-auto mb-8" />
          <h2 className="text-3xl font-black mb-4">Aspirasi Terkirim!</h2>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 font-mono text-2xl text-maroon-900">{ticketNum}</div>
          <button onClick={() => setSubmitted(false)} className="btn-maroon w-full">Kirim Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="bg-maroon-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Suara Mahasiswa</h1>
          <p className="text-maroon-200">Salurkan aspirasimu untuk kemajuan PKO.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between bg-maroon-50 p-4 rounded-2xl">
              <span className="font-bold text-maroon-900">Kirim sebagai Anonim?</span>
              <input type="checkbox" checked={formData.isAnonymous} onChange={e => setFormData({...formData, isAnonymous: e.target.checked})} className="w-5 h-5 accent-maroon-900" />
            </div>
            {!formData.isAnonymous && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nama" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-maroon-900" />
                <input type="text" placeholder="NIM" value={formData.nim} onChange={e => setFormData({...formData, nim: e.target.value})} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-maroon-900" />
              </div>
            )}
            <textarea required rows={5} placeholder="Pesan Aspirasi..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-3xl outline-none focus:border-maroon-900"></textarea>
            <button type="submit" disabled={loading} className="btn-maroon w-full">{loading ? 'Mengirim...' : 'Kirim Aspirasi'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
