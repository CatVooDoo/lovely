import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, CheckCheck } from 'lucide-react';
import type { MatchChat, ChatMessage } from '../data/mockProfiles';

interface ChatModalProps {
  chat: MatchChat | null;
  onClose: () => void;
  onSendMessage: (matchId: string, text: string) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  chat,
  onClose,
  onSendMessage
}) => {
  if (!chat) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(chat.messages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: input.trim(),
      timestamp: 'Только что'
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    onSendMessage(chat.profile.id, input.trim());
    setInput('');

    // Simulate match reply after 1.5 seconds
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "Ого, отличный ответ! Полностью согласна с тобой 😊",
        "Ахаха, это в точку! Когда идем проверять на практике? ☕️",
        "Интересный взгляд! Кажется, у нас действительно высокий процент совместимости ✨",
        "Кстати, обожаю спонтанные встречи. Как твои планы на этот вечер?"
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'match',
          text: randomReply,
          timestamp: 'Только что'
        }
      ]);
    }, 1600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-[420px] h-[100dvh] bg-[#0E0B17] flex flex-col text-white"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#151124] border-b border-white/10 z-10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#8B5CF6]/50">
                <img
                  src={chat.profile.photos[0]}
                  alt={chat.profile.name}
                  className="w-full h-full object-cover"
                />
                {chat.profile.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#151124]" />
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  {chat.profile.name}
                  <span className="text-[10px] text-emerald-400 font-normal">
                    {chat.profile.online ? '• В сети' : ''}
                  </span>
                </h3>
                <span className="text-[10px] text-white/50">
                  {chat.profile.matchPercent}% Совместимость
                </span>
              </div>
            </div>

            <div className="px-2 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[10px] font-bold text-white flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FF4B72]" />
              Twinby Chat
            </div>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
            {/* Compatibility Reminder Pill */}
            <div className="flex justify-center my-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-white/60">
                Вы совпали по тесту на {chat.profile.matchPercent}%. Общие темы: {chat.profile.tags.map(t => t.label).join(', ')}
              </span>
            </div>

            {messages.map((msg) => {
              const isMe = msg.sender === 'me';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white rounded-br-xs shadow-[0_0_15px_rgba(255,75,114,0.3)]'
                        : msg.isIcebreaker
                        ? 'bg-[#231A38] text-white border border-[#FF4B72]/40 rounded-bl-xs shadow-md italic'
                        : 'bg-[#1C162E] text-white/90 border border-white/10 rounded-bl-xs'
                    }`}
                  >
                    {msg.isIcebreaker && (
                      <div className="text-[10px] font-bold text-[#FF4B72] uppercase tracking-wider not-italic mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Ледокол Twinby:
                      </div>
                    )}
                    <p>{msg.text}</p>
                    <div
                      className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                        isMe ? 'text-white/70' : 'text-white/40'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#1C162E] w-16 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Toolbar */}
          <div className="p-3 bg-[#151124] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-white/10 text-white placeholder-white/40 px-4 py-2.5 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-[#FF4B72] border border-white/10"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                input.trim()
                  ? 'bg-gradient-to-r from-[#FF4B72] to-[#8B5CF6] text-white shadow-[0_0_15px_rgba(255,75,114,0.5)] active:scale-95'
                  : 'bg-white/5 text-white/20'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
