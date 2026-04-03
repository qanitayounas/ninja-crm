import type { Contact, Task } from '../types';
import type { Pipeline } from '../data/pipelineData';

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // Authentication & Session
  async login(email: string, password: string, remember: boolean = false): Promise<any> {
    if (email === 'qanitayounas973@gmail.com' && password === 'Qanita@123') {
      const userData = { email, name: 'Qanita Younas', role: 'admin' };
      const storage = remember ? localStorage : sessionStorage;
      
      storage.setItem('ninja_crm_user', JSON.stringify(userData));
      storage.setItem('ninja_crm_session_active', 'true');
      localStorage.setItem('ninja_crm_remember_me', remember.toString());
      
      return userData;
    }
    throw new Error('Invalid credentials');
  }

  logout() {
    localStorage.removeItem('ninja_crm_user');
    localStorage.removeItem('ninja_crm_session_active');
    localStorage.removeItem('ninja_crm_remember_me');
    sessionStorage.removeItem('ninja_crm_user');
    sessionStorage.removeItem('ninja_crm_session_active');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('ninja_crm_session_active') === 'true' || 
           sessionStorage.getItem('ninja_crm_session_active') === 'true';
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      
      return (data.contacts || []).map((c: any) => ({
        id: c.id,
        name: `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'No Name',
        email: c.email || '',
        phone: c.phone || '',
        status: (c.type === 'lead' ? 'Lead' : 'Qualified') as any,
        tags: c.tags || [],
        source: 'SMS',
        date: new Date(c.dateAdded).toLocaleDateString(),
        avatar: `https://ui-avatars.com/api/?name=${c.firstName}+${c.lastName}&background=random`
      }));
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }

  // Pipelines
  async getPipelines(): Promise<Pipeline[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/pipelines`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { 
          status: response.status, 
          message: 'Failed to fetch pipelines', 
          providerError: errorData.ghlError || errorData.details?.message 
        };
      }
      const data = await response.json();
      
      return (data.pipelines || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        stages: (p.stages || []).map((s: any) => ({
          id: s.id,
          title: s.name,
          count: 0,
          totalValue: 0,
          color: '#3b82f6',
          deals: []
        }))
      }));
    } catch (error: any) {
      console.error('Error fetching pipelines:', error);
      throw error;
    }
  }

  async createPipeline(name: string, stages: string[]): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/pipelines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, stages })
      });
      if (!response.ok) throw new Error('Failed to create pipeline');
      return await response.json();
    } catch (error) {
      console.error('Error creating pipeline:', error);
      throw error;
    }
  }

  // Opportunities
  async getOpportunities(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/opportunities`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { 
          status: response.status, 
          message: 'Failed to fetch opportunities', 
          providerError: errorData.ghlError || errorData.details?.message 
        };
      }
      const data = await response.json();
      return data.opportunities || [];
    } catch (error: any) {
      console.error('Error fetching opportunities:', error);
      throw error;
    }
  }

  // Tasks (Local Backend)
  async getTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      return data.tasks || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  async createTask(task: Partial<Task>): Promise<Task> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      if (!response.ok) throw new Error('Failed to create task');
      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update task');
      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete task');
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // Appointments
  async getAppointments(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { 
          status: response.status, 
          message: 'Failed to fetch appointments', 
          providerError: errorData.ghlError || errorData.details?.message 
        };
      }
      const data = await response.json();
      return data.events || data.appointments || [];
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  // Conversations
  async getConversations(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations`);
      if (!response.ok) throw new Error('Failed to fetch conversations');
      const data = await response.json();
      
      return (data.conversations || []).map((c: any) => ({
        id: c.id,
        contactId: c.contactId,
        contactName: 'Loading...',
        lastMessage: c.lastMessageBody || 'No messages',
        unreadCount: c.unreadCount || 0,
        timestamp: c.dateUpdated || c.dateAdded,
        channel: (c.type === 'sms' ? 'SMS' : 'Messenger') as any,
        status: 'online',
        avatar: `https://ui-avatars.com/api/?name=Contact&background=random`,
        messages: []
      }));
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  }

  async getMessages(conversationId: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      
      const messages = Array.isArray(data.messages) ? data.messages : [];
      
      return messages.map((m: any) => ({
        id: m.id,
        text: m.body || '',
        isMe: m.direction === 'outbound',
        timestamp: m.dateAdded ? new Date(m.dateAdded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        date: m.dateAdded
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  async sendMessage(conversationId: string, body: string, contactId: string, type: 'SMS' | 'Email' = 'SMS'): Promise<any> {
    try {
      const payload: any = {
        type,
        contactId,
        conversationId
      };

      if (type === 'SMS') {
        payload.body = body;
      } else {
        payload.emailSubject = 'Message from Ninja CRM';
        payload.html = `<p>${body}</p>`;
      }

      const response = await fetch(`${API_BASE_URL}/conversations/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Users
  async getUsers(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      
      return (data.users || []).map((u: any) => ({
        id: u.id,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name,
        email: u.email,
        role: u.role === 'admin' ? 'admin' : 'user',
        status: 'Active',
        avatar: `https://ui-avatars.com/api/?name=${u.firstName}+${u.lastName}&background=random`
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard`);
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return null;
    }
  }

  // Workflows
  async getWorkflows(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { 
          status: response.status, 
          message: 'Failed to fetch workflows', 
          providerError: errorData.ghlError || errorData.details?.message 
        };
      }
      const data = await response.json();
      return data.workflows || [];
    } catch (error: any) {
      console.error('Error fetching workflows:', error);
      throw error;
    }
  }

  // Reviews
  async getReviews(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      return data.reviews || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }

  // Sites - Funnels
  async getFunnels(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/sites/funnels`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { 
          status: response.status, 
          message: 'Failed to fetch funnels', 
          providerError: errorData.ghlError || errorData.details?.message 
        };
      }
      const data = await response.json();
      return data.funnels || [];
    } catch (error: any) {
      console.error('Error fetching funnels:', error);
      throw error;
    }
  }

  // Sites - Forms
  async getForms(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/sites/forms`);
      if (!response.ok) throw new Error('Failed to fetch forms');
      const data = await response.json();
      return data.forms || [];
    } catch (error) {
      console.error('Error fetching forms:', error);
      return [];
    }
  }

  // Sites - Surveys
  async getSurveys(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/sites/surveys`);
      if (!response.ok) throw new Error('Failed to fetch surveys');
      const data = await response.json();
      return data.surveys || [];
    } catch (error) {
      console.error('Error fetching surveys:', error);
      return [];
    }
  }

  // Billing - Transactions
  async getTransactions(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/transactions`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { 
          status: response.status, 
          message: 'Failed to fetch transactions', 
          providerError: errorData.ghlError || errorData.details?.message 
        };
      }
      const data = await response.json();
      return data.orders || data.transactions || [];
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  // SchoolPro - Courses
  async getCourses(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/school/courses`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      return data.courses || [];
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  // Marketing - Campaigns
  async getCampaigns(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/marketing/campaigns`);
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      const data = await response.json();
      return data.campaigns || [];
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return [];
    }
  }

  // Smart Lists
  async getSmartLists(): Promise<any[]> {
    return [];
  }

  async createSmartList(name: string, description: string, filters: any[]): Promise<any> {
    return { id: `list-${Date.now()}`, name, description, filters };
  }
}

export const apiService = new ApiService();


