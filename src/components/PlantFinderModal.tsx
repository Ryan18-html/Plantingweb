import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, RotateCcw, Eye } from 'lucide-react';
import { Plant, QuizAnswers } from '../types';

interface PlantFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onApplyRecommendations: (matchedPlantIds: string[]) => void;
}

export const PlantFinderModal: React.FC<PlantFinderModalProps> = ({
  isOpen,
  onClose,
  plants,
  onSelectPlant,
  onApplyRecommendations,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    light: 'medium',
    space: 'medium',
    pets: 'no',
    experience: 'beginner',
  });
  const [showResults, setShowResults] = useState<boolean>(false);

  if (!isOpen) return null;

  const calculateMatches = () => {
    return plants
      .map((plant) => {
        let score = 50;
        const matchReasons: string[] = [];

        // 1. Light check
        if (answers.light === 'low') {
          if (plant.light === 'Minim cahaya') {
            score += 25;
            matchReasons.push('Sangat adaptif di ruangan minim cahaya');
          } else if (plant.light === 'Cahaya tidak langsung') {
            score += 10;
          }
        } else if (answers.light === 'medium') {
          if (plant.light === 'Cahaya tidak langsung') {
            score += 25;
            matchReasons.push('Optimal di bawah cahaya sedang tersaring');
          } else if (plant.light === 'Minim cahaya') {
            score += 20;
          }
        } else if (answers.light === 'bright') {
          if (plant.light === 'Cahaya terang') {
            score += 25;
            matchReasons.push('Tumbuh maksimal dengan limpahan cahaya');
          } else if (plant.light === 'Cahaya tidak langsung') {
            score += 15;
          }
        }

        // 2. Space check
        if (answers.space === 'small') {
          if (plant.size === 'Kecil') {
            score += 20;
            matchReasons.push('Ukuran kompak pas untuk meja/rak');
          } else if (plant.size === 'Sedang') {
            score += 10;
          }
        } else if (answers.space === 'medium') {
          if (plant.size === 'Sedang') {
            score += 20;
            matchReasons.push('Proporsional untuk sudut lantai atau meja kopi');
          } else {
            score += 15;
          }
        } else if (answers.space === 'large') {
          if (plant.size === 'Besar') {
            score += 25;
            matchReasons.push('Statement plant megah pengisi ruang');
          } else {
            score += 10;
          }
        }

        // 3. Pet friendly check (crucial constraint!)
        if (answers.pets === 'yes') {
          if (plant.petFriendly) {
            score += 30;
            matchReasons.push('100% Aman untuk kucing & anjing');
          } else {
            score -= 35; // penalty if user has pets and plant is toxic
          }
        } else {
          score += 10;
        }

        // 4. Experience check
        if (answers.experience === 'beginner') {
          if (plant.difficulty === 'Pemula') {
            score += 20;
            matchReasons.push('Tahan banting & sangat mudah bagi pemula');
          } else if (plant.difficulty === 'Menengah') {
            score += 5;
          }
        } else if (answers.experience === 'intermediate') {
          score += 15;
        } else {
          score += 15;
        }

        const normalizedScore = Math.min(99, Math.max(45, score));
        return {
          plant,
          score: normalizedScore,
          reasons: matchReasons.slice(0, 2),
        };
      })
      .sort((a, b) => b.score - a.score);
  };

  const matchedResults = calculateMatches();
  const topMatches = matchedResults.slice(0, 4);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setShowResults(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-stone-900 font-serif">
                Plant Finder Personal
              </h2>
              <p className="text-xs text-stone-500">
                {showResults ? 'Hasil rekomendasi tanaman untuk hunianmu' : `Pertanyaan ${currentStep} dari 4`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!showResults && (
          <div className="w-full bg-stone-100 h-1">
            <div
              className="bg-emerald-700 h-1 transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!showResults ? (
            <div className="space-y-6">
              {/* Question 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 font-serif">
                      1. Bagaimana kondisi pencahayaan di ruangan tempat tanaman akan ditaruh?
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Pencahayaan adalah faktor terpenting bagi kelangsungan fotosintesis tanaman.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        value: 'low',
                        title: 'Minim Cahaya (Low Light)',
                        desc: 'Jauh dari jendela, koridor dalam, atau ruangan dengan cahaya lampu saja.',
                      },
                      {
                        value: 'medium',
                        title: 'Cahaya Sedang / Tidak Langsung (Indirect Light)',
                        desc: 'Dekat jendela dengan tirai tipis atau ruangan terang tanpa sorotan matahari langsung.',
                      },
                      {
                        value: 'bright',
                        title: 'Cahaya Terang / Sinar Pagi (Bright Direct/Filtered)',
                        desc: 'Balkon terbuka, teras berkanopi, atau jendela besar dengan sinar matahari pagi hangat.',
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAnswers({ ...answers, light: option.value as any })}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          answers.light === option.value
                            ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                            : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-stone-900">{option.title}</span>
                          {answers.light === option.value && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-1">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 font-serif">
                      2. Berapa ukuran ruang yang Anda sediakan?
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Menentukan proporsi pot dan tinggi tanaman agar tidak sesak di ruangan.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        value: 'small',
                        title: 'Meja Kerja, Rak Buku, atau Ambalan Dinding',
                        desc: 'Ukuran kompak (< 40 cm), hemat tempat dan mudah dipindahkan.',
                      },
                      {
                        value: 'medium',
                        title: 'Meja Samping atau Sudut Lantai Sedang',
                        desc: 'Tinggi sedang (40 - 75 cm), memberi aksen hijau yang pas dipandang.',
                      },
                      {
                        value: 'large',
                        title: 'Sudut Ruangan Luas / Statement Plant',
                        desc: 'Tanaman lantai megah (> 85 cm) sebagai focal point ruangan tamu.',
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAnswers({ ...answers, space: option.value as any })}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          answers.space === option.value
                            ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                            : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-stone-900">{option.title}</span>
                          {answers.space === option.value && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-1">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 font-serif">
                      3. Apakah ada hewan peliharaan (kucing atau anjing) di rumah?
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Beberapa tanaman tropis mengandung kalsium oksalat yang bisa mengiritasi mulut hewan jika dikunyah.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        value: 'yes',
                        title: 'Ya, Ada Anabul (Wajib Aman & Non-Toxic)',
                        desc: 'Kami prioritaskan tanaman yang 100% aman tersertifikasi ramah anjing dan kucing (misal: Calathea, Boston Fern).',
                      },
                      {
                        value: 'no',
                        title: 'Tidak Ada Hewan Peliharaan',
                        desc: 'Bebas memilih semua varian tanaman hias tropis tanpa batasan toksisitas.',
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAnswers({ ...answers, pets: option.value as any })}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          answers.pets === option.value
                            ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                            : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-stone-900">{option.title}</span>
                          {answers.pets === option.value && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-1">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 4 */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 font-serif">
                      4. Seberapa berpengalaman Anda dalam merawat tanaman?
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Kami akan mencocokkan toleransi tanaman terhadap jadwal penyiraman Anda.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        value: 'beginner',
                        title: 'Pemula Total (Tangan Sering Lupa Siram)',
                        desc: 'Tanaman tangguh yang tidak gampang layu dan toleran terhadap kesalahan penyiraman pemula.',
                      },
                      {
                        value: 'intermediate',
                        title: 'Sudah Punya Beberapa Tanaman (Cukup Teratur)',
                        desc: 'Bisa merawat tanaman dengan rutinitas mingguan dan sedikit perhatian kelembapan.',
                      },
                      {
                        value: 'expert',
                        title: 'Plant Parent Antusias / Jempol Hijau',
                        desc: 'Siap merawat tanaman dengan kebutuhan media khusus, misting, atau nutrisi aktif.',
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAnswers({ ...answers, experience: option.value as any })}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          answers.experience === option.value
                            ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                            : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-stone-900">{option.title}</span>
                          {answers.experience === option.value && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-1">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Kombinasi Rumah Anda:</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-emerald-950">
                  <span className="bg-white px-2.5 py-1 rounded border border-emerald-200">
                    Cahaya: {answers.light === 'low' ? 'Minim Cahaya' : answers.light === 'medium' ? 'Cahaya Sedang' : 'Cahaya Terang'}
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded border border-emerald-200">
                    Ruang: {answers.space === 'small' ? 'Meja / Rak' : answers.space === 'medium' ? 'Sedang' : 'Luas'}
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded border border-emerald-200">
                    Hewan: {answers.pets === 'yes' ? 'Ada Hewan (Aman)' : 'Bebas'}
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded border border-emerald-200">
                    Level: {answers.experience === 'beginner' ? 'Pemula' : 'Berpengalaman'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-stone-900 font-serif mb-3">
                  Top 4 Tanaman Paling Cocok:
                </h3>
                <div className="space-y-3">
                  {topMatches.map(({ plant, score, reasons }) => (
                    <div
                      key={plant.id}
                      className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-300 hover:shadow-sm bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-stone-900 text-sm">{plant.name}</span>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 tabular-nums">
                              {score}% Cocok
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 italic">{plant.scientificName}</p>
                          <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-stone-600">
                            {reasons.map((r, i) => (
                              <span key={i} className="text-emerald-800">
                                ✓ {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        <span className="font-semibold text-stone-900 text-sm tabular-nums">
                          Rp {plant.price.toLocaleString('id-ID')}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectPlant(plant);
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50/70 flex items-center justify-between">
          {!showResults ? (
            <>
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kembali
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
              >
                {currentStep === 4 ? 'Lihat Rekomendasi' : 'Selanjutnya'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Ulangi Kuis
              </button>

              <button
                type="button"
                onClick={() => {
                  onApplyRecommendations(topMatches.map((m) => m.plant.id));
                  onClose();
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
              >
                Terapkan Filter ke Katalog ({topMatches.length} Tanaman)
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
