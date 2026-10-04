import React, { useState } from 'react';
import {
  X,
  Sun,
  Droplets,
  Ruler,
  PawPrint,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShoppingBag,
  CheckCircle,
  Share2,
  Calendar,
  Layers,
  Thermometer,
  Bug,
  Sprout,
  ShieldCheck,
} from 'lucide-react';
import { Plant } from '../types';

interface PlantDetailModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (plant: Plant, pot: 'Nursery Plastik' | 'Keramik Terakota' | 'Keramik Ivory Matte', qty: number) => void;
  onOpenCareCard: (plant: Plant) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  isOpen,
  onClose,
  onAddToCart,
  onOpenCareCard,
}) => {
  const [selectedPot, setSelectedPot] = useState<'Nursery Plastik' | 'Keramik Terakota' | 'Keramik Ivory Matte'>('Nursery Plastik');
  const [quantity, setQuantity] = useState<number>(1);
  const [isTechnicalExpanded, setIsTechnicalExpanded] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  if (!isOpen || !plant) return null;

  const potPriceAdjust = {
    'Nursery Plastik': 0,
    'Keramik Terakota': 35000,
    'Keramik Ivory Matte': 45000,
  };

  const currentUnitPrice = plant.price + potPriceAdjust[selectedPot];
  const totalPrice = currentUnitPrice * quantity;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup Detail Tanaman"
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/90 hover:bg-stone-100 rounded-full shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            
            {/* Left Column: Image & Quick Badges */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-stone-100 aspect-[4/3] sm:aspect-square border border-stone-200/80">
                <img
                  src={plant.image}
                  alt={`Tanaman hias ${plant.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {plant.petFriendly ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded shadow-xs">
                      <PawPrint className="w-3.5 h-3.5 text-emerald-700" />
                      100% Pet-Friendly
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded shadow-xs">
                      Jauhkan dari Hewan
                    </span>
                  )}

                  {plant.airPurifying && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-900 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded shadow-xs">
                      Pembersih Udara
                    </span>
                  )}
                </div>
              </div>

              {/* Digital Care Card Preview Teaser Box */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-semibold text-emerald-950">
                    Termasuk Automated Digital Care Card
                  </p>
                  <p className="text-emerald-800 mt-0.5 leading-relaxed">
                    Setelah pembelian, Anda otomatis mendapatkan panduan siram & pemupukan personal dengan pengingat jadwal berbasis kondisi rumah Anda.
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenCareCard(plant)}
                    className="mt-2 text-xs font-semibold text-emerald-900 hover:text-emerald-950 underline underline-offset-2 flex items-center gap-1"
                  >
                    <span>Coba Simulasi Care Card Tanaman Ini</span>
                    <Calendar className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Key Info Summary + Sleek Status Bar + Purchase */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                {/* Header Info */}
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span>Kategori: {plant.category}</span>
                    <button
                      type="button"
                      onClick={handleShare}
                      className="text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copySuccess ? 'Tersalin!' : 'Bagikan'}</span>
                    </button>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                    {plant.name}
                  </h1>

                  <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                    {plant.tagline}
                  </p>

                  <div className="mt-2.5 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-stone-900 tabular-nums">
                      Rp {currentUnitPrice.toLocaleString('id-ID')}
                    </span>
                    {plant.originalPrice && (
                      <span className="text-sm text-stone-400 line-through tabular-nums">
                        Rp {plant.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Stok Tersedia: {plant.stock} pot
                    </span>
                  </div>
                </div>

                {/* GOAL 2: KEY INFO SUMMARY (Ikon dan ringkasan kunci di atas) */}
                <div className="pt-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                    Ringkasan Informasi Kunci
                  </h2>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Cahaya */}
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                      <div className="flex items-center gap-2 text-stone-600">
                        <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="text-xs font-medium">Kebutuhan Cahaya</span>
                      </div>
                      <div className="text-xs font-semibold text-stone-900 mt-1">
                        {plant.light}
                      </div>
                    </div>

                    {/* Siram */}
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                      <div className="flex items-center gap-2 text-stone-600">
                        <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="text-xs font-medium">Jadwal Siram</span>
                      </div>
                      <div className="text-xs font-semibold text-stone-900 mt-1">
                        {plant.watering}
                      </div>
                    </div>

                    {/* Ukuran */}
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                      <div className="flex items-center gap-2 text-stone-600">
                        <Ruler className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-medium">Ukuran & Tinggi</span>
                      </div>
                      <div className="text-xs font-semibold text-stone-900 mt-1">
                        {plant.dimensions}
                      </div>
                    </div>

                    {/* Keamanan Hewan */}
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                      <div className="flex items-center gap-2 text-stone-600">
                        <PawPrint className="w-4 h-4 text-purple-600 shrink-0" />
                        <span className="text-xs font-medium">Keamanan Hewan</span>
                      </div>
                      <div className="text-xs font-semibold text-stone-900 mt-1">
                        {plant.petFriendly ? '100% Aman untuk Anabul' : 'Perlu Diawasi (Beracun)'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SLEEK STATUS BARS: MOISTURE & LIGHT LEVELS */}
                <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/90 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span>Indikator Kondisi Hidup Ideal</span>
                    <span className="text-[11px] font-normal text-stone-500">Skala 1 - 5</span>
                  </div>

                  {/* 1. Sleek Status Bar for Light Level */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-medium text-stone-700">
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        Tingkat Cahaya:
                      </span>
                      <span className="font-semibold text-stone-900">
                        {plant.lightLevel === 1 && 'Minim (Low)'}
                        {plant.lightLevel === 2 && 'Sedang Teduh (Low-Medium)'}
                        {plant.lightLevel === 3 && 'Sedang Terang (Medium Indirect)'}
                        {plant.lightLevel === 4 && 'Terang Tersaring (Bright Indirect)'}
                        {plant.lightLevel === 5 && 'Sinar Langsung (Full Sun)'}
                      </span>
                    </div>

                    {/* Segmented Status Bar */}
                    <div className="grid grid-cols-5 gap-1.5 h-2">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`rounded-full transition-all duration-300 ${
                            lvl <= plant.lightLevel
                              ? 'bg-amber-500 shadow-2xs'
                              : 'bg-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      {plant.lightDesc}
                    </p>
                  </div>

                  {/* 2. Sleek Status Bar for Moisture Level */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-200/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-medium text-stone-700">
                        <Droplets className="w-3.5 h-3.5 text-blue-500" />
                        Tingkat Kelembapan Tanah:
                      </span>
                      <span className="font-semibold text-stone-900">
                        {plant.moistureLevel === 1 && 'Kering (Dry)'}
                        {plant.moistureLevel === 2 && 'Semi Kering (Semi-Dry)'}
                        {plant.moistureLevel === 3 && 'Moderat Seimbang (Balanced)'}
                        {plant.moistureLevel === 4 && 'Lembap Lembap (Moist)'}
                        {plant.moistureLevel === 5 && 'Basah Konstan (Wet/Humid)'}
                      </span>
                    </div>

                    {/* Segmented Status Bar */}
                    <div className="grid grid-cols-5 gap-1.5 h-2">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`rounded-full transition-all duration-300 ${
                            lvl <= plant.moistureLevel
                              ? 'bg-blue-500 shadow-2xs'
                              : 'bg-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      {plant.moistureDesc}
                    </p>
                  </div>
                </div>

                {/* Pot Selection */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Pilihan Pot & Wadah
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Nursery Plastik', add: '+ Rp 0' },
                      { name: 'Keramik Terakota', add: '+ Rp 35k' },
                      { name: 'Keramik Ivory Matte', add: '+ Rp 45k' },
                    ].map((pot) => (
                      <button
                        key={pot.name}
                        type="button"
                        onClick={() => setSelectedPot(pot.name as any)}
                        className={`p-2.5 text-left rounded-lg border text-xs transition-all ${
                          selectedPot === pot.name
                            ? 'border-emerald-700 bg-emerald-50/60 font-semibold text-emerald-950 ring-1 ring-emerald-700'
                            : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                        }`}
                      >
                        <div className="truncate">{pot.name}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{pot.add}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex items-center justify-between border border-stone-200 rounded-lg px-3 py-2 bg-stone-50 sm:w-32">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-stone-600 hover:text-stone-900 font-bold px-2 py-0.5"
                    >
                      -
                    </button>
                    <span className="font-semibold text-sm text-stone-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(plant.stock, quantity + 1))}
                      className="text-stone-600 hover:text-stone-900 font-bold px-2 py-0.5"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(plant, selectedPot, quantity);
                      onClose();
                    }}
                    className="flex-1 px-5 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Tambah ke Keranjang (Rp {totalPrice.toLocaleString('id-ID')})</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Tanaman Bergaransi
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                    Bebas Hama & Sehat
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* GOAL 2: COLLAPSIBLE DETAIL (Informasi Tambahan & Detail Teknis Tersembunyi) */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setIsTechnicalExpanded(!isTechnicalExpanded)}
              className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/80 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-emerald-800" />
                <div>
                  <span className="text-sm font-semibold text-stone-900 font-serif">
                    Informasi Tambahan & Panduan Teknis Botani
                  </span>
                  <p className="text-xs text-stone-500">
                    Nama ilmiah, taksonomi, media tanam, nutrisi, dan propagasi
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800">
                <span>{isTechnicalExpanded ? 'Tutup Detail' : 'Buka Detail Teknis'}</span>
                {isTechnicalExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </button>

            {/* Collapsible Content */}
            {isTechnicalExpanded && (
              <div className="mt-4 p-5 rounded-xl border border-stone-200 bg-white grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-stone-700 animate-fade-in">
                {/* Taxonomy & Botanical Name */}
                <div className="space-y-1.5 pb-3 border-b md:border-b-0 md:border-r border-stone-100 md:pr-4">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-emerald-700" />
                    Nama Ilmiah & Asal Habitat
                  </div>
                  <p className="italic font-serif text-stone-800">{plant.scientificName}</p>
                  <p className="text-stone-500">Familia: {plant.family}</p>
                  <p className="text-stone-500">Asal: {plant.origin}</p>
                </div>

                {/* Soil Mix Recipe */}
                <div className="space-y-1.5 pb-3 border-b md:border-b-0 border-stone-100">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-700" />
                    Rekomendasi Racikan Media Tanam (Soil Mix)
                  </div>
                  <p className="leading-relaxed text-stone-600">{plant.soilMix}</p>
                </div>

                {/* Fertilizer Schedule */}
                <div className="space-y-1.5 pb-3 border-b md:border-b-0 md:border-r border-stone-100 md:pr-4">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    Jadwal Pemupukan & Nutrisi
                  </div>
                  <p className="leading-relaxed text-stone-600">{plant.fertilizerSchedule}</p>
                </div>

                {/* Temperature & AC Room */}
                <div className="space-y-1.5 pb-3 border-b md:border-b-0 border-stone-100">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-rose-700" />
                    Suhu & Toleransi Ruangan AC
                  </div>
                  <p className="leading-relaxed text-stone-600">{plant.temperature}</p>
                </div>

                {/* Pest & Maintenance */}
                <div className="space-y-1.5 md:border-r border-stone-100 md:pr-4">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Bug className="w-4 h-4 text-amber-800" />
                    Penanganan Hama Umum
                  </div>
                  <p className="leading-relaxed text-stone-600">{plant.commonPests}</p>
                </div>

                {/* Propagation */}
                <div className="space-y-1.5">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-emerald-700" />
                    Cara Perbanyakan (Propagasi)
                  </div>
                  <p className="leading-relaxed text-stone-600">{plant.propagation}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
