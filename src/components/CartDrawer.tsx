import React, { useState } from 'react';
import {
  X,
  Trash2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { CartItem, Plant } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (plantId: string, delta: number) => void;
  onRemoveItem: (plantId: string) => void;
  onCheckoutSuccess: (lastPurchasedPlant: Plant) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckoutSuccess,
}) => {
  const [customerName, setCustomerName] = useState<string>('Rian Pratama');
  const [city, setCity] = useState<string>('Jakarta Selatan');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const potPriceMap = {
    'Nursery Plastik': 0,
    'Keramik Terakota': 35000,
    'Keramik Ivory Matte': 45000,
  };

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.plant.price + potPriceMap[item.selectedPot];
    return sum + unitPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 200000 ? 0 : 25000;
  const grandTotal = subtotal + (items.length > 0 ? deliveryFee : 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      const firstPlant = items[0].plant;

      setTimeout(() => {
        setOrderComplete(false);
        onCheckoutSuccess(firstPlant);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-800" />
              <h2 className="text-sm font-semibold font-serif text-stone-900">
                Keranjang Belanja LittleSeed
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {orderComplete ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Pesanan Berhasil Dibuat!
                </h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Membuka Digital Care Card otomatis dengan jadwal siram yang disesuaikan kondisi rumahmu...
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="font-serif font-bold text-base text-stone-800">
                  Keranjangmu Masih Kosong
                </p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Jelajahi katalog tanaman kami atau ikuti kuis Plant Finder untuk menemukan tanaman ideal.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => {
                    const unitPrice = item.plant.price + potPriceMap[item.selectedPot];
                    return (
                      <div
                        key={`${item.plant.id}-${item.selectedPot}`}
                        className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between gap-3 text-xs"
                      >
                        <img
                          src={item.plant.image}
                          alt={item.plant.name}
                          className="w-14 h-14 rounded-lg object-cover bg-white border border-stone-200 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-stone-900 truncate">
                            {item.plant.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 truncate">
                            {item.selectedPot}
                          </p>
                          <div className="font-bold text-stone-900 mt-1 tabular-nums">
                            Rp {(unitPrice * item.quantity).toLocaleString('id-ID')}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.plant.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center border border-stone-200 bg-white rounded-md">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.plant.id, -1)}
                              className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold"
                            >
                              -
                            </button>
                            <span className="px-1 text-[11px] font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.plant.id, 1)}
                              className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery & Personalization preview */}
                <div className="pt-3 border-t border-stone-100 space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Nama Penerima:
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Kota Pengiriman (Untuk Personalisasi Care Card):
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2 border border-stone-200 rounded-lg text-xs bg-white"
                    >
                      <option value="Jakarta Selatan">Jakarta Selatan (Tropis AC)</option>
                      <option value="Bandung">Bandung (Sejuk Dataran Tinggi)</option>
                      <option value="Surabaya">Surabaya (Tropis Panas)</option>
                      <option value="Yogyakarta">Yogyakarta (Tropis)</option>
                      <option value="Tangerang">Tangerang (Hangat)</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-2.5 text-[11px] text-emerald-950">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      Setiap pesanan otomatis disertakan <strong>Digital Care Card</strong> dan garansi penggantian tanaman sehat 14 hari.
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/90 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal Tanaman:</span>
                  <span className="font-medium text-stone-900 tabular-nums">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-stone-500" />
                    Ongkir Khusus Tanaman:
                  </span>
                  <span className="font-medium text-stone-900 tabular-nums">
                    {deliveryFee === 0 ? 'Gratis (Min Rp 200k)' : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Pembayaran:</span>
                  <span className="tabular-nums">Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCheckout}
                className="w-full py-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Memproses Pesanan...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Pesan & Buka Digital Care Card</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Pengiriman Khusus Tanaman Aman & Bergaransi</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
