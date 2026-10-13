import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, ArrowRight, Check, Compass } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);

  // Interactive state for Step 2
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Путешествия',
    'Кофе и книги'
  ]);
  const [quizSlider, setQuizSlider] = useState<number>(65);

  const interestOptions = [
    { label: 'Путешествия' },
    { label: 'Кофе и книги' },
    { label: 'Искусство' },
    { label: 'IT и Стартапы' },
    { label: 'Спорт и бег' },
    { label: 'Музыка' }
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
    <div className="absolute inset-0 z-50 flex flex-col justify-between bg-[#0E0E11] text-white p-6 overflow-hidden">
      {/* Top Header & Progress Indicators */}
      <div className="relative z-10 w-full pt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5252]" />
            <span className="font-bold text-base tracking-wider text-white">
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
              className="h-1 rounded-full bg-white/10 overflow-hidden relative"
            >
              <div
                className={`h-full transition-all duration-300 ${
                  idx <= step
                    ? 'w-full bg-[#FF4B72]'
                    : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="relative z-10 my-auto py-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center space-y-5"
            >
              {/* Icon */}
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-[#14121E] border border-white/10">
                <HeartHandshake className="w-10 h-10 text-[#FF4B72]" />
              </div>

              <div className="space-y-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Знакомства по психологической совместимости в Telegram
                </h1>
                <p className="text-xs text-white/60 leading-relaxed max-w-[300px] mx-auto">
                  Lovely анализирует ценности, юмор и образ жизни, чтобы находить людей со схожим мировоззрением.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-[320px]">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80">
                  Психологическая совместимость
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80">
                  Вопросы для старта диалога
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80">
                  Прямой переход в Telegram
                </span>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-5 text-left"
            >
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#FF5252]">
                  Параметры профиля
                </span>
                <h2 className="text-lg font-bold text-white mt-1">
                  Что вам ближе?
                </h2>
                <p className="text-xs text-white/50 mt-0.5">
                  Выберите 2-3 темы для точного подбора анкет
                </p>
              </div>

              {/* Interest chips */}
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map((item) => {
                  const isSelected = selectedInterests.includes(item.label);
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleInterest(item.label)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-[#202028] border-[#FF5252] text-white'
                          : 'bg-[#16161D] border-[#22222B] text-white/70 hover:border-[#2F2F3B]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FF5252]" />}
                    </button>
                  );
                })}
              </div>

              {/* Interactive question slider */}
              <div className="p-4 rounded-xl bg-[#16161D] border border-[#22222B] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Шумная компания</span>
                  <span className="text-white/60">Уютный вечер дома</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={quizSlider}
                  onChange={(e) => setQuizSlider(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF4B72]"
                />
                <div className="text-center text-[11px] text-[#FF4B72] font-medium">
                  {quizSlider < 40
                    ? 'Предпочитаете активное общение и движение'
                    : quizSlider > 60
                    ? 'Цените спокойную домашнюю атмосферу'
                    : 'Баланс между динамикой и отдыхом'}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center space-y-5"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-[#16161D] border border-[#22222B]">
                <Compass className="w-10 h-10 text-white/80" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-white">
                  Параметры зафиксированы
                </h2>
                <p className="text-xs text-white/60 max-w-[290px] mx-auto leading-relaxed">
                  Подобраны анкеты с совместимостью выше <span className="text-[#FF4B72] font-semibold">88%</span>. Свайпайте вправо для симпатии и влево для пропуска.
                </p>
              </div>

              <div className="w-full p-4 rounded-xl bg-[#16161D] border border-[#22222B] text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Совместимость:</span>
                  <span className="text-emerald-400 font-semibold">от 88% до 96%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Психотип:</span>
                  <span className="text-white font-medium">Эмпатичный стратег</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Город:</span>
                  <span className="text-white font-medium">Москва</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA Button */}
      <div className="relative z-10 w-full space-y-2.5">
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3 px-6 rounded-xl bg-[#FF5252] hover:bg-[#ff3b3b] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 active:scale-98"
        >
          <span>{step === 2 ? 'Начать знакомства' : 'Далее'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="w-full text-center text-xs text-white/40 hover:text-white transition-colors"
          >
            Назад
          </button>
        )}
      </div>
    </div>
  );
};
