import { useState } from 'react';
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { Sparkles, MapPin, Info, CheckCircle2 } from 'lucide-react';
import type { Profile } from '../data/mockProfiles';

interface CardProps {
  profile: Profile;
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  onOpenDetails: (profile: Profile) => void;
}

export const Card: React.FC<CardProps> = ({
  profile,
  isTop,
  onSwipe,
  onOpenDetails
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  // Motion values for swipe drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotate card as it is dragged
  const rotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);

  // Opacity for LIKE (right) and NOPE (left) stamps
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -120], [0, 1]);
  const superlikeOpacity = useTransform(y, [-30, -120], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 100;
    const verticalThreshold = -110;

    if (info.offset.y < verticalThreshold && Math.abs(info.offset.x) < 90) {
      onSwipe('up');
    } else if (info.offset.x > swipeThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe('left');
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex < profile.photos.length - 1) {
      setPhotoIndex(photoIndex + 1);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    }
  };

  const currentPhoto = profile.photos[photoIndex] || profile.photos[0];

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : 0,
        rotate: isTop ? rotate : 0,
        cursor: isTop ? 'grab' : 'default'
      }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl select-none bg-[#161224] border border-white/15"
    >
      {/* Background Photo */}
      <img
        src={currentPhoto}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-all duration-300"
        onError={(e) => {
          // Fallback if photo fails to load
          e.currentTarget.src = `https://i.pravatar.cc/600?u=${profile.id}`;
        }}
      />

      {/* Top & Bottom dark gradient overlays for readability */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0D0B14] via-[#0D0B14]/80 to-transparent pointer-events-none" />

      {/* Stories-style Photo Indicator Bars */}
      <div className="absolute top-3 inset-x-3 z-20 flex gap-1.5 pointer-events-none">
        {profile.photos.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-1 rounded-full bg-white/25 overflow-hidden backdrop-blur-sm"
          >
            <div
              className={`h-full transition-all duration-200 ${
                idx === photoIndex
                  ? 'bg-white shadow-[0_0_8px_#ffffff]'
                  : idx < photoIndex
                  ? 'bg-white/70'
                  : 'bg-transparent'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Tap zones for switching photos: Left 1/3 and Right 1/3 */}
      <div
        onClick={prevPhoto}
        className="absolute top-8 left-0 bottom-32 w-1/3 z-10 cursor-pointer"
        title="Предыдущее фото"
      />
      <div
        onClick={nextPhoto}
        className="absolute top-8 right-0 bottom-32 w-1/3 z-10 cursor-pointer"
        title="Следующее фото"
      />

      {/* Top Badges */}
      <div className="absolute top-7 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
        {/* Psychological Match Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181329]/80 backdrop-blur-md border border-[#8B5CF6]/50 shadow-[0_0_16px_rgba(139,92,246,0.5)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4B72]" />
          <span className="text-xs font-bold text-white tracking-wide">
            {profile.matchPercent}% Match
          </span>
        </div>

        {/* Online Badge */}
        {profile.online && (
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-emerald-500/40 text-[10px] text-emerald-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
        )}
      </div>

      {/* Visual Stamps during Swipe */}
      {isTop && (
        <>
          {/* LIKE Stamp (Right) */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-16 left-6 z-30 px-5 py-2 rounded-2xl border-4 border-[#22c55e] text-[#22c55e] font-black text-2xl tracking-wider uppercase rotate-[-15deg] shadow-[0_0_30px_rgba(34,197,94,0.6)] backdrop-blur-sm pointer-events-none"
          >
            LOVE ❤️
          </motion.div>

          {/* NOPE Stamp (Left) */}
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-16 right-6 z-30 px-5 py-2 rounded-2xl border-4 border-[#ef4444] text-[#ef4444] font-black text-2xl tracking-wider uppercase rotate-[15deg] shadow-[0_0_30px_rgba(239,68,68,0.6)] backdrop-blur-sm pointer-events-none"
          >
            NOPE ✕
          </motion.div>

          {/* SUPERLIKE Stamp (Up) */}
          <motion.div
            style={{ opacity: superlikeOpacity }}
            className="absolute top-28 inset-x-12 z-30 py-2.5 text-center rounded-2xl border-4 border-[#eab308] text-[#eab308] font-black text-xl tracking-wider uppercase shadow-[0_0_35px_rgba(234,179,8,0.7)] backdrop-blur-sm pointer-events-none"
          >
            SUPERLIKE ⭐️
          </motion.div>
        </>
      )}

      {/* Bottom Profile Info Card (Clickable to open Bottom Sheet details) */}
      <div
        onClick={() => onOpenDetails(profile)}
        className="absolute bottom-3 inset-x-3 z-20 p-4 rounded-2xl bg-[#0D0B14]/85 backdrop-blur-xl border border-white/15 cursor-pointer hover:border-white/25 transition-all group shadow-xl"
      >
        {/* Name, Age, Verification */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {profile.name}, {profile.age}
            </h2>
            {profile.verified && (
              <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] fill-[#8B5CF6]/30" />
            )}
          </div>

          {/* Info Button Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(profile);
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-[#FF4B72]/30 text-white/80 group-hover:text-white transition-colors"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Distance & Work */}
        <div className="flex items-center gap-3 text-xs text-white/70 mt-1 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#FF4B72]" />
            {profile.distanceKm} км от вас • {profile.city}
          </span>
        </div>

        {/* Short Bio snippet */}
        <p className="text-xs text-white/80 mt-2 line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>

        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {profile.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.label}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-white/90 border border-white/10 flex items-center gap-1"
            >
              <span>{tag.emoji}</span>
              <span>{tag.label}</span>
            </span>
          ))}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#8B5CF6]/20 text-[#c084fc] border border-[#8B5CF6]/30">
            {profile.psychology.mbti}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
