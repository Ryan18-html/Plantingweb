import React from 'react';
import { ShoppingBag, Sparkles, MessageSquareHeart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenCareCardDemo: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenQuiz,
  onOpenCareCardDemo,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('home');
          }}
          className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
          LittleSeed Plants
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigateSection('katalog')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap"
          >
            Katalog Tanaman
          </button>
          <button
            onClick={onOpenQuiz}
            className="hover:text-stone-900 transition-colors whitespace-nowrap flex items-center gap-1.5 text-emerald-800 font-semibold"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Plant Finder
          </button>
          <button
            onClick={() => onNavigateSection('sticky-notes')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <MessageSquareHeart className="w-4 h-4 text-amber-600" />
            Sticky Notes Kebun
          </button>
          <button
            onClick={onOpenCareCardDemo}
            className="hover:text-stone-900 transition-colors whitespace-nowrap"
          >
            Digital Care Card
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuiz}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200/90 rounded-lg transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Kuis Finder
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Buka Keranjang Belanja"
            className="relative p-2.5 text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium">Keranjang</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center text-[11px] font-bold text-white bg-emerald-700 rounded-full h-5 min-w-[20px] px-1 tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
