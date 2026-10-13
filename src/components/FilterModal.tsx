import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, SlidersHorizontal } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  gender: 'girls' | 'guys' | 'all';
  maxAge: number;
  maxDistance: number;
  minMatch: number;
}

export const FilterModal = ({
  isOpen,
  onClose,
  onApply
}: FilterModalProps) => {
  const [filters, setFilters] = useState<FilterState>({
    gender: 'girls',
    maxAge: 28,
    maxDistance: 15,
    minMatch: 85
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="w-full max-w-[420px] bg-[#120F1D] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl p-6 text-white space-y-5 shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#FF4B72]" />
              <h3 className="font-bold text-lg">Фильтры поиска</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gender selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70">Кого ищем?</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'girls', label: 'Девушек' },
                { id: 'guys', label: 'Парней' },
                { id: 'all', label: 'Всех' }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setFilters({ ...filters, gender: g.id as any })}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    filters.gender === g.id
                      ? 'bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] border-transparent text-white shadow-[0_0_12px_rgba(255,75,114,0.4)]'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 font-semibold">Возраст до:</span>
              <span className="font-bold text-[#FF4B72]">{filters.maxAge} лет</span>
            </div>
            <input
              type="range"
              min="18"
              max="40"
              value={filters.maxAge}
              onChange={(e) => setFilters({ ...filters, maxAge: Number(e.target.value) })}
              className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#FF4B72]"
            />
          </div>

          {/* Distance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 font-semibold">Радиус поиска:</span>
              <span className="font-bold text-[#8B5CF6]">{filters.maxDistance} км</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.maxDistance}
              onChange={(e) => setFilters({ ...filters, maxDistance: Number(e.target.value) })}
              className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
            />
          </div>

          {/* Min Match % */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 font-semibold">Мин. психологическая совместимость:</span>
              <span className="font-bold text-emerald-400">{filters.minMatch}%</span>
            </div>
            <input
              type="range"
              min="75"
              max="95"
              step="1"
              value={filters.minMatch}
              onChange={(e) => setFilters({ ...filters, minMatch: Number(e.target.value) })}
              className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Apply Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onApply(filters);
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,75,114,0.4)] hover:shadow-[0_0_30px_rgba(255,75,114,0.6)] transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Check className="w-4 h-4" />
              Применить настройки
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
