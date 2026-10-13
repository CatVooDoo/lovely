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
        }, 280);
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
    <div className="relative flex-1 flex flex-col justify-between px-4 pt-1 pb-3 overflow-hidden select-none bg-[#0E0E11]">
      {/* Cards Deck Stack Area */}
      <div className="relative w-full flex-1 max-h-[calc(100%-76px)] flex items-center justify-center">
        {deckProfiles.length > 0 ? (
          <div className="relative w-full h-full max-h-[570px]">
            {deckProfiles.slice(0, 2).map((profile, index) => {
              const isTop = index === 0;

              return (
                <motion.div
                  key={profile.id}
                  initial={{ scale: isTop ? 1 : 0.96, y: isTop ? 0 : 8 }}
                  animate={{ scale: isTop ? 1 : 0.96, y: isTop ? 0 : 8 }}
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[340px] p-6 rounded-2xl bg-[#16161C] border border-[#22222A] text-center space-y-4 relative z-10"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-[#202028] flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-[#8E8E93]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">
                Анкеты закончились
              </h3>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                Вы посмотрели все анкеты в текущем радиусе. Загрузите колоду заново или измените фильтры.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl bg-[#FF5252] hover:bg-[#ff3b3b] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 active:scale-98"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Загрузить заново
              </button>

              <button
                type="button"
                onClick={onOpenFilters}
                className="w-full py-2.5 rounded-xl bg-[#22222A] hover:bg-[#2A2A34] text-[#8E8E93] hover:text-white text-xs font-medium transition-colors"
              >
                Настроить фильтры
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* 4 Flat Action Buttons matching screenshot */}
      {deckProfiles.length > 0 && (
        <div className="relative z-20 flex items-center justify-center gap-3.5 pt-2">
          {/* Rewind: Gray */}
          <button
            type="button"
            onClick={handleRewind}
            disabled={swipedHistory.length === 0}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              swipedHistory.length > 0
                ? 'bg-[#24242C] text-[#8E8E93] hover:text-white'
                : 'bg-[#1C1C22] text-[#48484A] cursor-not-allowed'
            }`}
            title="Вернуть анкету"
          >
            <RotateCcw className="w-5 h-5" strokeWidth={2.2} />
          </button>

          {/* Dislike: Soft Pink/Rose */}
          <button
            type="button"
            onClick={() => handleSwipe('left')}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FF5A79] text-white hover:bg-[#ff4669] active:scale-95 transition-transform"
            title="Пропустить"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Superlike: Soft Blue */}
          <button
            type="button"
            onClick={() => handleSwipe('up')}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-[#3E8BFF] text-white hover:bg-[#2a7eff] active:scale-95 transition-transform"
            title="Суперлайк"
          >
            <Star className="w-5 h-5 fill-white stroke-none" />
          </button>

          {/* Like: Soft Coral-Red */}
          <button
            type="button"
            onClick={() => handleSwipe('right')}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FF5252] text-white hover:bg-[#ff3b3b] active:scale-95 transition-transform"
            title="Лайк"
          >
            <Heart className="w-5 h-5 fill-white stroke-none" />
          </button>
        </div>
      )}
    </div>
  );
};
