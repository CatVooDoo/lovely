import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Lock, Unlock, Star, Heart } from 'lucide-react';
import { MOCK_LIKED_BY_USERS, type WhoLikedMeItem, MOCK_PROFILES, type Profile } from '../data/mockProfiles';

interface LikesViewProps {
  onSelectProfile: (profile: Profile) => void;
  onMatch: (profile: Profile) => void;
}

export const LikesView: React.FC<LikesViewProps> = ({
  onSelectProfile,
  onMatch
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [likedList] = useState<WhoLikedMeItem[]>(MOCK_LIKED_BY_USERS);

  const handleTogglePremium = () => {
    if (!isUnlocked) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#8B5CF6', '#FF4B72', '#ffffff']
      });
    }
    setIsUnlocked(!isUnlocked);
  };

  const handleCardClick = (item: WhoLikedMeItem) => {
    // Find matching profile from MOCK_PROFILES or fallback to first
    const fullProfile = MOCK_PROFILES.find((p) => p.name === item.name) || MOCK_PROFILES[0];
    if (isUnlocked) {
      onSelectProfile(fullProfile);
    } else {
      handleTogglePremium();
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto no-scrollbar text-white space-y-4">
      {/* Top Banner & Demo Stars Switcher */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#1E1736] to-[#2B152A] border border-[#FF4B72]/30 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF4B72]" />
              <h2 className="font-extrabold text-base tracking-tight text-white">
                {likedList.length} человек хотят знакомства
              </h2>
            </div>
            <p className="text-xs text-white/70 mt-0.5">
              Совпадение по ценностям от 88% до 97%
            </p>
          </div>

          <div className="p-2 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center gap-1 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>50 Stars</span>
          </div>
        </div>

        {/* Premium Demo Toggle Button */}
        <button
          type="button"
          onClick={handleTogglePremium}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 ${
            isUnlocked
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
              : 'bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white shadow-[0_0_20px_rgba(255,75,114,0.5)]'
          }`}
        >
          {isUnlocked ? (
            <>
              <Unlock className="w-4 h-4" />
              <span>Премиум режим активен (Демо включено)</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Разблокировать анкеты за 50 Telegram Stars ⭐</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of Liked Users */}
      <div className="grid grid-cols-2 gap-3 pb-8">
        {likedList.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick(item)}
            className="relative h-60 rounded-2xl overflow-hidden bg-[#181329] border border-white/10 shadow-lg cursor-pointer group"
          >
            {/* User Photo with Blur if locked */}
            <img
              src={item.photo}
              alt={item.name}
              className={`w-full h-full object-cover transition-all duration-400 ${
                isUnlocked ? 'filter-none group-hover:scale-105' : 'filter blur-md scale-110 opacity-70'
              }`}
              onError={(e) => {
                e.currentTarget.src = `https://i.pravatar.cc/400?u=${item.id}`;
              }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

            {/* Top Badge: Superlike or Match % */}
            <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 pointer-events-none">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8B5CF6]/80 text-white backdrop-blur-md border border-white/20 shadow-sm">
                {item.matchPercent}% Match
              </span>

              {item.superlike && (
                <span className="p-1 rounded-full bg-amber-400 text-black shadow-[0_0_10px_rgba(251,191,36,0.8)]">
                  <Star className="w-3 h-3 fill-black" />
                </span>
              )}
            </div>

            {/* Locked Center Badge */}
            {!isUnlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-10 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 shadow-lg mb-1.5">
                  <Lock className="w-4 h-4 text-[#FF4B72]" />
                </div>
                <span className="text-[10px] font-bold text-white/90 tracking-wide uppercase">
                  Скрыто
                </span>
                <span className="text-[9px] text-white/60">
                  {item.timeAgo}
                </span>
              </div>
            )}

            {/* Bottom Info */}
            <div className="absolute bottom-2.5 inset-x-2.5 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {isUnlocked ? item.name : 'Симпатия'}, {item.age}
                  </h4>
                  <p className="text-[10px] text-white/60">
                    {item.timeAgo}
                  </p>
                </div>

                {isUnlocked && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const fullProfile = MOCK_PROFILES.find((p) => p.name === item.name) || MOCK_PROFILES[0];
                      onMatch(fullProfile);
                    }}
                    className="w-8 h-8 rounded-full bg-[#FF4B72] text-white flex items-center justify-center shadow-[0_0_12px_rgba(255,75,114,0.7)] active:scale-90"
                    title="Создать пару"
                  >
                    <Heart className="w-4 h-4 fill-white stroke-none" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
