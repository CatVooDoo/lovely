import { MoreHorizontal, X, SlidersHorizontal } from 'lucide-react';

interface TelegramHeaderProps {
  onRestartOnboarding: () => void;
  onOpenFilters?: () => void;
  activeTab: string;
}

export const TelegramHeader = ({
  onRestartOnboarding,
  onOpenFilters,
  activeTab
}: TelegramHeaderProps) => {
  return (
    <header className="relative z-30 flex items-center justify-between px-4 py-2.5 backdrop-blur-md bg-[#0D0B14]/80 border-b border-white/10 select-none">
      {/* Left button: Telegram Close Icon */}
      <button 
        type="button"
        onClick={onRestartOnboarding}
        title="Перезапустить онбординг"
        className="flex items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Center: App Title & Online Status */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-base tracking-wide bg-gradient-to-r from-[#FF4B72] via-[#E056FD] to-[#8B5CF6] bg-clip-text text-transparent">
            Lovely
          </span>
          <span className="inline-block px-1.5 py-0.2 text-[9px] font-semibold text-[#FF4B72] bg-[#FF4B72]/15 border border-[#FF4B72]/30 rounded-full">
            TMA
          </span>
        </div>
        <div className="flex items-center gap-1.5 -mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-[10px] font-medium text-white/60">
            {activeTab === 'deck' ? 'Поиск пар онлайн' : activeTab === 'likes' ? 'Ваши симпатии' : activeTab === 'matches' ? 'Диалоги и игры' : 'Мой профиль'}
          </span>
        </div>
      </div>

      {/* Right buttons: Filters or Options */}
      <div className="flex items-center gap-1">
        {activeTab === 'deck' && onOpenFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            className="flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            title="Фильтры поиска"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onRestartOnboarding}
          className="flex items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          title="Справка и онбординг"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
