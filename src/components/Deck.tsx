import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, X, Star, Heart, RefreshCw } from 'lucide-react';
import type { Profile } from '../data/mockProfiles';
import { Card } from './Card';

interface DeckProps {
  profiles: Profile[];
  onMatch: (profile: Profile) => void;
  onOpenDetails: (profile: Profile) => void;
  onOpenFilters: () => void;
}

export const Deck = ({
  profiles,
  onMatch,
  onOpenDetails,
  onOpenFilters
}: DeckProps) => {
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

      if (direction === 'up' || newCount % 2 === 0) {
        setTimeout(() => {
          onMatch(currentProfile);
        }, 300);
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
      {/* Cards Deck Stack Area */}
      <div className="relative w-full flex-1 max-h-[calc(100%-80px)] flex items-center justify-center">
        {deckProfiles.length > 0 ? (
          <div className="relative w-full h-full max-h-[580px]">
            {deckProfiles.slice(0, 2).map((profile, index) => {
              const isTop = index === 0;

              return (
                <motion.div
                  key={profile.id}
                  initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 12 }}
                  animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 12 }}
                  transition={{ duration: 0.15 }}
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[340px] p-6 rounded-3xl bg-[#14121E] border border-white/10 text-center space-y-4 relative z-10"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <RefreshCw className="w-7 h-7 text-white/60" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">
                Анкеты закончились
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Вы посмотрели все анкеты в текущем радиусе. Загрузите колоду заново или настройте фильтры.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-[#FF4B72] hover:bg-[#ff3b65] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 active:scale-98"
              >
                <RefreshCw className="w-4 h-4" />
                Загрузить анкеты заново
              </button>

              <button
                type="button"
                onClick={onOpenFilters}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-medium border border-white/10 transition-colors"
              >
                Настроить фильтры
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons Toolbar (Crisp, No Glowing Halos) */}
      {deckProfiles.length > 0 && (
        <div className="relative z-20 flex items-center justify-center gap-4 py-2">
          {/* Rewind */}
          <button
            type="button"
            onClick={handleRewind}
            disabled={swipedHistory.length === 0}
            className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all active:scale-95 ${
              swipedHistory.length > 0
                ? 'bg-[#14121E] text-amber-400 border-amber-400/30 hover:border-amber-400'
                : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed'
            }`}
            title="Вернуть анкету"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Pass */}
          <button
            type="button"
            onClick={() => handleSwipe('left')}
            className="w-13 h-13 rounded-full flex items-center justify-center bg-[#14121E] text-rose-500 border border-rose-500/30 hover:border-rose-500 active:scale-95 transition-colors"
            title="Пропустить"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Superlike */}
          <button
            type="button"
            onClick={() => handleSwipe('up')}
            className="w-13 h-13 rounded-full flex items-center justify-center bg-[#14121E] text-[#8B5CF6] border border-[#8B5CF6]/30 hover:border-[#8B5CF6] active:scale-95 transition-colors"
            title="Суперлайк"
          >
            <Star className="w-5 h-5 fill-[#8B5CF6] text-[#8B5CF6]" />
          </button>

          {/* Like */}
          <button
            type="button"
            onClick={() => handleSwipe('right')}
            className="w-13 h-13 rounded-full flex items-center justify-center bg-[#FF4B72] text-white border border-[#FF4B72] active:scale-95 hover:bg-[#ff3b65] transition-colors"
            title="Лайк"
          >
            <Heart className="w-6 h-6 fill-white stroke-none" />
          </button>
        </div>
      )}
    </div>
  );
};
