export type ContactStatus = 'Qualified' | 'Pending' | 'Archived' | 'Lead';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: ContactStatus;
  tags: string[];
  source: 'WhatsApp' | 'Instagram' | 'Messenger' | 'SMS';
  date: string;
  avatar?: string;
  company?: string;
  owner?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
  channel: 'WhatsApp' | 'Instagram' | 'Messenger' | 'SMS';
  status: 'online' | 'offline';
  avatar?: string;
  messages: Message[];
}

export interface KPICard {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
}

export interface Subaccount {
  id: string;
  name: string;
  logo?: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Paused' | 'Past Due';
  mrr: number;
  contactsCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'Active' | 'Inactive';
  avatar?: string;
}
