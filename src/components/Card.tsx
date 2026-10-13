import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { MapPin, Info, CheckCircle2 } from 'lucide-react';
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
  const rotate = useTransform(x, [-250, 0, 250], [-14, 0, 14]);

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
      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden select-none bg-[#14121d] border border-white/10"
    >
      {/* Background Photo */}
      <img
        src={currentPhoto}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-all duration-300"
        onError={(e) => {
          e.currentTarget.src = `https://i.pravatar.cc/600?u=${profile.id}`;
        }}
      />

      {/* Top & Bottom dark gradient overlays for readability */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/75 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0C0A14] via-[#0C0A14]/85 to-transparent pointer-events-none" />

      {/* Stories-style Photo Indicator Bars */}
      <div className="absolute top-3 inset-x-3 z-20 flex gap-1.5 pointer-events-none">
        {profile.photos.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden"
          >
            <div
              className={`h-full transition-all duration-200 ${
                idx === photoIndex
                  ? 'bg-white'
                  : idx < photoIndex
                  ? 'bg-white/60'
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
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-xs font-semibold text-white">
          <span>{profile.matchPercent}% Match</span>
        </div>

        {/* Online Badge */}
        {profile.online && (
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
            className="absolute top-16 left-6 z-30 px-4 py-1.5 rounded-xl border-2 border-emerald-400 text-emerald-400 font-bold text-xl tracking-wider uppercase rotate-[-12deg] bg-black/40 pointer-events-none"
          >
            LIKE
          </motion.div>

          {/* NOPE Stamp (Left) */}
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-16 right-6 z-30 px-4 py-1.5 rounded-xl border-2 border-rose-500 text-rose-500 font-bold text-xl tracking-wider uppercase rotate-[12deg] bg-black/40 pointer-events-none"
          >
            PASS
          </motion.div>

          {/* SUPERLIKE Stamp (Up) */}
          <motion.div
            style={{ opacity: superlikeOpacity }}
            className="absolute top-28 inset-x-14 z-30 py-2 text-center rounded-xl border-2 border-amber-400 text-amber-400 font-bold text-lg tracking-wider uppercase bg-black/50 pointer-events-none"
          >
            SUPERLIKE
          </motion.div>
        </>
      )}

      {/* Bottom Profile Info Card (Clickable to open Bottom Sheet details) */}
      <div
        onClick={() => onOpenDetails(profile)}
        className="absolute bottom-3 inset-x-3 z-20 p-4 rounded-2xl bg-[#120F1D]/90 backdrop-blur-md border border-white/10 cursor-pointer hover:border-white/20 transition-all group"
      >
        {/* Name, Age, Verification */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {profile.name}, {profile.age}
            </h2>
            {profile.verified && (
              <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
            )}
          </div>

          {/* Info Button Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(profile);
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white/20 text-white/80 group-hover:text-white transition-colors"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Distance & Work */}
        <div className="flex items-center gap-2 text-xs text-white/60 mt-1 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#FF4B72]" />
          <span>{profile.distanceKm} км от вас • {profile.city}</span>
        </div>

        {/* Short Bio snippet */}
        <p className="text-xs text-white/75 mt-2 line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>

        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {profile.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.label}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-white/90 border border-white/5"
            >
              {tag.label}
            </span>
          ))}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#8B5CF6]/15 text-[#c084fc] border border-[#8B5CF6]/20">
            {profile.psychology.mbti}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
