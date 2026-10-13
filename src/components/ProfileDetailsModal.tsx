import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Heart, 
  Brain, 
  Smile, 
  Coffee, 
  Compass, 
  Share2 
} from 'lucide-react';
import type { Profile } from '../data/mockProfiles';

interface ProfileDetailsModalProps {
  profile: Profile | null;
  onClose: () => void;
  onLike: (profile: Profile) => void;
  onPass: (profile: Profile) => void;
}

export const ProfileDetailsModal: React.FC<ProfileDetailsModalProps> = ({
  profile,
  onClose,
  onLike,
  onPass
}) => {
  if (!profile) return null;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          className="relative w-full max-w-[420px] h-[92vh] bg-[#0E0C16] border-t border-white/15 rounded-t-3xl overflow-y-auto no-scrollbar shadow-2xl flex flex-col text-white"
        >
          {/* Top Sticky Close & Share Bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-gradient-to-b from-[#0E0C16] via-[#0E0C16]/90 to-transparent">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-xs font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4B72]" />
              <span>{profile.matchPercent}% Совместимость</span>
            </div>

            <button
              type="button"
              onClick={() => alert(`Ссылка на профиль ${profile.name} скопирована!`)}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Gallery with Bullets */}
          <div className="relative px-4 pt-1">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-[#161224]">
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
                        ? 'w-6 bg-white shadow-[0_0_8px_#ffffff]'
                        : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Profile Header Details */}
          <div className="p-5 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {profile.name}, {profile.age}
                </h1>
                {profile.verified && (
                  <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] fill-[#8B5CF6]/30" />
                )}
                <span className="text-sm text-white/60 ml-auto font-medium">
                  {profile.zodiac}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/70 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#FF4B72]" />
                <span>{profile.distanceKm} км от вас • {profile.city}</span>
              </div>
            </div>

            {/* Work & Education */}
            <div className="grid grid-cols-1 gap-2.5 p-3.5 rounded-2xl glass border border-white/10 text-xs">
              <div className="flex items-center gap-2.5 text-white/85">
                <Briefcase className="w-4 h-4 text-[#FF4B72]" />
                <span>{profile.work}</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/85">
                <GraduationCap className="w-4 h-4 text-[#8B5CF6]" />
                <span>{profile.education}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">
                О себе
              </h3>
              <p className="text-sm text-white/90 leading-relaxed font-normal">
                {profile.bio}
              </p>
            </div>

            {/* Twinby-style Psychological Compatibility Section */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1C172E] to-[#120F1F] border border-[#8B5CF6]/30 shadow-[0_0_25px_rgba(139,92,246,0.15)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#8B5CF6]" />
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Психологический тест Lovely
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {profile.psychology.mbti}
                </span>
              </div>

              {/* Compatibility Progress Bars */}
              <div className="space-y-3">
                {/* Humor */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <Smile className="w-3.5 h-3.5 text-amber-400" />
                      Чувство юмора
                    </span>
                    <span className="text-amber-400">{profile.psychology.humor}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-[#FF4B72] rounded-full transition-all duration-500"
                      style={{ width: `${profile.psychology.humor}%` }}
                    />
                  </div>
                </div>

                {/* Leisure */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <Coffee className="w-3.5 h-3.5 text-[#FF4B72]" />
                      Стиль отдыха и досуг
                    </span>
                    <span className="text-[#FF4B72]">{profile.psychology.leisure}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] rounded-full transition-all duration-500"
                      style={{ width: `${profile.psychology.leisure}%` }}
                    />
                  </div>
                </div>

                {/* Values */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <Compass className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      Жизненные ценности
                    </span>
                    <span className="text-[#8B5CF6]">{profile.psychology.values}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8B5CF6] to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${profile.psychology.values}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Psychology Summary note */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 leading-relaxed">
                <span className="font-semibold text-white/90">Резюме: </span>
                {profile.psychology.summary}
              </div>

              {/* Love language badge */}
              <div className="flex items-center justify-between text-xs text-white/80 pt-1 border-t border-white/10">
                <span className="text-white/50">Язык любви:</span>
                <span className="font-semibold text-[#FF4B72]">{profile.psychology.loveLanguage}</span>
              </div>
            </div>

            {/* Interests / Tags */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">
                Интересы
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-white/15 text-white/90 flex items-center gap-1.5"
                  >
                    <span>{tag.emoji}</span>
                    <span>{tag.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Icebreaker Questions Preview */}
            <div className="space-y-2 pb-20">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">
                Вопросы для первого диалога
              </h3>
              <div className="space-y-2">
                {profile.icebreakerQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 italic flex items-start gap-2"
                  >
                    <span className="text-[#FF4B72] font-bold">Q{idx + 1}:</span>
                    <span>"{q}"</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Bottom Quick Action Buttons */}
          <div className="sticky bottom-0 z-30 flex items-center justify-around p-4 bg-gradient-to-t from-[#0E0C16] via-[#0E0C16]/95 to-transparent border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                onPass(profile);
                onClose();
              }}
              className="flex-1 mr-3 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white/80 font-bold text-sm border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5 text-rose-500" />
              Пропустить
            </button>

            <button
              type="button"
              onClick={() => {
                onLike(profile);
                onClose();
              }}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,75,114,0.5)] transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Heart className="w-5 h-5 fill-white stroke-none" />
              Нравится
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
