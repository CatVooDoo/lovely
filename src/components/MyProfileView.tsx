import { useState } from 'react';
import { 
  RotateCcw, 
  Settings, 
  Plus, 
  Brain, 
  MapPin, 
  ShieldCheck, 
  Smile, 
  Coffee, 
  Compass 
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockProfiles';

interface MyProfileViewProps {
  onRestartOnboarding: () => void;
}

export const MyProfileView = ({
  onRestartOnboarding
}: MyProfileViewProps) => {
  const [interests, setInterests] = useState<string[]>(CURRENT_USER.interests);
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);

  const handleAddTag = () => {
    if (newTagInput.trim() && !interests.includes(newTagInput.trim())) {
      setInterests([...interests, newTagInput.trim()]);
      setNewTagInput('');
      setShowAddTag(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setInterests(interests.filter((t) => t !== tag));
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto no-scrollbar text-white space-y-4 pb-8">
      {/* Profile Header Card */}
      <div className="relative p-5 rounded-2xl bg-[#14121E] border border-white/10 text-center flex flex-col items-center">
        {/* Settings button top right */}
        <button
          type="button"
          onClick={() => alert('Настройки профиля')}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-full p-0.5 bg-white/20 mb-3 overflow-hidden border border-white/10">
          <img
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.name}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.currentTarget.src = 'https://i.pravatar.cc/300?img=68';
            }}
          />
          <div className="absolute bottom-0 right-0 p-1 rounded-full bg-[#8B5CF6] text-white">
            <ShieldCheck className="w-3 h-3" />
          </div>
        </div>

        {/* Name, Age, Location */}
        <h2 className="text-lg font-bold text-white">
          {CURRENT_USER.name}, {CURRENT_USER.age}
        </h2>
        <div className="flex items-center gap-1 text-xs text-white/50 mt-0.5">
          <MapPin className="w-3 h-3 text-[#FF4B72]" />
          <span>{CURRENT_USER.city}</span>
        </div>

        {/* Bio */}
        <p className="text-xs text-white/70 mt-2 max-w-[280px] leading-relaxed">
          {CURRENT_USER.bio}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-4 border-t border-white/10">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
            <span className="block text-sm font-bold text-[#FF4B72]">34</span>
            <span className="text-[10px] text-white/50">Симпатии</span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
            <span className="block text-sm font-bold text-[#8B5CF6]">12</span>
            <span className="text-[10px] text-white/50">Пар</span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
            <span className="block text-sm font-bold text-emerald-400">94%</span>
            <span className="text-[10px] text-white/50">Рейтинг</span>
          </div>
        </div>
      </div>

      {/* Psychology Profile Card */}
      <div className="p-4 rounded-2xl bg-[#14121E] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#8B5CF6]" />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-white/70">
              Психологический паспорт
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400">
            {CURRENT_USER.temperament}
          </span>
        </div>

        <div className="space-y-2 pt-1">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1 text-white/70">
                <Smile className="w-3 h-3 text-amber-400" />
                Юмор и самоирония
              </span>
              <span className="text-amber-400">{CURRENT_USER.psychology.humor}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{ width: `${CURRENT_USER.psychology.humor}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1 text-white/70">
                <Coffee className="w-3 h-3 text-[#FF4B72]" />
                Досуг и стиль жизни
              </span>
              <span className="text-[#FF4B72]">{CURRENT_USER.psychology.leisure}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#FF4B72] rounded-full"
                style={{ width: `${CURRENT_USER.psychology.leisure}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1 text-white/70">
                <Compass className="w-3 h-3 text-[#8B5CF6]" />
                Жизненные ценности
              </span>
              <span className="text-[#8B5CF6]">{CURRENT_USER.psychology.values}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#8B5CF6] rounded-full"
                style={{ width: `${CURRENT_USER.psychology.values}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Editable Interests Tags */}
      <div className="p-4 rounded-2xl bg-[#14121E] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xs uppercase tracking-wider text-white/70">
            Мои интересы ({interests.length})
          </h3>
          <button
            type="button"
            onClick={() => setShowAddTag(!showAddTag)}
            className="text-xs font-semibold text-[#FF4B72] flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            Добавить
          </button>
        </div>

        {showAddTag && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Новый интерес..."
              className="flex-1 bg-white/10 text-white placeholder-white/40 px-3 py-1.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-1.5 rounded-xl bg-[#FF4B72] text-white text-xs font-semibold"
            >
              OK
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {interests.map((tag) => (
            <span
              key={tag}
              onClick={() => handleRemoveTag(tag)}
              title="Удалить"
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80 hover:border-rose-500/50 hover:text-rose-300 cursor-pointer transition-colors"
            >
              {tag} ✕
            </span>
          ))}
        </div>
      </div>

      {/* Restart Onboarding CTA Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onRestartOnboarding}
          className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-medium text-xs border border-white/10 transition-colors flex items-center justify-center gap-2 active:scale-98"
        >
          <RotateCcw className="w-4 h-4 text-[#8B5CF6]" />
          <span>Пройти онбординг заново</span>
        </button>
      </div>
    </div>
  );
};
