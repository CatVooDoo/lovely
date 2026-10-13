import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, X, Star, Heart, Sparkles, RefreshCw } from 'lucide-react';
import type { Profile } from '../data/mockProfiles';
import { Card } from './Card';

interface DeckProps {
  profiles: Profile[];
  onMatch: (profile: Profile) => void;
  onOpenDetails: (profile: Profile) => void;
  onOpenFilters: () => void;
}

export const Deck: React.FC<DeckProps> = ({
  profiles,
  onMatch,
  onOpenDetails,
  onOpenFilters
}) => {
  const [deckProfiles, setDeckProfiles] = useState<Profile[]>(profiles);
  const [swipedHistory, setSwipedHistory] = useState<Profile[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (deckProfiles.length === 0) return;

    const currentProfile = deckProfiles[0];
    const newDeck = deckProfiles.slice(1);

    setDeckProfiles(newDeck);
    setSwipedHistory([currentProfile, ...swipedHistory]);

    if (direction === 'right' || direction === 'up') {
      const newCount = likeCount + 1;
      setLikeCount(newCount);

      // Trigger Match every 2nd or 3rd like OR immediately on Superlike!
      if (direction === 'up' || newCount % 2 === 0) {
        setTimeout(() => {
          onMatch(currentProfile);
        }, 350);
      }
    }
  };

  const handleRewind = () => {
    if (swipedHistory.length === 0) return;
    const lastProfile = swipedHistory[0];
    setSwipedHistory(swipedHistory.slice(1));
    setDeckProfiles([lastProfile, ...deckProfiles]);
  };

  const handleReset = () => {
    setDeckProfiles(profiles);
    setSwipedHistory([]);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between p-3.5 pb-2 overflow-hidden select-none">
      {/* Top Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#8B5CF6]/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Cards Deck Stack Area */}
      <div className="relative w-full flex-1 max-h-[calc(100%-80px)] flex items-center justify-center">
        {deckProfiles.length > 0 ? (
          <div className="relative w-full h-full max-h-[580px]">
            {/* Render top 2 cards for performance & depth */}
            {deckProfiles.slice(0, 2).map((profile, index) => {
              const isTop = index === 0;

              return (
                <motion.div
                  key={profile.id}
                  initial={{ scale: isTop ? 1 : 0.94, y: isTop ? 0 : 16 }}
                  animate={{ scale: isTop ? 1 : 0.94, y: isTop ? 0 : 16 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex: isTop ? 10 : 5 }}
                >
                  <Card
                    profile={profile}
                    isTop={isTop}
                    onSwipe={handleSwipe}
                    onOpenDetails={onOpenDetails}
                  />
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty Deck State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[340px] p-6 rounded-3xl glass border border-white/15 text-center space-y-4 shadow-2xl relative z-10"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#FF4B72]/30 to-[#8B5CF6]/30 flex items-center justify-center border border-white/20 shadow-[0_0_25px_rgba(255,75,114,0.4)]">
              <Sparkles className="w-10 h-10 text-[#FF4B72] animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white">
                Анкеты закончились 💫
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Вы посмотрели все анкеты в текущем радиусе. Загрузите колоду заново или расширьте фильтры поиска.
              </p>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white font-bold text-xs shadow-[0_0_20px_rgba(255,75,114,0.4)] hover:shadow-[0_0_30px_rgba(255,75,114,0.6)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <RefreshCw className="w-4 h-4" />
                Загрузить анкеты заново
              </button>

              <button
                type="button"
                onClick={onOpenFilters}
                className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white/80 text-xs font-semibold border border-white/10 transition-colors"
              >
                Настроить фильтры
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Action Buttons Toolbar */}
      {deckProfiles.length > 0 && (
        <div className="relative z-20 flex items-center justify-center gap-4 py-2">
          {/* Rewind */}
          <button
            type="button"
            onClick={handleRewind}
            disabled={swipedHistory.length === 0}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all active:scale-90 ${
              swipedHistory.length > 0
                ? 'bg-[#181428]/90 text-amber-400 border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.25)] hover:border-amber-400'
                : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed'
            }`}
            title="Вернуть анкету (Rewind)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Pass (NOPE) */}
          <button
            type="button"
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-[#181428]/95 text-rose-500 border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:scale-105 hover:border-rose-500 active:scale-95 transition-all"
            title="Пропустить (Pass)"
          >
            <X className="w-7 h-7 stroke-[2.5]" />
          </button>

          {/* Superlike */}
          <button
            type="button"
            onClick={() => handleSwipe('up')}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#8B5CF6]/20 to-[#6366f1]/30 text-[#8B5CF6] border border-[#8B5CF6]/50 shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:scale-110 active:scale-95 transition-all"
            title="Суперлайк (Superlike)"
          >
            <Star className="w-6 h-6 fill-[#8B5CF6] text-[#8B5CF6]" />
          </button>

          {/* Like (LOVE) */}
          <button
            type="button"
            onClick={() => handleSwipe('right')}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#FF4B72] to-[#ff6b8b] text-white border border-[#FF4B72]/60 shadow-[0_0_25px_rgba(255,75,114,0.6)] hover:scale-105 active:scale-95 transition-all"
            title="Лайк (Like)"
          >
            <Heart className="w-7 h-7 fill-white stroke-none" />
          </button>
        </div>
      )}
    </div>
  );
};
