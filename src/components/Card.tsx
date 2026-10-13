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
  const rotate = useTransform(x, [-250, 0, 250], [-10, 0, 10]);

  // Opacity for LIKE (right) and NOPE (left) stamps
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -120], [0, 1]);
  const superlikeOpacity = useTransform(y, [-30, -120], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 90;
    const verticalThreshold = -100;

    if (info.offset.y < verticalThreshold && Math.abs(info.offset.x) < 80) {
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
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
      className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden select-none bg-[#16161C] border border-[#22222A]"
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

      {/* Top & Bottom natural dark gradient scrims */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

      {/* Stories-style Photo Indicator Bars */}
      <div className="absolute top-2.5 inset-x-3.5 z-20 flex gap-1.5 pointer-events-none">
        {profile.photos.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden"
          >
            <div
              className={`h-full transition-all duration-200 ${
                idx === photoIndex
                  ? 'bg-white'
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
        className="absolute top-8 left-0 bottom-36 w-1/3 z-10 cursor-pointer"
        title="Предыдущее фото"
      />
      <div
        onClick={nextPhoto}
        className="absolute top-8 right-0 bottom-36 w-1/3 z-10 cursor-pointer"
        title="Следующее фото"
      />

      {/* Top Badges matching reference */}
      <div className="absolute top-6 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
        {/* Psychological Match Badge */}
        <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium text-white/90 border border-white/10">
          <span>{profile.matchPercent}% Совместимость</span>
        </div>

        {/* Online Badge */}
        {profile.online && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Онлайн
          </div>
        )}
      </div>

      {/* Subtle Stamps during Swipe */}
      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-16 left-6 z-30 px-3.5 py-1 rounded-lg border-2 border-emerald-400 text-emerald-400 font-bold text-lg tracking-wider uppercase rotate-[-10deg] bg-black/50 pointer-events-none"
          >
            LIKE
          </motion.div>

          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-16 right-6 z-30 px-3.5 py-1 rounded-lg border-2 border-[#FF5A79] text-[#FF5A79] font-bold text-lg tracking-wider uppercase rotate-[10deg] bg-black/50 pointer-events-none"
          >
            PASS
          </motion.div>

          <motion.div
            style={{ opacity: superlikeOpacity }}
            className="absolute top-24 inset-x-16 z-30 py-1.5 text-center rounded-lg border-2 border-[#3E8BFF] text-[#3E8BFF] font-bold text-base tracking-wider uppercase bg-black/60 pointer-events-none"
          >
            SUPERLIKE
          </motion.div>
        </>
      )}

      {/* Bottom Profile Info Card (matching screenshot) */}
      <div
        onClick={() => onOpenDetails(profile)}
        className="absolute bottom-0 inset-x-0 z-20 p-4 pt-0 cursor-pointer"
      >
        {/* Name, Age, Verification */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {profile.name}, {profile.age}
            </h2>
            {profile.verified && (
              <CheckCircle2 className="w-4 h-4 text-white fill-white/20" strokeWidth={2.2} />
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(profile);
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <Info className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Distance & City */}
        <div className="flex items-center gap-1.5 text-xs text-[#8E8E93] mt-1 font-normal">
          <MapPin className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span>{profile.distanceKm} км от вас • {profile.city}</span>
        </div>

        {/* Short Bio snippet */}
        <p className="text-xs text-white/80 mt-2 line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>

        {/* Flat Tags row (Matching screenshot) */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {profile.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.label}
              className="px-2.5 py-1 rounded-lg text-[11px] font-normal bg-[#24242C] text-white/90"
            >
              {tag.label}
            </span>
          ))}
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#24242C] text-[#A5A5B5]">
            {profile.psychology.mbti}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
