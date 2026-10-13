import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Star, Heart } from 'lucide-react';
import { MOCK_LIKED_BY_USERS, type WhoLikedMeItem, MOCK_PROFILES, type Profile } from '../data/mockProfiles';

interface LikesViewProps {
  onSelectProfile: (profile: Profile) => void;
  onMatch: (profile: Profile) => void;
}

export const LikesView = ({
  onSelectProfile,
  onMatch
}: LikesViewProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [likedList] = useState<WhoLikedMeItem[]>(MOCK_LIKED_BY_USERS);

  const handleTogglePremium = () => {
    setIsUnlocked(!isUnlocked);
  };

  const handleCardClick = (item: WhoLikedMeItem) => {
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
      <div className="p-4 rounded-2xl bg-[#16161D] border border-[#22222B] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-sm text-white">
              {likedList.length} человек проявили интерес
            </h2>
            <p className="text-xs text-[#8E8E93] mt-0.5">
              Совпадение по психологическому тесту от 88%
            </p>
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-[#202028] border border-[#2B2B36] text-amber-400 flex items-center gap-1.5 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>50 Stars</span>
          </div>
        </div>

        {/* Premium Demo Toggle Button */}
        <button
          type="button"
          onClick={handleTogglePremium}
          className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-colors active:scale-98 ${
            isUnlocked
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
              : 'bg-[#FF5252] hover:bg-[#ff3b3b] text-white'
          }`}
        >
          {isUnlocked ? (
            <>
              <Unlock className="w-4 h-4" />
              <span>Анкеты открыты (Демо режим)</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Разблокировать анкеты за 50 Telegram Stars</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of Liked Users */}
      <div className="grid grid-cols-2 gap-3 pb-8">
        {likedList.map((item) => (
          <motion.div
            key={item.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick(item)}
            className="relative h-60 rounded-2xl overflow-hidden bg-[#16161D] border border-[#22222B] cursor-pointer group"
          >
            {/* User Photo with Blur if locked */}
            <img
              src={item.photo}
              alt={item.name}
              className={`w-full h-full object-cover transition-all duration-300 ${
                isUnlocked ? 'filter-none' : 'filter blur-md scale-105 opacity-60'
              }`}
              onError={(e) => {
                e.currentTarget.src = `https://i.pravatar.cc/400?u=${item.id}`;
              }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

            {/* Top Badge: Superlike or Match % */}
            <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 pointer-events-none">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 text-white border border-white/10">
                {item.matchPercent}% Match
              </span>

              {item.superlike && (
                <span className="p-1 rounded-full bg-amber-400 text-black">
                  <Star className="w-3 h-3 fill-black" />
                </span>
              )}
            </div>

            {/* Locked Center Badge */}
            {!isUnlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-10 pointer-events-none">
                <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/90 mb-1.5">
                  <Lock className="w-4 h-4 text-white/70" />
                </div>
                <span className="text-[10px] font-semibold text-white/80 uppercase">
                  Скрыто
                </span>
                <span className="text-[9px] text-white/50">
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
                  <p className="text-[10px] text-white/50">
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
                    className="w-7 h-7 rounded-full bg-[#FF5252] text-white flex items-center justify-center active:scale-90"
                    title="Создать пару"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white stroke-none" />
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
