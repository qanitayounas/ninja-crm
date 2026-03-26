import { useState } from 'react';
import {
  Search,
  Phone,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  MessageCircle,
  Instagram,
  MessageSquare,
  Mail,
  Info,
  ArrowLeft,
  X
} from 'lucide-react';
import { Avatar, Input, Badge, Card, Button, cn } from '../components/ui';
import messagesData from '../data/messages.json';
import type { Conversation } from '../types';

const SourceIcon = ({ source }: { source: string }) => {
  switch (source) {
    case 'WhatsApp': return <MessageCircle size={14} className="text-green-500" />;
    case 'Instagram': return <Instagram size={14} className="text-pink-500" />;
    case 'Messenger': return <MessageSquare size={14} className="text-blue-500" />;
    default: return <Mail size={14} className="text-gray-500" />;
  }
};

export const MessagesPage = () => {
  const [conversations] = useState<Conversation[]>(messagesData as any);
  const [activeId, setActiveId] = useState<string | null>(conversations[0]?.id || null);
  const [showInfo, setShowInfo] = useState(false);
  const [messageText, setMessageText] = useState('');

  const activeChat = conversations.find(c => c.id === activeId);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-4 md:gap-6 antialiased relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Messages</h1>
          <p className="text-gray-400 font-medium">Manage your conversations</p>
        </div>
      </div>
      <div className="flex flex-1 gap-4 md:gap-6 min-h-0">
        {/* Column 1: Chat List */}
        <Card className={cn(
          "w-full lg:w-80 shrink-0 p-0 flex flex-col overflow-hidden transition-all duration-300",
          activeId ? "hidden lg:flex" : "flex"
        )}>
          <div className="p-5 border-b border-gray-100">
            <Input icon={Search} placeholder="Search chats..." className="bg-gray-50 border-none" />
            <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
              <button className="whitespace-nowrap px-3 py-1.5 text-xs font-bold bg-ninja-yellow text-ninja-dark rounded-lg flex-shrink-0">All</button>
              <button className="whitespace-nowrap px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-ninja-dark transition-colors flex-shrink-0">Unread</button>
              <button className="whitespace-nowrap px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-ninja-dark transition-colors flex-shrink-0">Archived</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveId(chat.id)}
                className={cn(
                  "flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer transition-colors",
                  activeId === chat.id ? "bg-ninja-yellow/5 border-l-4 border-l-ninja-yellow" : "hover:bg-gray-50"
                )}
              >
                <div className="relative flex-shrink-0">
                  <Avatar name={chat.contactName} />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <SourceIcon source={chat.channel} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="font-bold text-ninja-dark truncate text-sm">{chat.contactName}</h4>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{chat.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="bg-ninja-yellow text-ninja-dark text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Column 2: Chat Window */}
        <Card className={cn(
          "flex-1 p-0 flex flex-col overflow-hidden transition-all duration-300",
          !activeId ? "hidden lg:flex" : "flex"
        )}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <button onClick={() => setActiveId(null)} className="lg:hidden p-1.5 text-gray-400 hover:text-ninja-dark">
                    <ArrowLeft size={20} />
                  </button>
                  <Avatar name={activeChat.contactName} />
                  <div className="min-w-0">
                    <h3 className="font-bold text-ninja-dark truncate text-sm md:text-base">{activeChat.contactName}</h3>
                    <div className="flex items-center gap-1.5">
                      <div className={cn("h-1.5 w-1.5 rounded-full", activeChat.status === 'online' ? "bg-green-500" : "bg-gray-300")} />
                      <span className="text-[10px] font-medium text-gray-400 capitalize whitespace-nowrap">{activeChat.status === 'online' ? 'Online' : 'Offline'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" className="p-2 rounded-full h-9 w-9 md:h-10 md:w-10 flex items-center justify-center">
                    <Phone size={18} className="md:w-5 md:h-5 text-gray-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowInfo(!showInfo)}
                    className={cn(
                      "p-2 rounded-full h-9 w-9 md:h-10 md:w-10 flex lg:hidden items-center justify-center",
                      showInfo ? "bg-ninja-yellow/20 text-ninja-dark" : "text-gray-400"
                    )}
                  >
                    <Info size={18} className="md:w-5 md:h-5" />
                  </Button>
                  <Button variant="ghost" className="p-2 rounded-full h-9 w-9 md:h-10 md:w-10 flex items-center justify-center">
                    <MoreVertical size={18} className="md:w-5 md:h-5 text-gray-400" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar bg-gray-50/30">
                {activeChat.messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[85%] md:max-w-[70%] p-3 md:p-4 rounded-2xl text-sm shadow-sm",
                      msg.isMe
                        ? "bg-ninja-yellow text-ninja-dark rounded-tr-none"
                        : "bg-white text-ninja-dark rounded-tl-none"
                    )}>
                      <p className="leading-relaxed">{msg.text}</p>
                      <span className={cn("text-[9px] md:text-[10px] mt-1 block", msg.isMe ? "text-black/40" : "text-gray-400")}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-4 md:p-5 border-t border-gray-100">
                <div className="bg-gray-50 rounded-2xl p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2">
                  <button className="p-1.5 md:p-2 text-gray-400 hover:text-ninja-dark transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm p-1.5 md:p-2"
                  />
                  <button className="hidden sm:block p-2 text-gray-400 hover:text-ninja-dark transition-colors">
                    <Smile size={20} />
                  </button>
                  <button className="bg-ninja-yellow p-2 md:p-2.5 rounded-xl text-ninja-dark shadow-sm transition-transform active:scale-90">
                    <Send size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p className="font-medium text-sm">Select a conversation to start</p>
            </div>
          )}
        </Card>

        {/* Column 3: Contact Details */}
        <Card className={cn(
          "w-80 shrink-0 flex flex-col items-center p-8 overflow-y-auto custom-scrollbar transition-all duration-300",
          showInfo ? "fixed inset-0 z-50 lg:relative lg:inset-auto lg:flex" : "hidden xl:flex"
        )}>
          {activeChat ? (
            <>
              <button onClick={() => setShowInfo(false)} className="lg:hidden absolute top-6 right-6 p-2 text-gray-400 hover:text-ninja-dark">
                <X size={24} />
              </button>
              <Avatar name={activeChat.contactName} className="h-20 w-20 md:h-24 md:w-24 shrink-0 text-2xl mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-ninja-dark text-center">{activeChat.contactName}</h3>
              <Badge status="Qualified">Qualified</Badge>

              <div className="w-full mt-8 space-y-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email</span>
                  <div className="flex items-center gap-2 text-sm text-ninja-dark font-medium px-1 truncate">
                    <Mail size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">contact@example.com</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Phone</span>
                  <div className="flex items-center gap-2 text-sm text-ninja-dark font-medium px-1">
                    <Phone size={16} className="text-gray-400 flex-shrink-0" />
                    +52 55 1234 5678
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Tags</span>
                  <div className="flex flex-wrap gap-2 mt-1 px-1">
                    <span className="px-2 py-1 bg-ninja-purple/10 text-ninja-purple font-bold text-[10px] rounded-lg border border-ninja-purple/20">Lead</span>
                    <span className="px-2 py-1 bg-ninja-yellow/10 text-ninja-dark font-bold text-[10px] rounded-lg border border-ninja-yellow/20">Priority</span>
                  </div>
                </div>
              </div>

              <div className="w-full mt-auto pt-10 border-gray-50">
                <div className="flex justify-around border-t border-gray-100 pt-6">
                  <Button variant="ghost" className="text-xs flex flex-col items-center gap-1 p-2 h-auto">
                    <span className="font-bold">Details</span>
                    <div className="h-1 w-1 rounded-full bg-ninja-yellow" />
                  </Button>
                  <Button variant="ghost" className="text-xs flex flex-col items-center gap-1 p-2 h-auto text-gray-400">
                    <span className="font-bold">Notes</span>
                  </Button>
                  <Button variant="ghost" className="text-xs flex flex-col items-center gap-1 p-2 h-auto text-gray-400">
                    <span className="font-bold">Activity</span>
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </Card>
      </div>
    </div>
  );
};
