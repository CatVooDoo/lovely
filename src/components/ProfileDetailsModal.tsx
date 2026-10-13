import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Brain, 
  Smile, 
  Coffee, 
  Compass, 
  Send,
  ExternalLink 
} from 'lucide-react';
import { type Profile, TARGET_TELEGRAM_USERNAME } from '../data/mockProfiles';

interface ProfileDetailsModalProps {
  profile: Profile | null;
  onClose: () => void;
  onLike: (profile: Profile) => void;
  onPass: (profile: Profile) => void;
  onOpenTelegram: (username: string, text?: string) => void;
}

export const ProfileDetailsModal = ({
  profile,
  onClose,
  onLike,
  onPass,
  onOpenTelegram
}: ProfileDetailsModalProps) => {
  if (!profile) return null;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-[420px] h-[92vh] bg-[#0E0E11] border-t border-[#22222B] rounded-t-3xl overflow-y-auto no-scrollbar flex flex-col text-white"
        >
          {/* Top Sticky Close & Match Bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-[#0E0E11]/95 border-b border-[#1C1C24]">
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white">
              <span>{profile.matchPercent}% Совместимость</span>
            </div>

            <button
              type="button"
              onClick={() => onOpenTelegram(TARGET_TELEGRAM_USERNAME, `Привет, ${profile.name}! Увидел твою анкету в Lovely.`)}
              className="w-8 h-8 rounded-full bg-[#2AABEE]/20 text-[#2AABEE] flex items-center justify-center hover:bg-[#2AABEE]/30 transition-colors"
              title="Открыть в Telegram"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Gallery */}
          <div className="relative px-4 pt-3">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-[#22222B] bg-[#16161D]">
              <img
                src={profile.photos[activePhotoIdx] || profile.photos[0]}
                alt={profile.name}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = `https://i.pravatar.cc/600?u=${profile.id}`;
                }}
              />

              {/* Photo Switcher Bullets */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2 z-10">
                {profile.photos.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activePhotoIdx
                        ? 'w-6 bg-white'
                        : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Profile Header Details */}
          <div className="p-5 space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {profile.name}, {profile.age}
                </h1>
                {profile.verified && (
                  <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
                )}
                <span className="text-sm text-white/50 ml-auto font-medium">
                  {profile.zodiac}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/60 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#FF4B72]" />
                <span>{profile.distanceKm} км от вас • {profile.city}</span>
              </div>
            </div>

            {/* Direct Telegram link banner */}
            <button
              type="button"
              onClick={() => onOpenTelegram(TARGET_TELEGRAM_USERNAME, `Привет, ${profile.name}! Мы совпали в Lovely.`)}
              className="w-full p-3 rounded-xl bg-[#2AABEE]/15 border border-[#2AABEE]/30 hover:bg-[#2AABEE]/25 text-[#2AABEE] text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>Написать в Telegram @{TARGET_TELEGRAM_USERNAME}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Work & Education */}
            <div className="grid grid-cols-1 gap-2 p-3.5 rounded-xl bg-[#16161D] border border-[#22222B] text-xs">
              <div className="flex items-center gap-2.5 text-white/80">
                <Briefcase className="w-4 h-4 text-[#FF4B72]" />
                <span>{profile.work}</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80">
                <GraduationCap className="w-4 h-4 text-[#8B5CF6]" />
                <span>{profile.education}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                О себе
              </h3>
              <p className="text-sm text-white/85 leading-relaxed font-normal">
                {profile.bio}
              </p>
            </div>

            {/* Psychological Compatibility Section */}
            <div className="p-4 rounded-2xl bg-[#16161D] border border-[#22222B] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#8B5CF6]" />
                  <h3 className="text-sm font-semibold text-white">
                    Психологический тест Lovely
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  {profile.psychology.mbti}
                </span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3">
                {/* Humor */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-white/70">
                      <Smile className="w-3.5 h-3.5 text-amber-400" />
                      Чувство юмора
                    </span>
                    <span className="text-amber-400">{profile.psychology.humor}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${profile.psychology.humor}%` }}
                    />
                  </div>
                </div>

                {/* Leisure */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-white/70">
                      <Coffee className="w-3.5 h-3.5 text-[#FF4B72]" />
                      Стиль отдыха и досуг
                    </span>
                    <span className="text-[#FF4B72]">{profile.psychology.leisure}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#FF4B72] rounded-full"
                      style={{ width: `${profile.psychology.leisure}%` }}
                    />
                  </div>
                </div>

                {/* Values */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-white/70">
                      <Compass className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      Жизненные ценности
                    </span>
                    <span className="text-[#8B5CF6]">{profile.psychology.values}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#8B5CF6] rounded-full"
                      style={{ width: `${profile.psychology.values}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Summary note */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 leading-relaxed">
                <span className="font-semibold text-white/90">Резюме: </span>
                {profile.psychology.summary}
              </div>

              {/* Love language */}
              <div className="flex items-center justify-between text-xs text-white/70 pt-1 border-t border-white/10">
                <span className="text-white/40">Язык заботы:</span>
                <span className="font-semibold text-[#FF4B72]">{profile.psychology.loveLanguage}</span>
              </div>
            </div>

            {/* Interests / Tags */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Интересы
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Icebreaker Questions Preview */}
            <div className="space-y-2 pb-20">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Вопросы для первого диалога
              </h3>
              <div className="space-y-2">
                {profile.icebreakerQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onOpenTelegram(TARGET_TELEGRAM_USERNAME, q)}
                    className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white/80 text-left flex items-start justify-between gap-2 transition-colors group"
                  >
                    <div>
                      <span className="text-[#FF4B72] font-semibold mr-1.5">Q{idx + 1}:</span>
                      <span className="italic">"{q}"</span>
                    </div>
                    <Send className="w-3.5 h-3.5 text-[#2AABEE] opacity-0 group-hover:opacity-100 shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="sticky bottom-0 z-30 flex items-center justify-around p-4 bg-[#0E0E11] border-t border-[#22222B]">
            <button
              type="button"
              onClick={() => {
                onPass(profile);
                onClose();
              }}
              className="flex-1 mr-3 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4 text-rose-500" />
              Пропустить
            </button>

            <button
              type="button"
              onClick={() => {
                onLike(profile);
                onClose();
              }}
              className="flex-1 py-3 rounded-xl bg-[#FF5252] hover:bg-[#ff3b3b] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 active:scale-98"
            >
              <Heart className="w-4 h-4 fill-white stroke-none" />
              Симпатия
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
