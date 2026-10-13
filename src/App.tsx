import { useState } from 'react';
import { TelegramHeader } from './components/TelegramHeader';
import { BottomNav, type TabType } from './components/BottomNav';
import { Deck } from './components/Deck';
import { LikesView } from './components/LikesView';
import { MatchesAndGamesView } from './components/MatchesAndGamesView';
import { MyProfileView } from './components/MyProfileView';
import { Onboarding } from './components/Onboarding';
import { ProfileDetailsModal } from './components/ProfileDetailsModal';
import { MatchOverlay } from './components/MatchOverlay';
import { FilterModal, type FilterState } from './components/FilterModal';
import { 
  MOCK_PROFILES, 
  type Profile,
  TARGET_TELEGRAM_USERNAME 
} from './data/mockProfiles';

export function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('deck');
  
  // Data state
  const [allProfiles, setAllProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [newMatches, setNewMatches] = useState<Profile[]>([MOCK_PROFILES[0], MOCK_PROFILES[1]]);

  // Modals & Overlays
  const [detailsProfile, setDetailsProfile] = useState<Profile | null>(null);
  const [matchOverlayProfile, setMatchOverlayProfile] = useState<Profile | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Direct Telegram navigation handler
  const handleOpenTelegram = (username: string = TARGET_TELEGRAM_USERNAME, text?: string) => {
    const url = text 
      ? `https://t.me/${username}?text=${encodeURIComponent(text)}`
      : `https://t.me/${username}`;
    window.open(url, '_blank');
  };

  // Filter application
  const handleApplyFilters = (filters: FilterState) => {
    const filtered = MOCK_PROFILES.filter((p) => {
      const ageOk = p.age <= filters.maxAge;
      const distOk = p.distanceKm <= filters.maxDistance;
      const matchOk = p.matchPercent >= filters.minMatch;
      return ageOk && distOk && matchOk;
    });
    setAllProfiles(filtered.length > 0 ? filtered : MOCK_PROFILES);
  };

  // Match event triggered from deck or likes
  const handleMatch = (profile: Profile) => {
    if (!newMatches.find((m) => m.id === profile.id)) {
      setNewMatches([profile, ...newMatches]);
    }
    setMatchOverlayProfile(profile);
  };

  return (
    <div className="min-h-screen w-full bg-[#08070d] flex items-center justify-center p-0 sm:py-6 sm:px-4">
      {/* Telegram Mobile Container Frame */}
      <main className="w-full max-w-[420px] h-[100dvh] mx-auto overflow-hidden relative rounded-none sm:rounded-[32px] border-0 sm:border sm:border-white/10 bg-[#0D0B14] flex flex-col justify-between select-none">
        {/* Telegram Header */}
        <TelegramHeader
          onRestartOnboarding={() => setShowOnboarding(true)}
          onOpenFilters={() => setIsFilterModalOpen(true)}
          activeTab={activeTab}
        />

        {/* Dynamic Screen View according to Active Tab */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === 'deck' && (
            <Deck
              profiles={allProfiles}
              onMatch={handleMatch}
              onOpenDetails={(profile) => setDetailsProfile(profile)}
              onOpenFilters={() => setIsFilterModalOpen(true)}
            />
          )}

          {activeTab === 'likes' && (
            <LikesView
              onSelectProfile={(profile) => setDetailsProfile(profile)}
              onMatch={handleMatch}
            />
          )}

          {activeTab === 'matches' && (
            <MatchesAndGamesView
              newMatches={newMatches}
              onOpenProfile={(profile) => setDetailsProfile(profile)}
              onOpenTelegram={handleOpenTelegram}
            />
          )}

          {activeTab === 'profile' && (
            <MyProfileView
              onRestartOnboarding={() => setShowOnboarding(true)}
            />
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          likesCount={6}
          unreadCount={0}
        />

        {/* Interactive Onboarding Flow */}
        {showOnboarding && (
          <Onboarding onComplete={() => setShowOnboarding(false)} />
        )}

        {/* Detailed Profile Bottom Sheet */}
        <ProfileDetailsModal
          profile={detailsProfile}
          onClose={() => setDetailsProfile(null)}
          onLike={(p) => {
            handleMatch(p);
            setDetailsProfile(null);
          }}
          onPass={() => setDetailsProfile(null)}
          onOpenTelegram={handleOpenTelegram}
        />

        {/* Mutual Match Overlay */}
        <MatchOverlay
          matchProfile={matchOverlayProfile}
          onClose={() => setMatchOverlayProfile(null)}
          onOpenTelegram={handleOpenTelegram}
        />

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleApplyFilters}
        />
      </main>
    </div>
  );
}

export default App;
