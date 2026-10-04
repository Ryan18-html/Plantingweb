import React, { useState } from 'react';
import {
  StickyNote,
  Plus,
  Heart,
  Pin,
  Sparkles,
  MessageCircle,
  X,
  Send,
  Filter,
} from 'lucide-react';
import { StickyNoteItem } from '../types';
import { INITIAL_STICKY_NOTES } from '../data/communityNotes';

export const StickyNotesSection: React.FC = () => {
  const [notes, setNotes] = useState<StickyNoteItem[]>(INITIAL_STICKY_NOTES);
  const [selectedTag, setSelectedTag] = useState<string>('Semua');
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);

  // New Note Form State
  const [formAuthor, setFormAuthor] = useState<string>('');
  const [formRole, setFormRole] = useState<'Ahli Tanaman' | 'Pecinta Kebun' | 'Pemula'>('Pecinta Kebun');
  const [formPlantTag, setFormPlantTag] = useState<string>('Monstera Deliciosa');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [formColor, setFormColor] = useState<'emerald' | 'amber' | 'rose' | 'sky' | 'stone'>('amber');

  const tags = ['Semua', 'Monstera Deliciosa', 'Calathea Orbifolia', 'Sirih Gading Emas', 'Lidah Mertua', 'Paku Pedang Boston'];

  const filteredNotes = notes.filter((note) => {
    if (selectedTag === 'Semua') return true;
    return note.plantTag.toLowerCase().includes(selectedTag.toLowerCase());
  });

  const handleLike = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const userLiked = !n.userLiked;
          return {
            ...n,
            likes: userLiked ? n.likes + 1 : n.likes - 1,
            userLiked,
          };
        }
        return n;
      })
    );
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formTitle.trim() || !formContent.trim()) return;

    const newNote: StickyNoteItem = {
      id: `note-${Date.now()}`,
      author: formAuthor.trim(),
      role: formRole,
      plantTag: formPlantTag,
      title: formTitle.trim(),
      content: formContent.trim(),
      color: formColor,
      likes: 1,
      userLiked: true,
      createdAt: 'Baru saja',
    };

    setNotes([newNote, ...notes]);
    // Reset Form
    setFormAuthor('');
    setFormTitle('');
    setFormContent('');
    setIsAddingNote(false);
  };

  const colorStyles = {
    emerald: 'bg-emerald-50/90 border-emerald-300/80 text-emerald-950',
    amber: 'bg-amber-50/90 border-amber-300/80 text-amber-950',
    rose: 'bg-rose-50/90 border-rose-300/80 text-rose-950',
    sky: 'bg-sky-50/90 border-sky-300/80 text-sky-950',
    stone: 'bg-stone-100/90 border-stone-300/80 text-stone-900',
  };

  const pinColors = {
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-600',
    rose: 'bg-rose-600',
    sky: 'bg-sky-600',
    stone: 'bg-stone-600',
  };

  return (
    <section id="sticky-notes" className="py-12 sm:py-16 bg-[#F5F4F0] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <StickyNote className="w-4 h-4 text-emerald-700" />
              <span>Papan Interaktif Komunitas</span>
              <span aria-hidden="true">·</span>
              <span>Tips & Tanya Ahli</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Sticky Notes Kebun
            </h2>
            <p className="text-sm text-stone-600 max-w-xl mt-1 leading-relaxed">
              Wadah interaksi sesama pecinta tanaman dan tukang kebun berpengalaman. Bagikan catatan kecil, solusi daun kuning, rahasia media tanam, atau tanyakan tips perawatan harian.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingNote(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all hover:translate-y-[-1px] whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Tempel Sticky Note Baru</span>
            </button>
          </div>
        </div>

        {/* Filter Tags for Sticky Notes */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          <span className="text-xs font-medium text-stone-500 flex items-center gap-1 shrink-0 pl-1 pr-2">
            <Filter className="w-3.5 h-3.5" />
            Topik:
          </span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedTag === tag
                  ? 'bg-stone-900 text-white font-medium shadow-2xs'
                  : 'bg-white border border-stone-200/90 text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Modal / Panel for Adding New Sticky Note */}
        {isAddingNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-fade-in">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-emerald-800" />
                  <h3 className="font-serif font-bold text-stone-900 text-sm">
                    Tulis Sticky Note Kebun Baru
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateNote} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Nama Kamu
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya S."
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Peran / Status
                    </label>
                    <select
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                    >
                      <option value="Pecinta Kebun">Pecinta Kebun</option>
                      <option value="Pemula">Pemula</option>
                      <option value="Ahli Tanaman">Ahli Tanaman</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Pilihan Tanaman
                    </label>
                    <select
                      value={formPlantTag}
                      onChange={(e) => setFormPlantTag(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                    >
                      <option value="Monstera Deliciosa">Monstera Deliciosa</option>
                      <option value="Calathea Orbifolia">Calathea Orbifolia</option>
                      <option value="Sirih Gading Emas">Sirih Gading Emas</option>
                      <option value="Lidah Mertua">Lidah Mertua</option>
                      <option value="Paku Pedang Boston">Paku Pedang Boston</option>
                      <option value="Tips Umum Kebun">Tips Umum Kebun</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Warna Sticky Note
                    </label>
                    <div className="flex items-center gap-2 pt-1.5">
                      {(['amber', 'emerald', 'rose', 'sky', 'stone'] as const).map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => setFormColor(col)}
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            formColor === col ? 'scale-115 ring-2 ring-stone-900 ring-offset-1' : 'opacity-80'
                          } ${
                            col === 'amber'
                              ? 'bg-amber-300 border-amber-400'
                              : col === 'emerald'
                              ? 'bg-emerald-300 border-emerald-400'
                              : col === 'rose'
                              ? 'bg-rose-300 border-rose-400'
                              : col === 'sky'
                              ? 'bg-sky-300 border-sky-400'
                              : 'bg-stone-300 border-stone-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Judul Catatan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahasia Daun Tetap Hijau Mengilap"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Isi Sticky Note (Pengalaman / Tips)
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ceritakan pengalamanmu, eksperimen media tanam, atau trik perawatan yang berhasil..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Tempel Catatan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sticky Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`relative rounded-xl p-5 border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${
                colorStyles[note.color]
              }`}
            >
              {/* Pushpin Graphic */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <span className={`w-4 h-4 rounded-full shadow-sm ring-2 ring-white ${pinColors[note.color]}`} />
              </div>

              <div>
                {/* Note Top Bar */}
                <div className="flex items-center justify-between text-xs pb-3 border-b border-black/10">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold">{note.plantTag}</span>
                    {note.pinned && (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                        · Dipin
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] opacity-75">{note.createdAt}</span>
                </div>

                {/* Title & Content */}
                <h3 className="font-serif font-bold text-base mt-3 leading-snug">
                  {note.title}
                </h3>
                <p className="text-xs mt-2 leading-relaxed opacity-90 whitespace-pre-line">
                  {note.content}
                </p>
              </div>

              {/* Author & Interactions */}
              <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold block">{note.author}</span>
                  <span className="text-[11px] opacity-75">{note.role}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleLike(note.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    note.userLiked
                      ? 'bg-rose-500/20 text-rose-800 font-semibold'
                      : 'hover:bg-black/5 text-stone-700'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      note.userLiked ? 'fill-rose-600 text-rose-600' : 'text-stone-500'
                    }`}
                  />
                  <span className="tabular-nums">{note.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
