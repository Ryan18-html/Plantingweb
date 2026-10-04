import React from 'react';
import { Sun, Droplets, PawPrint, Eye, Plus } from 'lucide-react';
import { Plant } from '../types';

interface PlantCardProps {
  plant: Plant;
  onSelect: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  onSelect,
  onAddToCart,
}) => {
  return (
    <article className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Visual Top with aspect ratio 4:3 */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={plant.image}
          alt={`Tanaman hias ${plant.name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />

        {/* Quiet top indicators */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
          {plant.petFriendly ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-2xs">
              <PawPrint className="w-3 h-3 text-emerald-700" />
              Pet-Friendly
            </span>
          ) : (
            <span />
          )}

          {plant.originalPrice && (
            <span className="text-[11px] font-medium text-rose-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-2xs">
              Hemat {Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Hover Quick Overlay on Desktop */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            type="button"
            onClick={() => onSelect(plant)}
            className="px-3 py-1.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-50 rounded-lg shadow-md transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            Detail & Status
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata unboxed text */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
            <span>{plant.category}</span>
            <span aria-hidden="true">·</span>
            <span>Ukuran {plant.size}</span>
            <span aria-hidden="true">·</span>
            <span>{plant.difficulty}</span>
          </div>

          <h3 className="font-serif font-bold text-base text-stone-900 mt-1 line-clamp-1 group-hover:text-emerald-900 transition-colors">
            {plant.name}
          </h3>

          <p className="text-xs text-stone-500 italic mt-0.5 line-clamp-1">
            {plant.scientificName}
          </p>

          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
            {plant.tagline}
          </p>
        </div>

        {/* Sleek Quick Status Indicators (Light & Moisture levels preview) */}
        <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-stone-600">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              Cahaya
            </span>
            <span className="text-[11px] font-medium text-stone-800">{plant.light}</span>
          </div>
          
          <div className="flex items-center justify-between text-stone-600">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              Siram
            </span>
            <span className="text-[11px] font-medium text-stone-800">{plant.watering}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="text-base font-bold text-stone-900 tabular-nums">
              Rp {plant.price.toLocaleString('id-ID')}
            </div>
            {plant.originalPrice && (
              <div className="text-xs text-stone-400 line-through tabular-nums">
                Rp {plant.originalPrice.toLocaleString('id-ID')}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelect(plant)}
              aria-label={`Buka detail ${plant.name}`}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onAddToCart(plant)}
              aria-label={`Tambah ${plant.name} ke keranjang`}
              className="px-3 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1 shadow-2xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Beli</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
