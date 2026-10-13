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
import { ChatModal } from './components/ChatModal';
import { 
  MOCK_PROFILES, 
  INITIAL_MATCH_CHATS, 
  type Profile, 
  type MatchChat 
} from './data/mockProfiles';

export function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('deck');
  
  // Data state
  const [allProfiles, setAllProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [chats, setChats] = useState<MatchChat[]>(INITIAL_MATCH_CHATS);
  const [newMatches, setNewMatches] = useState<Profile[]>([MOCK_PROFILES[0], MOCK_PROFILES[1]]);

  // Modals & Overlays
  const [detailsProfile, setDetailsProfile] = useState<Profile | null>(null);
  const [matchOverlayProfile, setMatchOverlayProfile] = useState<Profile | null>(null);
  const [activeChat, setActiveChat] = useState<MatchChat | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
    // Add to newMatches if not already there
    if (!newMatches.find((m) => m.id === profile.id)) {
      setNewMatches([profile, ...newMatches]);
    }

    // Add to chats if not there
    if (!chats.find((c) => c.profile.id === profile.id)) {
      const newChat: MatchChat = {
        profile,
        lastMessage: "Вы создали пару! Начните диалог с ледокола ✨",
        lastMessageTime: "Только что",
        unreadCount: 1,
        messages: []
      };
      setChats([newChat, ...chats]);
    }

    setMatchOverlayProfile(profile);
  };

  // Icebreaker send from MatchOverlay
  const handleSendIcebreaker = (profile: Profile, question: string) => {
    setMatchOverlayProfile(null);

    // Update chat with the icebreaker message
    const existingChatIndex = chats.findIndex((c) => c.profile.id === profile.id);
    const icebreakerMsg = {
      id: `ice-${Date.now()}`,
      sender: 'me' as const,
      text: question,
      timestamp: 'Только что',
      isIcebreaker: true
    };

    if (existingChatIndex >= 0) {
      const updatedChats = [...chats];
      updatedChats[existingChatIndex] = {
        ...updatedChats[existingChatIndex],
        lastMessage: question,
        lastMessageTime: 'Только что',
        messages: [...updatedChats[existingChatIndex].messages, icebreakerMsg]
      };
      setChats(updatedChats);
      setActiveChat(updatedChats[existingChatIndex]);
    } else {
      const newChat: MatchChat = {
        profile,
        lastMessage: question,
        lastMessageTime: 'Только что',
        unreadCount: 0,
        messages: [icebreakerMsg]
      };
      setChats([newChat, ...chats]);
      setActiveChat(newChat);
    }

    // Navigate to Matches tab
    setActiveTab('matches');
  };

  // Send message inside ChatModal
  const handleSendMessageInChat = (matchId: string, text: string) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.profile.id === matchId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Только что',
            messages: [
              ...c.messages,
              {
                id: `msg-${Date.now()}`,
                sender: 'me',
                text,
                timestamp: 'Только что'
              }
            ]
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#08060f] flex items-center justify-center p-0 sm:py-6 sm:px-4">
      {/* Desktop Background Ambient Glows */}
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-[#8B5CF6]/15 blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#FF4B72]/15 blur-[120px] pointer-events-none" />

      {/* Telegram Mobile Container Frame */}
      <main className="w-full max-w-[420px] h-[100dvh] mx-auto overflow-hidden relative shadow-2xl rounded-none sm:rounded-[36px] border-0 sm:border sm:border-white/15 bg-[#0D0B14] flex flex-col justify-between select-none">
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
              chats={chats}
              newMatches={newMatches}
              onOpenChat={(chat) => setActiveChat(chat)}
              onOpenProfile={(profile) => setDetailsProfile(profile)}
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
          unreadCount={chats.filter((c) => c.unreadCount > 0).length}
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
        />

        {/* It's a Match! Fullscreen Overlay */}
        <MatchOverlay
          matchProfile={matchOverlayProfile}
          onClose={() => setMatchOverlayProfile(null)}
          onSendIcebreaker={handleSendIcebreaker}
        />

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleApplyFilters}
        />

        {/* Interactive Chat Modal */}
        <ChatModal
          chat={activeChat}
          onClose={() => setActiveChat(null)}
          onSendMessage={handleSendMessageInChat}
        />
      </main>
    </div>
  );
}

export default App;
