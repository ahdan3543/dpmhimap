
export enum Category {
  PROKER = 'Program Kerja',
  REWARD = 'Reward',
  KEGIATAN = 'Kegiatan'
}

export interface News {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  image: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  photo?: string;
  nim?: string;
  angkatan?: string;
  prodi?: string;
  instagram?: string;
  motto?: string;
}

export interface AKD {
  id: string;
  name: string;
  description: string;
  members: Member[];
}

export enum AspirationStatus {
  BARU = 'Baru',
  PROSES = 'Diproses',
  SELESAI = 'Selesai'
}

export interface Aspiration {
  id: string;
  ticketNumber: string;
  name?: string;
  nim?: string;
  email?: string;
  category: string;
  message: string;
  isAnonymous: boolean;
  status: AspirationStatus;
  createdAt: string;
}
