import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Check,
  X,
} from 'lucide-react';
import { Plant, FilterState } from '../types';
import { PlantCard } from './PlantCard';

interface CatalogSectionProps {
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
  onOpenFinder: () => void;
  activeRecommendationIds: string[];
  onClearRecommendations: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  plants,
  onSelectPlant,
  onAddToCart,
  onOpenFinder,
  activeRecommendationIds,
  onClearRecommendations,
}) => {
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    quickTag: 'all',
    sizes: [],
    lights: [],
    difficulties: [],
    petFriendlyOnly: false,
    airPurifyingOnly: false,
    sortBy: activeRecommendationIds.length > 0 ? 'recommended' : 'popular',
  });

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Quick Filter Tags (Goal 1 & 3)
  const quickTags = [
    { id: 'all', label: 'Semua Koleksi' },
    { id: 'easy', label: 'Ramah Pemula' },
    { id: 'pet-friendly', label: 'Aman untuk Hewan' },
    { id: 'low-light', label: 'Minim Cahaya' },
    { id: 'air-purifier', label: 'Pembersih Udara' },
    { id: 'desk', label: 'Ukuran Meja (Kecil)' },
    { id: 'statement', label: 'Statement (Besar)' },
  ];

  // Multi-select helper
  const toggleArrayItem = <T,>(list: T[], item: T): T[] => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  const resetFilters = () => {
    setFilter({
      search: '',
      quickTag: 'all',
      sizes: [],
      lights: [],
      difficulties: [],
      petFriendlyOnly: false,
      airPurifyingOnly: false,
      sortBy: 'popular',
    });
    if (activeRecommendationIds.length > 0) {
      onClearRecommendations();
    }
  };

  const activeFilterCount =
    (filter.quickTag !== 'all' ? 1 : 0) +
    filter.sizes.length +
    filter.lights.length +
    filter.difficulties.length +
    (filter.petFriendlyOnly ? 1 : 0) +
    (filter.airPurifyingOnly ? 1 : 0) +
    (filter.search ? 1 : 0);

  // Filtering Logic
  const filteredPlants = plants
    .filter((plant) => {
      // If recommendation filter is active and sortBy is recommended
      if (activeRecommendationIds.length > 0 && filter.sortBy === 'recommended') {
        if (!activeRecommendationIds.includes(plant.id)) return false;
      }

      // Search
      if (filter.search.trim()) {
        const query = filter.search.toLowerCase();
        const matchName = plant.name.toLowerCase().includes(query);
        const matchScientific = plant.scientificName.toLowerCase().includes(query);
        const matchDesc = plant.description.toLowerCase().includes(query);
        if (!matchName && !matchScientific && !matchDesc) return false;
      }

      // Quick Tag logic
      if (filter.quickTag === 'easy' && plant.difficulty !== 'Pemula') return false;
      if (filter.quickTag === 'pet-friendly' && !plant.petFriendly) return false;
      if (filter.quickTag === 'low-light' && plant.light !== 'Minim cahaya') return false;
      if (filter.quickTag === 'air-purifier' && !plant.airPurifying) return false;
      if (filter.quickTag === 'desk' && plant.size !== 'Kecil') return false;
      if (filter.quickTag === 'statement' && plant.size !== 'Besar') return false;

      // Multi-select Size
      if (filter.sizes.length > 0 && !filter.sizes.includes(plant.size)) {
        return false;
      }

      // Multi-select Light
      if (filter.lights.length > 0 && !filter.lights.includes(plant.light)) {
        return false;
      }

      // Multi-select Difficulty
      if (filter.difficulties.length > 0 && !filter.difficulties.includes(plant.difficulty)) {
        return false;
      }

      // Pet-friendly toggle
      if (filter.petFriendlyOnly && !plant.petFriendly) {
        return false;
      }

      // Air Purifying toggle
      if (filter.airPurifyingOnly && !plant.airPurifying) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filter.sortBy === 'recommended' && activeRecommendationIds.length > 0) {
        const idxA = activeRecommendationIds.indexOf(a.id);
        const idxB = activeRecommendationIds.indexOf(b.id);
        return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
      }
      if (filter.sortBy === 'popular') {
        return b.popularityScore - a.popularityScore;
      }
      if (filter.sortBy === 'easy') {
        const diffWeight = { Pemula: 1, Menengah: 2, Ahli: 3 };
        return diffWeight[a.difficulty] - diffWeight[b.difficulty];
      }
      if (filter.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filter.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <section id="katalog" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Kurasi Pilihan Berkualitas
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Katalog Tanaman Hias
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Menampilkan <span className="font-semibold text-stone-800">{filteredPlants.length}</span> spesies terseleksi untuk dekorasi hunian
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama tanaman..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className="w-full text-xs pl-9 pr-8 py-2.5 rounded-lg border border-stone-200 bg-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
          {filter.search && (
            <button
              onClick={() => setFilter({ ...filter, search: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Recommendations Active Banner (if user came from Plant Finder) */}
      {activeRecommendationIds.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-emerald-950">
                Menampilkan Rekomendasi Hasil Kuis Plant Finder
              </p>
              <p className="text-[11px] text-emerald-800">
                Tanaman disortir sesuai preferensi cahaya, ruang, dan keamanan hewan di rumah Anda.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFinder}
              className="text-xs font-semibold text-emerald-900 underline underline-offset-2 hover:text-emerald-950"
            >
              Ubah Kuis
            </button>
            <button
              onClick={onClearRecommendations}
              className="text-xs text-stone-600 hover:text-stone-900 bg-white px-2.5 py-1 rounded border border-emerald-200 shadow-2xs"
            >
              Tampilkan Semua
            </button>
          </div>
        </div>
      )}

      {/* GOAL 1 & 3: QUICK FILTER TAGS (Tag satu klik di atas katalog) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar mb-4">
        {quickTags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => setFilter({ ...filter, quickTag: tag.id })}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filter.quickTag === tag.id
                ? 'bg-stone-900 text-white font-medium shadow-2xs'
                : 'bg-white border border-stone-200/90 text-stone-600 hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Filter Bar Controls & Sort Options */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-stone-200/80 mb-6 text-xs">
        {/* Left: Multi-select filter trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className={`px-3.5 py-2 rounded-lg border font-medium flex items-center gap-2 transition-colors ${
              isFilterDrawerOpen || activeFilterCount > 0
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter Kriteria Lanjutan</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[10px] flex items-center justify-center tabular-nums">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-stone-500 hover:text-stone-800 flex items-center gap-1 px-2 py-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Sort Options (Goal 3) */}
        <div className="flex items-center gap-2">
          <span className="text-stone-500 hidden sm:inline flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Urutkan:
          </span>
          <select
            value={filter.sortBy}
            onChange={(e) => setFilter({ ...filter, sortBy: e.target.value as any })}
            className="bg-white border border-stone-200 text-stone-800 py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium cursor-pointer"
          >
            {activeRecommendationIds.length > 0 && (
              <option value="recommended">Paling cocok untukmu (Kuis)</option>
            )}
            <option value="popular">Terpopuler</option>
            <option value="easy">Termudah dirawat</option>
            <option value="price-asc">Harga terendah</option>
            <option value="price-desc">Harga tertinggi</option>
          </select>
        </div>
      </div>

      {/* GOAL 3: MULTI SELECT FILTER PANEL (Bisa pilih lebih dari satu kriteria) */}
      {isFilterDrawerOpen && (
        <div className="p-5 rounded-xl border border-stone-200 bg-white mb-8 space-y-5 animate-fade-in shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="font-semibold text-xs text-stone-900 uppercase tracking-wider">
              Filter Beragam Kriteria (Pilih Sekaligus)
            </span>
            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Tutup Panel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            {/* 1. Ukuran Tanaman (Multi-Select) */}
            <div className="space-y-2">
              <label className="font-semibold text-stone-800 block">
                Ukuran Ruang / Pot:
              </label>
              {(['Kecil', 'Sedang', 'Besar'] as const).map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
                >
                  <input
                    type="checkbox"
                    checked={filter.sizes.includes(s)}
                    onChange={() => setFilter({ ...filter, sizes: toggleArrayItem(filter.sizes, s) })}
                    className="rounded border-stone-300 text-emerald-700 focus:ring-emerald-700"
                  />
                  <span>
                    {s} {s === 'Kecil' && '(< 35 cm)'} {s === 'Sedang' && '(40-70 cm)'} {s === 'Besar' && '(> 80 cm)'}
                  </span>
                </label>
              ))}
            </div>

            {/* 2. Cahaya (Multi-Select) */}
            <div className="space-y-2">
              <label className="font-semibold text-stone-800 block">
                Kebutuhan Cahaya:
              </label>
              {(['Minim cahaya', 'Cahaya tidak langsung', 'Cahaya terang'] as const).map((l) => (
                <label
                  key={l}
                  className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
                >
                  <input
                    type="checkbox"
                    checked={filter.lights.includes(l)}
                    onChange={() => setFilter({ ...filter, lights: toggleArrayItem(filter.lights, l) })}
                    className="rounded border-stone-300 text-emerald-700 focus:ring-emerald-700"
                  />
                  <span>{l}</span>
                </label>
              ))}
            </div>

            {/* 3. Tingkat Perawatan / Difficulty (Multi-Select) */}
            <div className="space-y-2">
              <label className="font-semibold text-stone-800 block">
                Tingkat Perawatan:
              </label>
              {(['Pemula', 'Menengah', 'Ahli'] as const).map((d) => (
                <label
                  key={d}
                  className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
                >
                  <input
                    type="checkbox"
                    checked={filter.difficulties.includes(d)}
                    onChange={() =>
                      setFilter({
                        ...filter,
                        difficulties: toggleArrayItem(filter.difficulties, d),
                      })
                    }
                    className="rounded border-stone-300 text-emerald-700 focus:ring-emerald-700"
                  />
                  <span>{d}</span>
                </label>
              ))}
            </div>

            {/* 4. Fitur Khusus */}
            <div className="space-y-2">
              <label className="font-semibold text-stone-800 block">
                Fitur Khusus:
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900">
                <input
                  type="checkbox"
                  checked={filter.petFriendlyOnly}
                  onChange={(e) => setFilter({ ...filter, petFriendlyOnly: e.target.checked })}
                  className="rounded border-stone-300 text-emerald-700 focus:ring-emerald-700"
                />
                <span>Hanya yang Ramah Hewan (Pet-Friendly)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900">
                <input
                  type="checkbox"
                  checked={filter.airPurifyingOnly}
                  onChange={(e) => setFilter({ ...filter, airPurifyingOnly: e.target.checked })}
                  className="rounded border-stone-300 text-emerald-700 focus:ring-emerald-700"
                />
                <span>Pembersih Udara Alami</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onSelect={onSelectPlant}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200">
          <p className="font-serif font-bold text-lg text-stone-800">
            Tidak ada tanaman yang sesuai kriteria filter Anda
          </p>
          <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
            Coba kurangi kombinasi filter multi-select atau klik reset untuk melihat seluruh koleksi tanaman LittleSeed.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Semua Filter
          </button>
        </div>
      )}
    </section>
  );
};
