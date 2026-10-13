import { SlidersHorizontal } from 'lucide-react';

interface TelegramHeaderProps {
  onRestartOnboarding?: () => void;
  onOpenFilters?: () => void;
  activeTab: string;
}

export const TelegramHeader = ({
  onOpenFilters,
  activeTab
}: TelegramHeaderProps) => {
  return (
    <header className="relative z-30 flex items-center justify-between px-5 py-3.5 bg-[#0D0B14] border-b border-white/5 select-none">
      <div className="flex items-center gap-2">
        <span className="font-extrabold text-xl tracking-tight text-white">
          Lovely
        </span>
      </div>

      {activeTab === 'deck' && onOpenFilters && (
        <button
          type="button"
          onClick={onOpenFilters}
          className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
          title="Фильтры"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      )}
    </header>
  );
};
