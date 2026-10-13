import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HeartHandshake, ArrowRight, Check, Compass } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  // Interactive state for Step 2
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Путешествия',
    'Кофе & Книги'
  ]);
  const [quizSlider, setQuizSlider] = useState<number>(65); // 0 (вечеринка) to 100 (уют дома)

  const interestOptions = [
    { label: 'Путешествия', emoji: '✈️' },
    { label: 'Кофе & Книги', emoji: '☕️' },
    { label: 'Искусство', emoji: '🎨' },
    { label: 'IT & Стартапы', emoji: '💻' },
    { label: 'Спорт & Бег', emoji: '🏃' },
    { label: 'Музыка & Концерты', emoji: '🎸' }
  ];

  const toggleInterest = (label: string) => {
    if (selectedInterests.includes(label)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== label));
    } else {
      if (selectedInterests.length < 4) {
        setSelectedInterests([...selectedInterests, label]);
      }
    }
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-between bg-[#0D0B14] text-white p-6 overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#8B5CF6]/25 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#FF4B72]/25 blur-[90px] pointer-events-none" />

      {/* Top Header & Progress Indicators */}
      <div className="relative z-10 w-full pt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4B72] shadow-[0_0_10px_#FF4B72]" />
            <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] bg-clip-text text-transparent">
              LOVELY
            </span>
          </div>
          <button
            type="button"
            onClick={onComplete}
            className="text-xs text-white/50 hover:text-white transition-colors"
          >
            Пропустить
          </button>
        </div>

        {/* 3 Step progress bars */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="h-1.5 rounded-full bg-white/10 overflow-hidden relative"
            >
              <div
                className={`h-full transition-all duration-400 ${
                  idx <= step
                    ? 'w-full bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] shadow-[0_0_8px_#FF4B72]'
                    : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Slide Content with smooth animations */}
      <div className="relative z-10 my-auto py-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              {/* Illustration / Glowing Icon */}
              <div className="relative w-28 h-28 flex items-center justify-center rounded-3xl glass border border-white/20 shadow-[0_0_40px_rgba(255,75,114,0.4)]">
                <HeartHandshake className="w-14 h-14 text-[#FF4B72]" />
                <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-[#8B5CF6] animate-pulse" />
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Знакомства нового поколения в Telegram
                </h1>
                <p className="text-sm text-white/70 leading-relaxed max-w-[320px] mx-auto">
                  Lovely анализирует ценности, юмор и стиль жизни, чтобы находить людей, с которыми сразу интересно.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-[330px]">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-white/10 text-white/90 flex items-center gap-1.5">
                  ✨ Психологическая совместимость
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-white/10 text-white/90 flex items-center gap-1.5">
                  💬 Ледоколы Twinby для старта
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-white/10 text-white/90 flex items-center gap-1.5">
                  ⭐️ Без фейков и спама
                </span>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-left"
            >
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#FF4B72]">
                  Мини-настройка профиля
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  Что вам ближе всего?
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  Выберите 2-3 темы для точного подбора анкет
                </p>
              </div>

              {/* Interest chips */}
              <div className="grid grid-cols-2 gap-2.5">
                {interestOptions.map((item) => {
                  const isSelected = selectedInterests.includes(item.label);
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleInterest(item.label)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#FF4B72]/20 to-[#8B5CF6]/20 border-[#FF4B72] text-white shadow-[0_0_15px_rgba(255,75,114,0.3)]'
                          : 'glass border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{item.emoji}</span>
                        <span>{item.label}</span>
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FF4B72]" />}
                    </button>
                  );
                })}
              </div>

              {/* Interactive question slider */}
              <div className="p-4 rounded-2xl glass border border-white/15 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70 font-medium">Шумная тусовка 🎉</span>
                  <span className="text-white/70 font-medium">Уютный вечер 🍷</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={quizSlider}
                  onChange={(e) => setQuizSlider(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF4B72]"
                />
                <div className="text-center text-[11px] text-[#FF4B72] font-semibold">
                  {quizSlider < 40
                    ? '⚡️ Вы любите активную социальную жизнь'
                    : quizSlider > 60
                    ? '🛋 Вы цените ламповый домашний комфорт'
                    : 'Баланс между весельем и спокойствием'}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#FF4B72] to-[#8B5CF6] shadow-[0_0_35px_rgba(139,92,246,0.6)]">
                <Compass className="w-12 h-12 text-white animate-spin-slow" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  Ваш радар настроен!
                </h2>
                <p className="text-sm text-white/70 max-w-[300px] mx-auto leading-relaxed">
                  Мы подобрали анкеты с совместимостью выше <span className="text-[#FF4B72] font-bold">88%</span>. Свайпайте вправо, если анкета нравится, и влево, чтобы пропустить.
                </p>
              </div>

              <div className="w-full p-4 rounded-2xl glass border border-white/15 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Совместимость:</span>
                  <span className="text-emerald-400 font-bold">Высокая (до 96%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Ваш психотип:</span>
                  <span className="text-[#8B5CF6] font-bold">Эмпатичный стратег</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Радиус поиска:</span>
                  <span className="text-white font-medium">Москва, до 15 км</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA Button */}
      <div className="relative z-10 w-full space-y-3">
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white font-bold text-base shadow-[0_0_25px_rgba(255,75,114,0.5)] hover:shadow-[0_0_35px_rgba(255,75,114,0.7)] transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <span>{step === 2 ? 'Начать знакомства' : 'Далее'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="w-full text-center text-xs text-white/50 hover:text-white transition-colors"
          >
            Назад
          </button>
        )}
      </div>
    </div>
  );
};
