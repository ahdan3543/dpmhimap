
import { Category, News, AKD, AspirationStatus } from '../types';

export const DUMMY_NEWS: News[] = [
  {
    id: '1',
    slug: 'pelantikan-pengurus-2025',
    title: 'Pelantikan Pengurus DPM HIMA PKO Periode 2025',
    excerpt: 'DPM HIMA PKO resmi menetapkan pengurus baru berdasarkan SK Dekan untuk masa bakti satu tahun ke depan.',
    content: 'Acara pelantikan berlangsung khidmat di Auditorium FPOK. Ketua Umum terpilih menekankan pentingnya sinergi antara legislatif dan eksekutif mahasiswa demi kemajuan prodi PKO. Pengurus baru diharapkan mampu membawa aspirasi mahasiswa lebih baik.',
    category: Category.KEGIATAN,
    author: 'Humas DPM',
    date: '2025-01-15',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070'
  },
  {
    id: '2',
    slug: 'pengesahan-prolema-2025',
    title: 'Pengesahan Program Legislasi Mahasiswa (PROLEMA) 2025',
    excerpt: 'Sidang Paripurna DPM menyepakati 5 rancangan undang-undang internal mahasiswa untuk tahun ini.',
    content: 'Dalam sidang yang berlangsung selama 5 jam, Komisi I berhasil memaparkan draf peraturan tentang transparansi dana himpunan yang kini resmi disahkan menjadi pedoman organisasi.',
    category: Category.PROKER,
    author: 'Biro Hukum',
    date: '2025-02-10',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070'
  },
  {
    id: '3',
    slug: 'penghargaan-atlet-berprestasi',
    title: 'DPM Reward: Apresiasi Mahasiswa Atlet Berprestasi PKO',
    excerpt: 'Pemberian penghargaan kepada mahasiswa PKO yang berhasil meraih medali di ajang Pekan Olahraga Mahasiswa Nasional.',
    content: 'Sebagai bentuk dukungan terhadap prestasi non-akademik, DPM memberikan insentif dan piagam penghargaan kepada 10 atlet terbaik PKO. Ini adalah bagian dari komitmen kami dalam mengapresiasi bakat olahraga.',
    category: Category.REWARD,
    author: 'Komisi II',
    date: '2025-02-28',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070'
  },
  {
    id: '4',
    slug: 'upgrading-kepemimpinan-2025',
    title: 'Upgrading Kepemimpinan: Memperkuat Integritas Pengurus',
    excerpt: 'Kegiatan internal untuk meningkatkan kapasitas kepemimpinan dan manajemen organisasi pengurus dewan.',
    content: 'Kegiatan upgrading ini menghadirkan alumni dan praktisi organisasi untuk membekali pengurus dengan kemampuan negosiasi, tata kelola sidang, dan manajemen konflik.',
    category: Category.KEGIATAN,
    author: 'Biro PSDM',
    date: '2025-03-05',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070'
  }
];

export const DUMMY_AKD: AKD[] = [
  {
    id: 'akd-bph',
    name: 'Pengurus Harian (BPH)',
    description: 'Inti kepemimpinan DPM HIMA PKO yang bertanggung jawab atas koordinasi umum, administrasi, dan kebijakan strategis organisasi.',
    members: [
      { 
        id: 'bph1', 
        name: 'Adam Faizal Ristyananda Kurniawan', 
        role: 'Ketua Umum', 
        photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop',
        nim: '21060123',
        angkatan: '2021',
        prodi: 'Pendidikan Kepelatihan Olahraga',
        instagram: 'adamfrk',
        motto: 'Berdedikasi untuk perubahan yang lebih baik bagi seluruh mahasiswa PKO.'
      },
      { id: 'bph2', name: 'Raden Mas Fiqih Nawaal Fadilah', role: 'Wakil Ketua Umum', nim: '21060124', angkatan: '2021', prodi: 'PKO', instagram: 'fiqih_n' },
      { id: 'bph3', name: 'Gita Crysdiani', role: 'Sekretaris Umum', nim: '22060125', angkatan: '2022', prodi: 'PKO', instagram: 'gita_c' },
      { id: 'bph4', name: 'Raihany Desi Putri', role: 'Sekretaris I', nim: '22060126', angkatan: '2022', prodi: 'PKO', instagram: 'raihanydp' },
      { id: 'bph5', name: 'Karisma Ayu Wulandari', role: 'Bendahara Umum', nim: '21060127', angkatan: '2021', prodi: 'PKO', instagram: 'karisma_aw' },
      { id: 'bph6', name: 'Fariz Nur Khazanah', role: 'Bendahara I', nim: '22060128', angkatan: '2022', prodi: 'PKO', instagram: 'fariz_nk' }
    ]
  },
  {
    id: 'akd-komisi',
    name: 'Komisi',
    description: 'Bertanggung jawab dalam menjalankan fungsi pengawasan dan aspirasi di lingkungan kemahasiswaan.',
    members: [
      { id: 'k-ketua', name: 'Ilham Maulana Rustandi', role: 'Ketua Komisi', nim: '21060129', angkatan: '2021', prodi: 'PKO', instagram: 'ilhammr' }
    ]
  },
  {
    id: 'akd-humas',
    name: 'Biro Hubungan Masyarakat',
    description: 'Menjembatani komunikasi antara dewan dengan mahasiswa.',
    members: [
      { id: 'h-ketua', name: 'Febriyansah', role: 'Ketua Biro', nim: '22060130', angkatan: '2022', prodi: 'PKO', instagram: 'febriyansah' }
    ]
  },
  {
    id: 'akd-psdm',
    name: 'Biro PSDM',
    description: 'Pengembangan sumber daya manusia dan harmonisasi internal.',
    members: [
      { id: 'p-ketua', name: 'Sintia Saridah Azhar', role: 'Ketua Biro', nim: '21060131', angkatan: '2021', prodi: 'PKO', instagram: 'sintia_sz' }
    ]
  }
];
