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

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'To Do' | 'In Progress' | 'Review' | 'Completed';
export type TaskCategory = 'assigned' | 'created' | 'team';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId: string; // User ID
  creatorId: string;  // User ID
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  contactId?: string; // Optional related contact
}

export interface TaskFilter {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assigneeId?: string;
  creatorId?: string;
  search?: string;
}
