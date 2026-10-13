import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, ChevronLeft, ChevronRight, MessageSquareHeart } from 'lucide-react';
import { type Profile, CURRENT_USER } from '../data/mockProfiles';

interface MatchOverlayProps {
  matchProfile: Profile | null;
  onClose: () => void;
  onSendIcebreaker: (profile: Profile, question: string) => void;
}

export const MatchOverlay: React.FC<MatchOverlayProps> = ({
  matchProfile,
  onClose,
  onSendIcebreaker
}) => {
  if (!matchProfile) return null;

  const [questionIdx, setQuestionIdx] = useState(0);

  // Trigger confetti when overlay opens
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#FF4B72', '#8B5CF6', '#F59E0B', '#EC4899', '#ffffff']
    });
  }, []);

  const questions = matchProfile.icebreakerQuestions || [
    "Какое твое самое спонтанное путешествие? ✈️",
    "Идеальное воскресенье: спортзал или сериалы до обеда? 🍿",
    "Если бы мы встретились сегодня, куда бы пошли сначала? ☕️"
  ];

  const handlePrevQuestion = () => {
    setQuestionIdx((prev) => (prev > 0 ? prev - 1 : questions.length - 1));
  };

  const handleNextQuestion = () => {
    setQuestionIdx((prev) => (prev < questions.length - 1 ? prev + 1 : 0));
  };

  const selectedQuestion = questions[questionIdx];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0812]/95 backdrop-blur-xl overflow-hidden select-none">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#FF4B72]/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#8B5CF6]/25 blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.35, type: 'spring' }}
          className="relative w-full max-w-[390px] flex flex-col items-center text-center text-white space-y-6"
        >
          {/* Header Title */}
          <div className="space-y-1">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF4B72]/20 to-[#8B5CF6]/20 border border-white/20 text-xs font-semibold text-white/90 shadow-[0_0_15px_rgba(255,75,114,0.3)] mb-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF4B72]" />
              <span>{matchProfile.matchPercent}% Совместимость</span>
            </motion.div>

            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#FF4B72] via-[#F472B6] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,75,114,0.6)]">
              It's a Match!
            </h1>
            <p className="text-xs text-white/70">
              Вы и <span className="text-white font-bold">{matchProfile.name}</span> понравились друг другу
            </p>
          </div>

          {/* Connected Glowing Avatar Circles */}
          <div className="relative flex items-center justify-center py-4">
            {/* User Avatar */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#FF4B72] to-[#8B5CF6] shadow-[0_0_30px_rgba(255,75,114,0.7)] z-10"
            >
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = 'https://i.pravatar.cc/300?img=68';
                }}
              />
            </motion.div>

            {/* Glowing Heart Center Intersection */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35, type: 'spring' }}
              className="absolute z-30 w-11 h-11 rounded-full bg-[#FF4B72] border-2 border-white flex items-center justify-center shadow-[0_0_25px_rgba(255,75,114,0.9)] animate-pulse"
            >
              <Heart className="w-6 h-6 fill-white text-white stroke-none" />
            </motion.div>

            {/* Match Avatar */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-28 h-28 -ml-6 rounded-full p-1 bg-gradient-to-tr from-[#8B5CF6] to-[#FF4B72] shadow-[0_0_30px_rgba(139,92,246,0.7)] z-10"
            >
              <img
                src={matchProfile.photos[0]}
                alt={matchProfile.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = `https://i.pravatar.cc/300?u=${matchProfile.id}`;
                }}
              />
            </motion.div>
          </div>

          {/* Twinby-style Icebreaker Questions Carousel */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                <MessageSquareHeart className="w-3.5 h-3.5 text-[#FF4B72]" />
                Ледокол для старта (Twinby):
              </span>
              <span className="text-[11px] font-semibold text-white/40">
                {questionIdx + 1} из {questions.length}
              </span>
            </div>

            {/* Icebreaker Card with prev/next controls */}
            <div className="relative flex items-center justify-between p-4 rounded-2xl bg-[#171326] border border-white/20 shadow-xl min-h-[90px]">
              <button
                type="button"
                onClick={handlePrevQuestion}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80 transition-colors shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-3 flex-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={questionIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-medium text-white/95 italic leading-relaxed"
                  >
                    "{selectedQuestion}"
                  </motion.p>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80 transition-colors shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="w-full space-y-3 pt-2">
            {/* Send Question to Telegram */}
            <button
              type="button"
              onClick={() => onSendIcebreaker(matchProfile, selectedQuestion)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF4B72] via-[#f45d82] to-[#8B5CF6] text-white font-bold text-sm shadow-[0_0_25px_rgba(255,75,114,0.6)] hover:shadow-[0_0_35px_rgba(255,75,114,0.8)] transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Отправить вопрос в Telegram</span>
            </button>

            {/* Keep swiping */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-xs font-semibold text-white/60 hover:text-white transition-colors"
            >
              Продолжить свайпы
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
