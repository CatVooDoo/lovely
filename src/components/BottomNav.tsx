import { Flame, Heart, MessageCircle, User } from 'lucide-react';

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
  unreadCount = 1
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
      label: 'Лайки',
      icon: Heart,
      badge: likesCount > 0 ? likesCount : null
    },
    {
      id: 'matches' as TabType,
      label: 'Пары',
      icon: MessageCircle,
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
    <nav className="relative z-30 px-3 py-2 backdrop-blur-xl bg-[#0D0B14]/85 border-t border-white/10 select-none">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-300 ${
                isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {/* Active Glow Pill */}
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF4B72]/20 to-[#8B5CF6]/20 rounded-2xl border border-white/15 shadow-[0_0_15px_rgba(255,75,114,0.3)] animate-pulse" />
              )}

              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#FF4B72]' : ''
                  }`}
                  fill={isActive ? 'currentColor' : 'none'}
                />

                {/* Badge */}
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold text-white bg-[#FF4B72] rounded-full shadow-[0_0_8px_rgba(255,75,114,0.7)] animate-bounce">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-medium mt-1 tracking-tight transition-colors duration-200 ${
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
