
import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { generateTicket } from '../lib/utils';
import { AspirationStatus } from '../types';

const Aspirasi: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    email: '',
    category: 'Akademik',
    message: '',
    isAnonymous: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const ticket = generateTicket();
      
      // Save to local storage for demo
      const existing = JSON.parse(localStorage.getItem('aspirations') || '[]');
      const newAsp = {
        ...formData,
        id: Date.now().toString(),
        ticketNumber: ticket,
        status: AspirationStatus.BARU,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('aspirations', JSON.stringify([...existing, newAsp]));
      
      setTicketNum(ticket);
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl text-center border border-gray-100 animate-in zoom-in duration-500">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
            <CheckCircle2 size={56} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Aspirasi Terkirim!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Terima kasih telah bersuara. Aspirasimu telah kami terima dan akan segera diproses oleh Komisi I (Aspirasi & Advokasi).
          </p>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-10">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-2">Nomor Tiket Anda</span>
            <span className="text-3xl font-mono font-black text-red-900">{ticketNum}</span>
            <p className="text-[10px] text-gray-400 mt-4 italic">Simpan nomor ini untuk mengecek status aspirasi Anda di masa mendatang.</p>
          </div>
          <button 
            onClick={() => { setSubmitted(false); setFormData({ ...formData, message: '' }); }}
            className="w-full bg-red-900 text-white py-4 rounded-full font-bold hover:bg-red-950 transition-all shadow-lg"
          >
            Kirim Aspirasi Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-red-900 py-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Suara Mahasiswa <br /><span className="text-red-300 underline decoration-red-500 decoration-8 underline-offset-8">Aksi Nyata DPM</span></h1>
          <p className="text-red-100 text-lg md:text-xl max-w-2xl">Salurkan keluhan, saran, dan aspirasimu secara aman. Identitasmu adalah prioritas kami.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Identity Toggle */}
                <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-900 p-3 rounded-2xl text-white">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-900">Mode Anonim</h4>
                      <p className="text-red-700 text-xs">Identitasmu tidak akan ditampilkan publik.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                {!formData.isAnonymous && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700">Nama Lengkap</label>
                      <input 
                        type="text" 
                        placeholder="Contoh: Andi Wijaya"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700">NIM</label>
                      <input 
                        type="text" 
                        placeholder="Contoh: 210601001"
                        value={formData.nim}
                        onChange={(e) => setFormData({...formData, nim: e.target.value})}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Email / WhatsApp</label>
                    <input 
                      type="text" 
                      placeholder="Untuk feedback status"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Kategori Aspirasi</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all outline-none appearance-none"
                    >
                      <option>Akademik</option>
                      <option>Fasilitas</option>
                      <option>Organisasi</option>
                      <option>Lingkungan Kampus</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Pesan Aspirasi <span className="text-red-500">*</span></label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tuliskan keluhan atau saranmu secara jelas dan objektif..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all outline-none"
                  ></textarea>
                </div>

                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-start space-x-3 text-blue-800 text-sm">
                  <Info className="flex-shrink-0 mt-0.5" size={20} />
                  <p>Aspirasi yang masuk akan didata dan dibahas dalam Rapat Komisi I setiap hari Jumat. Kamu akan mendapatkan update status melalui email/nomor yang dicantumkan.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full py-5 rounded-full font-bold text-xl flex items-center justify-center space-x-3 transition-all shadow-xl ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-900 text-white hover:bg-red-950 shadow-red-900/20'
                  }`}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Kirim Aspirasi Sekarang</span>
                      <Send size={24} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <HelpCircle className="mr-3 text-red-500" />
                Cara Kerja
              </h3>
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-900 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold mb-1">Pengisian Form</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Isi data diri atau pilih mode anonim jika ingin merahasiakan identitas.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-900 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold mb-1">Verifikasi Data</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Komisi I akan memeriksa keaslian dan relevansi pesan yang masuk.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-900 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold mb-1">Tindak Lanjut</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Aspirasi akan dibawa ke rapat birokrasi atau pengurus HIMA.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
              <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-900">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Penyalahgunaan</h3>
              <p className="text-gray-500 text-sm leading-relaxed">DPM berhak menolak aspirasi yang mengandung SARA, ujaran kebencian, atau informasi palsu (Hoax).</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Aspirasi;
