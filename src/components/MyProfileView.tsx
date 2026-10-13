import { useState } from 'react';
import { MapPin, Plus, X, RotateCcw } from 'lucide-react';
import { CURRENT_USER } from '../data/mockProfiles';

interface MyProfileViewProps {
  onRestartOnboarding: () => void;
}

export const MyProfileView = ({ onRestartOnboarding }: MyProfileViewProps) => {
  const [interests, setInterests] = useState<string[]>([
    'IT и стартапы',
    'Кофе',
    'Путешествия',
    'Друг'
  ]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const handleAddTag = () => {
    const trimmed = newTagInput.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setInterests(interests.filter((t) => t !== tag));
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto no-scrollbar text-white space-y-3.5 pb-8 bg-[#0E0E11]">
      {/* Centered Profile Header */}
      <div className="flex flex-col items-center text-center pt-2 pb-1">
        {/* Natural circular avatar with subtle 1px border */}
        <div className="w-20 h-20 rounded-full border border-white/15 overflow-hidden mb-2.5">
          <img
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://i.pravatar.cc/300?img=68';
            }}
          />
        </div>

        {/* Name and Age */}
        <h2 className="text-lg font-bold text-white tracking-tight">
          {CURRENT_USER.name}, {CURRENT_USER.age}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-[#8E8E93] mt-0.5">
          <MapPin className="w-3 h-3 text-[#8E8E93]" />
          <span>{CURRENT_USER.city}</span>
        </div>

        {/* Status / Bio */}
        <p className="text-xs text-[#8E8E93] mt-1.5 max-w-[280px]">
          {CURRENT_USER.bio}
        </p>
      </div>

      {/* Stats Block: 3 Flat Cards */}
      <div className="grid grid-cols-3 gap-2.5 w-full">
        {/* Likes */}
        <div className="py-3 px-2 rounded-2xl bg-[#16161D] border border-[#22222B] text-center">
          <span className="block text-base font-semibold text-[#FF5A79]">34</span>
          <span className="text-[11px] text-[#8E8E93] mt-0.5 block">Симпатии</span>
        </div>

        {/* Matches */}
        <div className="py-3 px-2 rounded-2xl bg-[#16161D] border border-[#22222B] text-center">
          <span className="block text-base font-semibold text-[#FF5A79]">12</span>
          <span className="text-[11px] text-[#8E8E93] mt-0.5 block">Пар</span>
        </div>

        {/* Rating */}
        <div className="py-3 px-2 rounded-2xl bg-[#16161D] border border-[#22222B] text-center">
          <span className="block text-base font-semibold text-[#55C478]">94%</span>
          <span className="text-[11px] text-[#8E8E93] mt-0.5 block">Рейтинг</span>
        </div>
      </div>

      {/* Psychological Passport Card */}
      <div className="p-4 rounded-2xl bg-[#16161D] border border-[#22222B] space-y-3">
        <h3 className="text-sm font-semibold text-white">
          Психологический паспорт
        </h3>

        {/* Discrete Temperament Tag */}
        <div className="inline-block px-3 py-1 rounded-full bg-[#202028] text-xs text-[#8E8E93]">
          {CURRENT_USER.temperament}
        </div>

        {/* 3 Flat Minimalist Scales without glows or percentages */}
        <div className="space-y-3 pt-1">
          {/* Humor */}
          <div className="space-y-1.5">
            <div className="text-xs text-white/80">
              Юмор и самоирония
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#252530] overflow-hidden">
              <div
                className="h-full bg-[#E5B54F] rounded-full"
                style={{ width: `${CURRENT_USER.psychology.humor}%` }}
              />
            </div>
          </div>

          {/* Leisure */}
          <div className="space-y-1.5">
            <div className="text-xs text-white/80">
              Досуг и стиль жизни
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#252530] overflow-hidden">
              <div
                className="h-full bg-[#E86458] rounded-full"
                style={{ width: `${CURRENT_USER.psychology.leisure}%` }}
              />
            </div>
          </div>

          {/* Values */}
          <div className="space-y-1.5">
            <div className="text-xs text-white/80">
              Жизненные ценности
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#252530] overflow-hidden">
              <div
                className="h-full bg-[#7F6BDE] rounded-full"
                style={{ width: `${CURRENT_USER.psychology.values}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* My Interests Card */}
      <div className="p-4 rounded-2xl bg-[#16161D] border border-[#22222B] space-y-3">
        <h3 className="text-sm font-semibold text-white">
          Мои интересы
        </h3>

        {isAddingTag && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Новый интерес..."
              autoFocus
              className="flex-1 bg-[#202028] text-white placeholder-[#8E8E93] px-3 py-1.5 rounded-xl text-xs focus:outline-none border border-[#2B2B36]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-1.5 rounded-xl bg-[#24242C] text-white text-xs font-medium hover:bg-[#2E2E38]"
            >
              OK
            </button>
            <button
              type="button"
              onClick={() => setIsAddingTag(false)}
              className="px-2 py-1.5 rounded-xl bg-[#202028] text-[#8E8E93] text-xs hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {interests.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-[#202028] text-white/90"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-[#8E8E93] hover:text-white transition-colors"
                title="Удалить"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {!isAddingTag && (
            <button
              type="button"
              onClick={() => setIsAddingTag(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs bg-[#202028] text-white/90 hover:bg-[#282834] transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Добавить</span>
            </button>
          )}
        </div>
      </div>

      {/* Subtle Onboarding Restart option */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onRestartOnboarding}
          className="w-full py-2.5 px-4 rounded-xl bg-[#16161D] hover:bg-[#1C1C24] text-[#8E8E93] hover:text-white font-normal text-xs border border-[#22222B] transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Пройти тест Lovely заново</span>
        </button>
      </div>
    </div>
  );
};
