import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Gamepad2, Users, Check, Share2, ExternalLink } from 'lucide-react';
import { type Profile, COMPATIBILITY_CARDS, TARGET_TELEGRAM_USERNAME } from '../data/mockProfiles';

interface MatchesAndGamesViewProps {
  newMatches: Profile[];
  onOpenProfile: (profile: Profile) => void;
  onOpenTelegram: (username: string, text?: string) => void;
}

export const MatchesAndGamesView = ({
  newMatches,
  onOpenProfile,
  onOpenTelegram
}: MatchesAndGamesViewProps) => {
  const [subTab, setSubTab] = useState<'matches' | 'games'>('matches');

  // Interactive Game State
  const [cardIdx, setCardIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);

  const currentCard = COMPATIBILITY_CARDS[cardIdx] || COMPATIBILITY_CARDS[0];

  const handleSelectOption = (opt: 'A' | 'B') => {
    setSelectedAnswer(opt);
  };

  const handleNextGameCard = () => {
    setSelectedAnswer(null);
    setCardIdx((prev) => (prev < COMPATIBILITY_CARDS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto no-scrollbar text-white space-y-4">
      {/* Subtab Switcher */}
      <div className="flex p-1 rounded-xl bg-[#16161D] border border-[#22222B]">
        <button
          type="button"
          onClick={() => setSubTab('matches')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            subTab === 'matches'
              ? 'bg-white/10 text-white'
              : 'text-white/50 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Мои пары ({newMatches.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('games')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            subTab === 'games'
              ? 'bg-white/10 text-white'
              : 'text-white/50 hover:text-white'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Игры на двоих</span>
        </button>
      </div>

      {/* Content for Matches Tab */}
      {subTab === 'matches' && (
        <div className="space-y-3 pb-6">
          <div className="text-xs text-white/50 px-1">
            Нажмите на пару, чтобы перейти в диалог в Telegram (@{TARGET_TELEGRAM_USERNAME}):
          </div>

          <div className="space-y-2">
            {newMatches.map((match) => (
              <motion.div
                key={match.id}
                whileTap={{ scale: 0.99 }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#16161D] border border-[#22222B] hover:border-[#2F2F3B] transition-colors"
              >
                {/* Avatar */}
                <div 
                  onClick={() => onOpenProfile(match)}
                  className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 cursor-pointer border border-white/10"
                >
                  <img
                    src={match.photos[0]}
                    alt={match.name}
                    className="w-full h-full object-cover"
                  />
                  {match.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#14121E]" />
                  )}
                </div>

                {/* Info */}
                <div 
                  onClick={() => onOpenProfile(match)}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white truncate">
                      {match.name}, {match.age}
                    </h4>
                    <span className="text-[10px] text-white/50">
                      {match.matchPercent}% Match
                    </span>
                  </div>

                  <p className="text-xs text-white/60 truncate mt-0.5">
                    {match.bio}
                  </p>
                </div>

                {/* Direct Telegram Chat Button */}
                <button
                  type="button"
                  onClick={() => onOpenTelegram(TARGET_TELEGRAM_USERNAME, `Привет, ${match.name}! Мы совпали в Lovely.`)}
                  className="px-3 py-1.5 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
                  title="Написать в Telegram"
                >
                  <Send className="w-3 h-3" />
                  <span>Чат</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Content for Compatibility Games Tab */}
      {subTab === 'games' && (
        <div className="space-y-4 pb-6">
          <div className="p-4 rounded-2xl bg-[#16161D] border border-[#22222B] space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/80 border border-white/10">
                {currentCard.category}
              </span>

              <span className="text-xs text-white/40">
                Вопрос {cardIdx + 1} из {COMPATIBILITY_CARDS.length}
              </span>
            </div>

            {/* Question Text */}
            <h4 className="text-sm font-semibold text-white leading-snug">
              {currentCard.question}
            </h4>

            {/* Option A and Option B */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleSelectOption('A')}
                className={`w-full p-3 rounded-xl text-xs font-medium text-left border transition-colors flex items-center justify-between ${
                  selectedAnswer === 'A'
                    ? 'bg-white/15 border-white/30 text-white'
                    : 'bg-white/5 border-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                <span>{currentCard.optionA}</span>
                {selectedAnswer === 'A' && <Check className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => handleSelectOption('B')}
                className={`w-full p-3 rounded-xl text-xs font-medium text-left border transition-colors flex items-center justify-between ${
                  selectedAnswer === 'B'
                    ? 'bg-white/15 border-white/30 text-white'
                    : 'bg-white/5 border-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                <span>{currentCard.optionB}</span>
                {selectedAnswer === 'B' && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>

            {/* Psychological Insight */}
            <AnimatePresence>
              {selectedAnswer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 space-y-1"
                >
                  <span className="font-semibold text-white/90 block">
                    Психологический смысл:
                  </span>
                  <p>{currentCard.insight}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="pt-1 flex gap-2">
              <button
                type="button"
                onClick={handleNextGameCard}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                {cardIdx < COMPATIBILITY_CARDS.length - 1 ? 'Следующий вопрос' : 'Сначала'}
              </button>

              <button
                type="button"
                onClick={() => onOpenTelegram(TARGET_TELEGRAM_USERNAME, `Вопрос для нас из Lovely: "${currentCard.question}"`)}
                className="px-4 py-2.5 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Отправить вопрос в Telegram"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>В Telegram</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
