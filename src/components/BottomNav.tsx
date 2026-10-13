import { Flame, Heart, Sparkles, User } from 'lucide-react';

export type TabType = 'deck' | 'likes' | 'matches' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  likesCount?: number;
  unreadCount?: number;
}

export const BottomNav = ({
  activeTab,
  onChangeTab,
  likesCount = 6,
  unreadCount = 0
}: BottomNavProps) => {
  const tabs = [
    {
      id: 'deck' as TabType,
      label: 'Свайпы',
      icon: Flame,
      badge: null
    },
    {
      id: 'likes' as TabType,
      label: 'Симпатии',
      icon: Heart,
      badge: likesCount > 0 ? likesCount : null
    },
    {
      id: 'matches' as TabType,
      label: 'Пары и игры',
      icon: Sparkles,
      badge: unreadCount > 0 ? unreadCount : null
    },
    {
      id: 'profile' as TabType,
      label: 'Профиль',
      icon: User,
      badge: null
    }
  ];

  return (
    <nav className="relative z-30 px-3 py-2 bg-[#0D0B14] border-t border-white/10 select-none">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-colors ${
                isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-white/[0.06] rounded-xl border border-white/10" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'text-[#FF4B72]' : ''
                  }`}
                  fill={isActive ? 'currentColor' : 'none'}
                />

                {tab.badge && (
                  <span className="absolute -top-1 -right-2.5 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold text-white bg-[#FF4B72] rounded-full">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-medium mt-1 tracking-tight ${
                  isActive ? 'text-white font-semibold' : 'text-white/40'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
