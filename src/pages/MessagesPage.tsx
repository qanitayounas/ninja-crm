import { useState, useEffect } from 'react';
import {
  Search,
  Phone,
  MoreVertical,
  Send,
  Plus,
  Smile,
  MessageCircle,
  Instagram,
  MessageSquare,
  Mail,
  Info,
  ArrowLeft,
  X,
  UserPlus,
  Star,
  FilePlus
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Avatar, Input, Badge, Card, Button, cn } from '../components/ui';
import { apiService } from '../services/apiService';
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
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [channelFilter, setChannelFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeId) {
      loadMessages(activeId);
    }
  }, [activeId]);

  const loadConversations = async () => {
    setIsLoading(true);
    setSyncError(null);
    try {
      const data = await apiService.getConversations();
      // Need names for conversations. For now, we'll use contact names if available
      // or placeholder. In a full app, we'd fetch contact details in parallel.
      setConversations(data);
      if (data.length > 0 && !activeId) setActiveId(data[0].id);
    } catch (error: any) {
      console.error('Error loading conversations:', error);
      if (error.status === 403 || error.status === 401) {
        setSyncError('Message history is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
      } else {
        toast.error('Failed to load messages');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const messages = await apiService.getMessages(conversationId);
      setConversations(prev => prev.map(c => 
        c.id === conversationId ? { ...c, messages } : c
      ));
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeId || !activeChat) return;
    
    setIsSending(true);
    try {
      await apiService.sendMessage(activeId, messageText, activeChat.contactId);
      setMessageText('');
      toast.success('Message sent');
      // Reload messages to show the new one
      loadMessages(activeId);
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const filteredConversations = conversations.filter(c => {
    if (!channelFilter) return true;
    if (channelFilter === 'unread') return c.unreadCount > 0;
    return c.channel.toLowerCase() === channelFilter.toLowerCase();
  });

  const activeChat = conversations.find(c => c.id === activeId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-4 md:gap-6 antialiased relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Messages</h1>
          <p className="text-gray-400 font-medium">Manage your conversations</p>
        </div>
      </div>

      {/* Alert Case: Branded Setup Notice */}
      {syncError && (
        <Card className="p-4 border-l-4 border-l-ninja-purple bg-ninja-purple/5 border-ninja-purple/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ninja-purple/10 rounded-lg text-ninja-purple">
              <MessageSquare size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-ninja-dark">Module Synchronization</p>
              <p className="text-xs text-slate-500 font-medium">{syncError}</p>
            </div>
          </div>
        </Card>
      )}
      <div className="flex flex-1 gap-4 md:gap-6 min-h-0">
        {/* Column 1: Chat List */}
        <Card className={cn(
          "w-full lg:w-80 shrink-0 p-0 flex flex-col overflow-hidden transition-all duration-300",
          activeId ? "hidden lg:flex" : "flex"
        )}>
          <div className="p-5 border-b border-gray-100">
            <Input icon={Search} placeholder="Search chats..." className="bg-gray-50 border-none" />
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <button onClick={() => setChannelFilter(null)} className={cn("whitespace-nowrap px-3 py-1 text-[11px] font-bold rounded-lg flex-shrink-0 shadow-sm transition-colors", channelFilter === null ? "bg-ninja-yellow text-ninja-dark" : "text-gray-500 hover:bg-gray-100")}>All</button>
                <button onClick={() => setChannelFilter('unread')} className={cn("whitespace-nowrap px-3 py-1 text-[11px] font-bold transition-colors flex-shrink-0 rounded-lg", channelFilter === 'unread' ? "bg-ninja-yellow text-ninja-dark" : "text-gray-500 hover:bg-gray-100")}>Unread</button>
                <div className="w-px h-4 bg-gray-200 mx-1 self-center" />
                <button onClick={() => setChannelFilter('whatsapp')} className={cn("p-1.5 rounded-lg transition-colors flex-shrink-0", channelFilter === 'whatsapp' ? "bg-green-100 text-green-600" : "text-gray-400 hover:bg-green-50/50 hover:text-green-500")} title="WhatsApp"><MessageCircle size={14} /></button>
                <button onClick={() => setChannelFilter('instagram')} className={cn("p-1.5 rounded-lg transition-colors flex-shrink-0", channelFilter === 'instagram' ? "bg-pink-100 text-pink-600" : "text-gray-400 hover:bg-pink-50/50 hover:text-pink-500")} title="Instagram"><Instagram size={14} /></button>
                <button onClick={() => setChannelFilter('messenger')} className={cn("p-1.5 rounded-lg transition-colors flex-shrink-0", channelFilter === 'messenger' ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:bg-blue-50/50 hover:text-blue-500")} title="Messenger"><MessageSquare size={14} /></button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredConversations.map((chat) => (
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
                  <Button variant="ghost" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 h-8 bg-ninja-yellow/10 text-ninja-dark hover:bg-ninja-yellow/20 rounded-lg mr-2" onClick={() => toast.success('Conversation marked as read')}>
                    <span className="text-[10px] font-bold uppercase tracking-wide cursor-pointer">Mark as Read</span>
                  </Button>
                  <Button variant="ghost" className="p-2 rounded-full h-9 w-9 md:h-10 md:w-10 flex items-center justify-center" onClick={() => toast.success('Initiating call...')}>
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
                  <div className="relative group">
                    <Button variant="ghost" className="p-2 rounded-full h-9 w-9 md:h-10 md:w-10 flex items-center justify-center">
                      <MoreVertical size={18} className="md:w-5 md:h-5 text-gray-400" />
                    </Button>
                    {/* Fake Dropdown for "Create Contact" */}
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white shadow-xl border border-gray-100 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50 py-2">
                      <button onClick={() => toast.success('Opening contact creation flow...')} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-600">
                        <UserPlus size={14} /> Create Contact
                      </button>
                    </div>
                  </div>
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

              <div className="p-4 md:p-5 border-t border-gray-100 bg-white">
                <div className="bg-gray-50 rounded-2xl p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2 border border-gray-100 focus-within:border-ninja-yellow transition-colors shadow-inner">
                  <button onClick={() => toast.success('Opening file picker for documents...')} className="p-1.5 md:p-2 text-gray-400 hover:text-ninja-dark transition-colors" title="Attach Document">
                    <FilePlus size={20} />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    disabled={isSending}
                    className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm p-1.5 md:p-2 disabled:opacity-50"
                  />
                  <button className="hidden sm:block p-2 text-gray-400 hover:text-ninja-dark transition-colors">
                    <Smile size={20} />
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    disabled={isSending || !messageText.trim()}
                    className="bg-ninja-yellow p-2 md:p-2.5 rounded-xl text-ninja-dark shadow-sm transition-transform active:scale-90 disabled:opacity-50 disabled:active:scale-100"
                  >
                    <Send size={18} className={cn("md:w-5 md:h-5", isSending && "animate-pulse")} />
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
              <h3 className="text-lg md:text-xl font-bold text-ninja-dark text-center leading-tight">{activeChat.contactName}</h3>
              <p className="text-[11px] text-gray-400 font-medium mb-4">Acme Corp</p>

              <div className="w-full mt-2 space-y-4">
                <div className="flex flex-col gap-1.5 border-b border-gray-50 pb-4">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-1">Contact Info</span>
                  <div className="flex flex-col gap-1.5 px-1 mt-1">
                    <div className="flex items-center gap-2 text-sm text-ninja-dark font-medium truncate">
                      <Mail size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">contact@example.com</span>
                    </div>
                    <div className="flex items-center justify-between group h-8 rounded-lg hover:bg-gray-50 -mx-2 px-2 transition-colors">
                      <div className="flex items-center gap-2 text-sm text-ninja-dark font-medium">
                        <Phone size={14} className="text-gray-400 flex-shrink-0" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <button onClick={() => toast.success('Initiating call...')} className="text-ninja-yellow opacity-0 group-hover:opacity-100 transition-opacity bg-ninja-yellow/10 p-1.5 rounded-lg hover:scale-105 active:scale-95" title="Call">
                        <Phone size={12} className="text-ninja-dark" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-gray-50 pb-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Conversation Labels</span>
                    <button onClick={() => toast.success('Add label dialog...')} className="text-[10px] font-bold text-ninja-yellow hover:underline py-1"><Plus size={10} className="inline mr-0.5" />Add</button>
                  </div>
                  <div className="px-1 flex flex-wrap gap-1.5 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Need Follow-up
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-pink-50 text-pink-600 px-2 py-1 rounded-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500" /> VIP
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-gray-50 pb-4">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-1">Opportunity Rating</span>
                  <div className="px-1 flex items-center gap-1 mt-1 text-ninja-yellow">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} fill={star <= 4 ? "currentColor" : "none"} className={star <= 4 ? "text-ninja-yellow" : "text-gray-200"} />
                    ))}
                    <span className="text-[10px] text-gray-400 font-bold ml-2">Hot</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-gray-50 pb-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Opportunity Value</span>
                    <button onClick={() => toast.success('Opening Create Opportunity form...')} className="text-[10px] font-bold text-white bg-ninja-dark hover:bg-gray-800 transition-colors px-2 py-1 rounded-md shadow-sm">+ Create</button>
                  </div>
                  <div className="px-1 flex items-center gap-2 mt-1">
                    <span className="text-xl font-black text-ninja-dark">$45,000</span>
                    <button onClick={() => toast.success('Editing deal details...')} className="text-[10px] font-bold text-ninja-yellow hover:underline ml-auto bg-ninja-yellow/10 px-2 py-1 rounded-md">Edit</button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-gray-50 pb-4">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-1">Status</span>
                  <div className="px-1 mt-1">
                    <Badge status="Qualified" className="bg-ninja-yellow text-ninja-dark border-none shadow-sm pb-1 font-bold block w-fit">Hot Prospect</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pb-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tags</span>
                    <button onClick={() => toast.success('Opening Tag manager...')} className="text-[10px] font-bold text-ninja-yellow hover:underline py-1"><Plus size={10} className="inline mr-0.5" />Add</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1 px-1">
                    <span className="px-2 py-1 bg-white border border-gray-200 shadow-sm text-gray-600 font-bold text-[9px] rounded uppercase">Enterprise</span>
                    <span className="px-2 py-1 bg-white border border-gray-200 shadow-sm text-gray-600 font-bold text-[9px] rounded uppercase">SaaS</span>
                  </div>
                </div>
              </div>

              <div className="w-full mt-auto pt-10 border-gray-50">
                <div className="flex justify-around border-t border-gray-100 pt-6">
                  <Button variant="ghost" className="text-xs flex flex-col items-center gap-1 p-2 h-auto">
                    <span className="font-bold">Details</span>
                    <div className="h-1 w-1 rounded-full bg-ninja-yellow" />
                  </Button>
                  <Button variant="ghost" onClick={() => toast.success('Opening Contact Notes...')} className="text-xs flex flex-col items-center gap-1 p-2 h-auto text-gray-400 hover:text-ninja-dark">
                    <span className="font-bold">Notes</span>
                  </Button>
                  <Button variant="ghost" onClick={() => toast.success('Loading activity stream...')} className="text-xs flex flex-col items-center gap-1 p-2 h-auto text-gray-400 hover:text-ninja-dark">
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
