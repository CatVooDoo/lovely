import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronLeft, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react';
import { type Profile, CURRENT_USER, TARGET_TELEGRAM_USERNAME } from '../data/mockProfiles';

interface MatchOverlayProps {
  matchProfile: Profile | null;
  onClose: () => void;
  onOpenTelegram: (username: string, text?: string) => void;
}

export const MatchOverlay = ({
  matchProfile,
  onClose,
  onOpenTelegram
}: MatchOverlayProps) => {
  if (!matchProfile) return null;

  const [questionIdx, setQuestionIdx] = useState(0);

  const questions = matchProfile.icebreakerQuestions || [
    "Какое твое самое спонтанное путешествие?",
    "Идеальное воскресенье: спортзал или сериалы до обеда?",
    "Если бы мы встретились сегодня, куда бы пошли сначала?"
  ];

  const handlePrevQuestion = () => {
    setQuestionIdx((prev) => (prev > 0 ? prev - 1 : questions.length - 1));
  };

  const handleNextQuestion = () => {
    setQuestionIdx((prev) => (prev < questions.length - 1 ? prev + 1 : 0));
  };

  const selectedQuestion = questions[questionIdx];

  const handleTelegramClick = () => {
    onOpenTelegram(TARGET_TELEGRAM_USERNAME, selectedQuestion);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E0E11]/95 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-[380px] flex flex-col items-center text-center text-white space-y-5"
        >
          {/* Header Title */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#202028] border border-[#2B2B36] text-xs font-medium text-white/90 mb-1">
              <span>{matchProfile.matchPercent}% Совместимость</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Взаимная симпатия
            </h1>
            <p className="text-xs text-white/60">
              Вы и <span className="text-white font-semibold">{matchProfile.name}</span> понравились друг другу
            </p>
          </div>

          {/* Connected Avatar Circles without glow */}
          <div className="relative flex items-center justify-center py-2">
            {/* User Avatar */}
            <div className="relative w-24 h-24 rounded-full z-10 overflow-hidden border border-[#22222B]">
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = 'https://i.pravatar.cc/300?img=68';
                }}
              />
            </div>

            {/* Match Avatar */}
            <div className="relative w-24 h-24 -ml-5 rounded-full z-10 overflow-hidden border border-[#22222B]">
              <img
                src={matchProfile.photos[0]}
                alt={matchProfile.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = `https://i.pravatar.cc/300?u=${matchProfile.id}`;
                }}
              />
            </div>
          </div>

          {/* Icebreaker Questions Carousel */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#FF4B72]" />
                Вопрос для старта диалога:
              </span>
              <span className="text-[11px] font-medium text-white/40">
                {questionIdx + 1} из {questions.length}
              </span>
            </div>

            {/* Icebreaker Card with prev/next controls */}
            <div className="relative flex items-center justify-between p-3.5 rounded-2xl bg-[#16161D] border border-[#22222B] min-h-[84px]">
              <button
                type="button"
                onClick={handlePrevQuestion}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-white/70 transition-colors shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-3 flex-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={questionIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-xs font-normal text-white/90 italic leading-relaxed"
                  >
                    "{selectedQuestion}"
                  </motion.p>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-white/70 transition-colors shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="w-full space-y-2.5 pt-1">
            {/* Open Telegram Chat directly */}
            <button
              type="button"
              onClick={handleTelegramClick}
              className="w-full py-3.5 px-6 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Написать в Telegram @{TARGET_TELEGRAM_USERNAME}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Keep swiping */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs font-medium text-white/50 hover:text-white transition-colors"
            >
              Продолжить свайпы
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
