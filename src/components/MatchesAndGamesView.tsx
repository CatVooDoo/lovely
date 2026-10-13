import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Gamepad2, Sparkles, ChevronRight, Check, Share2, HelpCircle } from 'lucide-react';
import { type MatchChat, type Profile, COMPATIBILITY_CARDS } from '../data/mockProfiles';

interface MatchesAndGamesViewProps {
  chats: MatchChat[];
  newMatches: Profile[];
  onOpenChat: (chat: MatchChat) => void;
  onOpenProfile: (profile: Profile) => void;
}

export const MatchesAndGamesView: React.FC<MatchesAndGamesViewProps> = ({
  chats,
  newMatches,
  onOpenChat,
  onOpenProfile
}) => {
  const [subTab, setSubTab] = useState<'chats' | 'games'>('chats');

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
      {/* Top Section: New Matches Horizontal Stories Row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">
            Новые пары ({newMatches.length})
          </h3>
          <span className="text-[11px] text-[#FF4B72] font-semibold">
            Всего 12 совпадений
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {newMatches.map((match) => (
            <button
              key={match.id}
              type="button"
              onClick={() => onOpenProfile(match)}
              className="flex flex-col items-center shrink-0 space-y-1.5 focus:outline-none group"
            >
              <div className="relative w-15 h-15 rounded-full p-0.5 bg-gradient-to-tr from-[#FF4B72] to-[#8B5CF6] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,75,114,0.3)]">
                <img
                  src={match.photos[0]}
                  alt={match.name}
                  className="w-full h-full object-cover rounded-full"
                />
                {match.online && (
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0D0B14] shadow-sm" />
                )}
                <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full text-[8px] font-black bg-[#FF4B72] text-white shadow-sm">
                  {match.matchPercent}%
                </span>
              </div>
              <span className="text-[11px] font-semibold text-white/90 max-w-[60px] truncate">
                {match.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Subtab Switcher: Chats vs Compatibility Games */}
      <div className="flex p-1 rounded-2xl bg-white/10 border border-white/10">
        <button
          type="button"
          onClick={() => setSubTab('chats')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            subTab === 'chats'
              ? 'bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white shadow-md'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Диалоги ({chats.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('games')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            subTab === 'games'
              ? 'bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white shadow-md'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Игры Twinby</span>
        </button>
      </div>

      {/* Content for Chats Tab */}
      {subTab === 'chats' && (
        <div className="space-y-2 pb-6">
          {chats.map((chat) => (
            <motion.div
              key={chat.profile.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenChat(chat)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#171326] border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-md"
            >
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#8B5CF6]/40">
                <img
                  src={chat.profile.photos[0]}
                  alt={chat.profile.name}
                  className="w-full h-full object-cover"
                />
                {chat.profile.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#171326]" />
                )}
              </div>

              {/* Chat snippet */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white truncate">
                    {chat.profile.name}
                  </h4>
                  <span className="text-[10px] text-white/40">
                    {chat.lastMessageTime}
                  </span>
                </div>

                <p className="text-xs text-white/70 truncate mt-0.5">
                  {chat.lastMessage}
                </p>
              </div>

              {/* Unread badge or arrow */}
              {chat.unreadCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-[#FF4B72] text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(255,75,114,0.7)] shrink-0">
                  {chat.unreadCount}
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Content for Twinby Compatibility Games Tab */}
      {subTab === 'games' && (
        <div className="space-y-4 pb-6">
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1C1533] to-[#120D22] border border-[#8B5CF6]/30 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FF4B72]/20 text-[#FF4B72] border border-[#FF4B72]/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {currentCard.category}
              </span>

              <span className="text-xs text-white/40 font-semibold">
                Вопрос {cardIdx + 1} из {COMPATIBILITY_CARDS.length}
              </span>
            </div>

            {/* Question Text */}
            <h4 className="text-base font-bold text-white leading-snug">
              {currentCard.question}
            </h4>

            {/* Option A and Option B */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleSelectOption('A')}
                className={`w-full p-3.5 rounded-2xl text-xs font-semibold text-left border transition-all flex items-center justify-between ${
                  selectedAnswer === 'A'
                    ? 'bg-gradient-to-r from-[#FF4B72]/30 to-[#8B5CF6]/30 border-[#FF4B72] text-white shadow-[0_0_15px_rgba(255,75,114,0.4)]'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                <span>{currentCard.optionA}</span>
                {selectedAnswer === 'A' && <Check className="w-4 h-4 text-[#FF4B72]" />}
              </button>

              <button
                type="button"
                onClick={() => handleSelectOption('B')}
                className={`w-full p-3.5 rounded-2xl text-xs font-semibold text-left border transition-all flex items-center justify-between ${
                  selectedAnswer === 'B'
                    ? 'bg-gradient-to-r from-[#8B5CF6]/30 to-cyan-500/30 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                <span>{currentCard.optionB}</span>
                {selectedAnswer === 'B' && <Check className="w-4 h-4 text-[#8B5CF6]" />}
              </button>
            </div>

            {/* Revealed Psychological Insight */}
            <AnimatePresence>
              {selectedAnswer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 space-y-1"
                >
                  <span className="font-bold text-emerald-400 block flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Психологический инсайт:
                  </span>
                  <p>{currentCard.insight}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Question Button */}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={handleNextGameCard}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white font-bold text-xs shadow-md active:scale-98 transition-all"
              >
                {cardIdx < COMPATIBILITY_CARDS.length - 1 ? 'Следующий вопрос' : 'Пройти сначала'}
              </button>

              <button
                type="button"
                onClick={() => alert('Вопрос отправлен в диалог с вашей парой!')}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
                title="Отправить паре"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
