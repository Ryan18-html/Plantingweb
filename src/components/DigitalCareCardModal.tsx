import React, { useState } from 'react';
import {
  X,
  Droplets,
  Sun,
  Calendar,
  Bell,
  CheckCircle2,
  Sparkles,
  MapPin,
  Download,
  Share2,
  AlertCircle,
  Wind,
  Check,
} from 'lucide-react';
import { Plant, CareProfile } from '../types';

interface DigitalCareCardModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  userProfile?: Partial<CareProfile>;
}

export const DigitalCareCardModal: React.FC<DigitalCareCardModalProps> = ({
  plant,
  isOpen,
  onClose,
}) => {
  const [profile, setProfile] = useState<CareProfile>({
    userName: 'Plant Parent LittleSeed',
    city: 'Jakarta Selatan (Tropis Lembap)',
    roomType: 'Ruang Tamu Ber-AC',
    lightExposure: 'Jendela Timur (Cahaya Pagi Lembut)',
    notificationEnabled: true,
  });

  const [wateredToday, setWateredToday] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  if (!isOpen || !plant) return null;

  // Personalized dynamic calculations based on room condition
  const isAcRoom = profile.roomType.includes('AC');
  const recommendedWaterInterval = isAcRoom
    ? plant.watering === '1-2 minggu sekali' ? 12 : 6
    : plant.watering === '1-2 minggu sekali' ? 10 : 5;

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveCard = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF9F6] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200/90 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-stone-900 font-serif">
                Automated Digital Care Card
              </h2>
              <p className="text-xs text-stone-500">
                Panduan perawatan adaptif tersinkronisasi kondisi hunian Anda
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Plant & User Identity Banner */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
            />

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Paspor Tanaman Aktif
                </span>
                <span className="text-xs text-stone-500">
                  ID: LS-{plant.id.slice(0, 6).toUpperCase()}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                {plant.name}
              </h3>
              <p className="text-xs text-stone-500 italic">
                {plant.scientificName} · {plant.family}
              </p>

              {/* Location & Room personalization */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-stone-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  {profile.city}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-blue-700" />
                  {profile.roomType}
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Smart Schedule (Automated Watering & Fertilizing) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Watering Card */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                      Jadwal Siram Pintar
                    </h4>
                    <p className="text-xs text-blue-700">Setiap {recommendedWaterInterval} hari sekali</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200">
                  Pagi 07:00
                </span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Jadwal Berikutnya:</span>
                  <span className="text-sm font-bold text-stone-900">
                    {wateredToday ? 'Rabu, 14 Oktober 2026' : 'Kamis, 8 Oktober 2026'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setWateredToday(!wateredToday)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                    wateredToday
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-900'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  {wateredToday ? 'Sudah Disiram ✓' : 'Tandai Disiram'}
                </button>
              </div>

              <p className="text-[11px] text-blue-950 leading-relaxed">
                {isAcRoom
                  ? 'Catatan AC: Hembusan AC mendinginkan tanah lebih lambat namun mengeringkan daun. Cek kelembapan media sebelum menyiram.'
                  : 'Siram menyeluruh hingga air sedikit merembes keluar dari dasar pot.'}
              </p>
            </div>

            {/* Fertilizing Card */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Jadwal Pemupukan
                    </h4>
                    <p className="text-xs text-amber-700">1x setiap bulan</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200">
                  Dosis 1/2
                </span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Jadwal Nutrisi:</span>
                  <span className="text-sm font-bold text-stone-900">
                    Sabtu, 24 Oktober 2026
                  </span>
                </div>
                <span className="text-xs text-stone-500">NPK Seimbang</span>
              </div>

              <p className="text-[11px] text-amber-950 leading-relaxed">
                Berikan pupuk cair organik atau NPK seimbang encer setelah penyiraman pagi saat kondisi tanah lembap.
              </p>
            </div>

          </div>

          {/* SLEEK STATUS BARS IN CARE CARD (Light & Moisture) */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-700" />
              Monitoring Ambang Batas Ideal
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Moisture Bar */}
              <div className="p-3 bg-stone-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    Target Kelembapan
                  </span>
                  <span className="text-[11px] font-medium text-blue-700">
                    {plant.moistureLevel}/5 Optimal
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 h-2">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div
                      key={lvl}
                      className={`rounded-full ${
                        lvl <= plant.moistureLevel ? 'bg-blue-500' : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-stone-500">{plant.moistureDesc}</p>
              </div>

              {/* Light Bar */}
              <div className="p-3 bg-stone-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    Kebutuhan Sinar
                  </span>
                  <span className="text-[11px] font-medium text-amber-700">
                    {plant.lightLevel}/5 Terpenuhi
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 h-2">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div
                      key={lvl}
                      className={`rounded-full ${
                        lvl <= plant.lightLevel ? 'bg-amber-500' : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-stone-500">{plant.lightDesc}</p>
              </div>
            </div>
          </div>

          {/* Interactive Daily Care Checklist */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Checklist Perawatan Rutin Minggu Ini
            </h4>

            <div className="space-y-2">
              {[
                {
                  id: 'step1',
                  label: 'Tusuk jari 3-4 cm ke tanah untuk cek kelembapan dasar media',
                },
                {
                  id: 'step2',
                  label: 'Lap debu halus pada permukaan daun dengan kain basah suam kuku',
                },
                {
                  id: 'step3',
                  label: 'Putar pot 90 derajat searah jarum jam agar arah tumbuh daun simetris',
                },
                {
                  id: 'step4',
                  label: 'Periksa bagian bawah daun untuk memastikan bebas kutu putih / hama',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-colors ${
                    checklist[item.id]
                      ? 'bg-emerald-50/50 border-emerald-300 text-stone-900 line-through opacity-80'
                      : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <span className="flex-1 pr-2">{item.label}</span>
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      checklist[item.id] ? 'text-emerald-700' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Notification Toggle */}
          <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-emerald-800 shadow-2xs">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-900">
                  Pengingat Otomatis LittleSeed (Push / Kalender)
                </p>
                <p className="text-[11px] text-stone-500">
                  Kirim notifikasi tepat waktu saat tanah siap disiram
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setProfile((p) => ({ ...p, notificationEnabled: !p.notificationEnabled }))
              }
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                profile.notificationEnabled
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-300 text-stone-700'
              }`}
            >
              {profile.notificationEnabled ? 'Aktif ✓' : 'Nonaktif'}
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 text-center sm:text-left">
            <span>Disesuaikan otomatis untuk </span>
            <span className="font-semibold text-stone-800">{profile.city}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSaveCard}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{saveSuccess ? 'Tersimpan!' : 'Unduh Kartu Care'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors"
            >
              Tutup Panduan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
