export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  category: string;
  // Key Info Summary
  light: 'Minim cahaya' | 'Cahaya tidak langsung' | 'Cahaya terang';
  lightLevel: number; // 1-5
  lightDesc: string;
  watering: '1-2 minggu sekali' | '5-7 hari sekali' | '2-3 hari sekali';
  moistureLevel: number; // 1-5
  moistureDesc: string;
  size: 'Kecil' | 'Sedang' | 'Besar';
  dimensions: string;
  petFriendly: boolean;
  difficulty: 'Pemula' | 'Menengah' | 'Ahli';
  airPurifying: boolean;
  popularityScore: number;
  // Collapsible Technical Detail
  origin: string;
  family: string;
  soilMix: string;
  fertilizerSchedule: string;
  temperature: string;
  commonPests: string;
  propagation: string;
}

export interface QuizAnswers {
  light: 'low' | 'medium' | 'bright';
  space: 'small' | 'medium' | 'large';
  pets: 'yes' | 'no';
  experience: 'beginner' | 'intermediate' | 'expert';
}

export interface FilterState {
  search: string;
  quickTag: string;
  sizes: ('Kecil' | 'Sedang' | 'Besar')[];
  lights: ('Minim cahaya' | 'Cahaya tidak langsung' | 'Cahaya terang')[];
  difficulties: ('Pemula' | 'Menengah' | 'Ahli')[];
  petFriendlyOnly: boolean;
  airPurifyingOnly: boolean;
  sortBy: 'recommended' | 'popular' | 'easy' | 'price-asc' | 'price-desc';
}

export interface StickyNoteItem {
  id: string;
  author: string;
  role: 'Ahli Tanaman' | 'Pecinta Kebun' | 'Pemula' | 'Staff LittleSeed';
  plantTag: string;
  title: string;
  content: string;
  color: 'emerald' | 'amber' | 'rose' | 'sky' | 'stone';
  likes: number;
  userLiked?: boolean;
  createdAt: string;
  pinned?: boolean;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
  selectedPot: 'Nursery Plastik' | 'Keramik Terakota' | 'Keramik Ivory Matte';
}

export interface CareProfile {
  userName: string;
  city: string;
  roomType: 'Ruang Tamu Ber-AC' | 'Kamar Tidur Sejuk' | 'Balkon Terbuka' | 'Meja Kerja Minimalis';
  lightExposure: string;
  notificationEnabled: boolean;
}
