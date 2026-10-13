import { Flame, Heart, MessageSquare, User } from 'lucide-react';

export type TabType = 'deck' | 'likes' | 'matches' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  likesCount?: number;
  unreadCount?: number;
}

export const BottomNav = ({
  activeTab,
  onChangeTab
}: BottomNavProps) => {
  const tabs = [
    {
      id: 'deck' as TabType,
      label: 'Свайпы',
      icon: Flame
    },
    {
      id: 'likes' as TabType,
      label: 'Симпатии',
      icon: Heart
    },
    {
      id: 'matches' as TabType,
      label: 'Пары',
      icon: MessageSquare
    },
    {
      id: 'profile' as TabType,
      label: 'Профиль',
      icon: User
    }
  ];

  return (
    <nav className="relative z-30 px-6 py-2.5 bg-[#0E0E11] border-t border-[#1C1C22] select-none">
      <div className="flex items-center justify-between max-w-[340px] mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`p-2 rounded-full transition-colors ${
                isActive ? 'text-white' : 'text-[#636366] hover:text-[#8E8E93]'
              }`}
            >
              <Icon
                className="w-6 h-6 transition-transform"
                strokeWidth={isActive ? 2.2 : 1.7}
                fill={isActive ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
