import React from 'react';
import { Sprout, Heart, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenFinder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenFinder,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                LittleSeed Plants
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Toko tanaman hias kurasi dan komunitas berkebun modern. Membantu Anda memilih, merawat, dan menumbuhkan keasrian di rumah dengan panduan digital otomatis.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Garansi 14 Hari Tanaman Sehat</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Eksplorasi
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('katalog')}
                  className="hover:text-white transition-colors"
                >
                  Katalog Tanaman Lengkap
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFinder}
                  className="hover:text-white transition-colors text-emerald-400"
                >
                  Kuis Plant Finder Personal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('sticky-notes')}
                  className="hover:text-white transition-colors"
                >
                  Papan Sticky Notes Komunitas
                </button>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Solusi & Fitur
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>Status Bar Kelembapan & Cahaya</li>
              <li>Filter Kriteria Ganda (Multi-select)</li>
              <li>Automated Digital Care Card</li>
              <li>Koleksi 100% Ramah Hewan (Pet-Friendly)</li>
            </ul>
          </div>

          {/* Contact & Nursery */}
          <div className="space-y-3 text-xs text-stone-400">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Greenhouse & Nursery
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>Jl. Nirwana Botani No. 42, Kebayoran Baru, Jakarta Selatan</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-stone-400 shrink-0" />
              <span>halo@littleseedplants.id</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} LittleSeed Plants. Dibuat dengan cinta untuk para pecinta tanaman dan tukang kebun.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Privasi</span>
            <span aria-hidden="true">·</span>
            <span>Syarat & Garansi</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Sprout className="w-3.5 h-3.5" />
              <span>Green Living</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
