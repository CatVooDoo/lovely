import { SlidersHorizontal, Settings } from 'lucide-react';

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
    <header className="relative z-30 flex items-center justify-between px-5 pt-3 pb-2.5 bg-[#0E0E11] select-none">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl tracking-tight text-white font-sans">
          Lovely
        </span>
      </div>

      <div className="flex items-center gap-2">
        {activeTab === 'deck' && onOpenFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            className="flex items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            title="Фильтры поиска"
          >
            <SlidersHorizontal className="w-5 h-5" strokeWidth={1.8} />
          </button>
        )}

        {activeTab === 'profile' && (
          <button
            type="button"
            onClick={() => alert('Настройки профиля')}
            className="flex items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            title="Настройки"
          >
            <Settings className="w-5 h-5" strokeWidth={1.8} />
          </button>
        )}
      </div>
    </header>
  );
};
