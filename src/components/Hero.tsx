import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Droplets } from 'lucide-react';
import heroImg from '../assets/images/hero_botanical_nursery_1791091038751.jpg';

interface HeroProps {
  onStartQuiz: () => void;
  onExploreCatalog: () => void;
  onOpenStickyNotes: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQuiz,
  onExploreCatalog,
  onOpenStickyNotes,
}) => {
  return (
    <section id="home" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-stone-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Intentional CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <span>Kurasi Tanaman Segar</span>
              <span aria-hidden="true">·</span>
              <span>Garansi Sehat 14 Hari</span>
              <span aria-hidden="true">·</span>
              <span>Komunitas Berkebun</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-[1.15] text-balance">
              Hadirkan Keasrian Alami di Setiap Sudut Ruang Anda.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              LittleSeed Plants menyajikan tanaman hias berkualitas yang disesuaikan dengan kondisi cahaya, luas ruang, serta keamanan hewan peliharaan Anda—lengkap dengan panduan digital otomatis dan sticky notes komunitas.
            </p>

            {/* Direct routes matching Goal 1 and Community */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onStartQuiz}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all hover:translate-y-[-1px]"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                Mulai Plant Finder (Kuis 1 Menit)
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors"
              >
                Lihat Semua Tanaman
              </button>
            </div>

            {/* Claim-to-Proof Indicators */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-stone-200/80 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Tanpa Ragu: Garansi Hidup 14 Hari</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Digital Care Card Otomatis</span>
              </div>
              <button
                onClick={onOpenStickyNotes}
                className="flex items-center gap-2 text-left hover:text-emerald-800 transition-colors"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Tips Ahli di Sticky Notes</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Botanical Hero Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-stone-100 border border-stone-200/60 aspect-[16/10] sm:aspect-[16/11]">
              <img
                src={heroImg}
                alt="Ruang pamer LittleSeed Plants dengan beragam tanaman hias rimbun bermandikan cahaya alami"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs uppercase font-medium tracking-wider text-stone-200">
                    Koleksi Musim Ini
                  </p>
                  <p className="text-sm sm:text-base font-serif font-medium text-stone-100">
                    Spesies tangguh berdaun eksotis untuk iklim hunian Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
