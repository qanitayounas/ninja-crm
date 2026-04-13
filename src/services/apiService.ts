import type { Contact, Task } from '../types';
import type { Pipeline } from '../data/pipelineData';

const API_BASE_URL = 'http://localhost:5000/api';

// Get stored JWT token
function getAuthToken(): string | null {
  return localStorage.getItem('ninja_crm_token') || sessionStorage.getItem('ninja_crm_token');
}

// Build auth headers
function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// Generic fetch helpers
async function get<T = any>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers: authHeaders() });
  if (res.status === 401) {
    apiService.logout();
    window.location.href = '/login';
    throw { status: 401, message: 'Session expired' };
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, message: `GET ${path} failed`, providerError: err.details?.message || err.error };
  }
  return res.json();
}

async function post<T = any>(path: string, body?: any): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401) {
    apiService.logout();
    window.location.href = '/login';
    throw { status: 401, message: 'Session expired' };
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, message: `POST ${path} failed`, providerError: err.details?.message || err.error };
  }
  return res.json();
}

async function put<T = any>(path: string, body?: any): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401) {
    apiService.logout();
    window.location.href = '/login';
    throw { status: 401, message: 'Session expired' };
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, message: `PUT ${path} failed`, providerError: err.details?.message || err.error };
  }
  return res.json();
}

async function del<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { method: 'DELETE', headers: authHeaders() });
  if (res.status === 401) {
    apiService.logout();
    window.location.href = '/login';
    throw { status: 401, message: 'Session expired' };
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, message: `DELETE ${path} failed`, providerError: err.details?.message || err.error };
  }
  return res.json();
}

class ApiService {

  // ========================
  // Authentication & Session (local)
  // ========================

  // Get GHL OAuth authorization URL
  async getOAuthUrl(locationId: string): Promise<string> {
    const res = await fetch(`${API_BASE_URL}/auth/ghl/authorize?locationId=${encodeURIComponent(locationId)}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.authUrl;
  }

  // Try to reconnect with existing account (no OAuth needed)
  async reconnect(identifier: string): Promise<{ token: string; name: string } | null> {
    // Check if it's an email or locationId
    const isEmail = identifier.includes('@');
    const body = isEmail ? { email: identifier } : { locationId: identifier };

    const res = await fetch(`${API_BASE_URL}/auth/reconnect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.error === 'not_found') return null;
    if (data.token) return data;
    return null;
  }

  // Handle OAuth callback - store JWT token from backend
  handleOAuthCallback(token: string, name: string, remember: boolean = true): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('ninja_crm_token', token);
    storage.setItem('ninja_crm_user', JSON.stringify({ name, role: 'admin' }));
    storage.setItem('ninja_crm_session_active', 'true');
    localStorage.setItem('ninja_crm_remember_me', remember.toString());
  }

  // Legacy email/password login (kept for backwards compatibility)
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
    localStorage.removeItem('ninja_crm_token');
    localStorage.removeItem('ninja_crm_user');
    localStorage.removeItem('ninja_crm_session_active');
    localStorage.removeItem('ninja_crm_remember_me');
    sessionStorage.removeItem('ninja_crm_token');
    sessionStorage.removeItem('ninja_crm_user');
    sessionStorage.removeItem('ninja_crm_session_active');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('ninja_crm_session_active') === 'true' ||
           sessionStorage.getItem('ninja_crm_session_active') === 'true';
  }

  // Get current session info from backend
  async getSessionInfo(): Promise<any> {
    return get('/auth/me');
  }

  // ========================
  // Dashboard
  // ========================

  async getDashboardStats(): Promise<any> {
    try { return await get('/dashboard'); }
    catch { return null; }
  }

  // ========================
  // CONTACTS
  // ========================

  async getContacts(params?: Record<string, string>): Promise<Contact[]> {
    try {
      const data = await get('/contacts', params);
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
    } catch { return []; }
  }

  async getContact(id: string): Promise<any> {
    return get(`/contacts/${id}`);
  }

  async searchContacts(query: string): Promise<any> {
    return get('/contacts/search', { query });
  }

  async createContact(data: any): Promise<any> {
    return post('/contacts', data);
  }

  async updateContact(id: string, data: any): Promise<any> {
    return put(`/contacts/${id}`, data);
  }

  async deleteContact(id: string): Promise<any> {
    return del(`/contacts/${id}`);
  }

  async upsertContact(data: any): Promise<any> {
    return post('/contacts/upsert', data);
  }

  // Contact Tags
  async addContactTag(contactId: string, tags: string[]): Promise<any> {
    return post(`/contacts/${contactId}/tags`, { tags });
  }

  async removeContactTag(contactId: string, _tags: string[]): Promise<any> {
    return del(`/contacts/${contactId}/tags`);
  }

  // Contact Notes
  async getContactNotes(contactId: string): Promise<any> {
    return get(`/contacts/${contactId}/notes`);
  }

  async createContactNote(contactId: string, body: string): Promise<any> {
    return post(`/contacts/${contactId}/notes`, { body });
  }

  async updateContactNote(contactId: string, noteId: string, body: string): Promise<any> {
    return put(`/contacts/${contactId}/notes/${noteId}`, { body });
  }

  async deleteContactNote(contactId: string, noteId: string): Promise<any> {
    return del(`/contacts/${contactId}/notes/${noteId}`);
  }

  // Contact Tasks
  async getContactTasks(contactId: string): Promise<any> {
    return get(`/contacts/${contactId}/tasks`);
  }

  async createContactTask(contactId: string, data: any): Promise<any> {
    return post(`/contacts/${contactId}/tasks`, data);
  }

  async updateContactTask(contactId: string, taskId: string, data: any): Promise<any> {
    return put(`/contacts/${contactId}/tasks/${taskId}`, data);
  }

  async deleteContactTask(contactId: string, taskId: string): Promise<any> {
    return del(`/contacts/${contactId}/tasks/${taskId}`);
  }

  // Contact Appointments
  async getContactAppointments(contactId: string): Promise<any> {
    return get(`/contacts/${contactId}/appointments`);
  }

  // Contact Campaigns
  async addContactToCampaign(contactId: string, campaignId: string): Promise<any> {
    return post(`/contacts/${contactId}/campaigns/add`, { campaignId });
  }

  async removeContactFromCampaign(contactId: string, campaignId: string): Promise<any> {
    return post(`/contacts/${contactId}/campaigns/remove`, { campaignId });
  }

  // Contact Workflows
  async addContactToWorkflow(contactId: string, workflowId: string, eventStartTime?: string): Promise<any> {
    return post(`/contacts/${contactId}/workflow/${workflowId}`, { eventStartTime });
  }

  async removeContactFromWorkflow(contactId: string, workflowId: string): Promise<any> {
    return del(`/contacts/${contactId}/workflow/${workflowId}`);
  }

  // Smart Lists (local)
  async getSmartLists(): Promise<any[]> { return []; }
  async createSmartList(name: string, description: string, filters: any[]): Promise<any> {
    return { id: `list-${Date.now()}`, name, description, filters };
  }

  // ========================
  // CONVERSATIONS & MESSAGES
  // ========================

  async getConversations(): Promise<any[]> {
    try {
      const data = await get('/conversations');
      return (data.conversations || []).map((c: any) => {
        const name = c.fullName || c.contactName || c.email || 'Unknown';
        const ts = c.lastMessageDate || c.dateUpdated || c.dateAdded;
        const d = ts ? new Date(typeof ts === 'number' ? ts : ts) : null;
        const timeStr = d ? d.toLocaleDateString() : '';
        return {
          id: c.id,
          contactId: c.contactId,
          contactName: name,
          lastMessage: c.lastMessageBody || c.lastMessageType?.replace('TYPE_', '').replace(/_/g, ' ').toLowerCase() || 'No messages',
          unreadCount: c.unreadCount || 0,
          timestamp: timeStr,
          channel: (c.type === 'TYPE_PHONE' || c.type === 'sms' ? 'SMS' :
                    c.type === 'TYPE_EMAIL' || c.type === 'email' ? 'Email' :
                    c.type === 'TYPE_FB_MESSENGER' ? 'Messenger' :
                    c.type === 'TYPE_INSTAGRAM' ? 'Instagram' : 'SMS') as any,
          status: 'online',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
          messages: []
        };
      });
    } catch { return []; }
  }

  async getConversation(id: string): Promise<any> {
    return get(`/conversations/${id}`);
  }

  async createConversation(data: any): Promise<any> {
    return post('/conversations', data);
  }

  async updateConversation(id: string, data: any): Promise<any> {
    return put(`/conversations/${id}`, data);
  }

  async deleteConversation(id: string): Promise<any> {
    return del(`/conversations/${id}`);
  }

  async getMessages(conversationId: string): Promise<any[]> {
    try {
      const data = await get(`/conversations/${conversationId}/messages`);
      return (Array.isArray(data.messages) ? data.messages : []).map((m: any) => ({
        id: m.id,
        text: m.body || '',
        isMe: m.direction === 'outbound',
        timestamp: m.dateAdded ? new Date(m.dateAdded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        date: m.dateAdded
      }));
    } catch { return []; }
  }

  async sendMessage(conversationId: string, body: string, contactId: string, type: 'SMS' | 'Email' = 'SMS'): Promise<any> {
    const payload: any = { type, contactId, conversationId };
    if (type === 'SMS') payload.body = body;
    else { payload.emailSubject = 'Message from Ninja CRM'; payload.html = `<p>${body}</p>`; }
    return post('/conversations/messages', payload);
  }

  async getMessage(messageId: string): Promise<any> {
    return get(`/conversations/messages/${messageId}`);
  }

  async cancelScheduledMessage(messageId: string): Promise<any> {
    return del(`/conversations/messages/${messageId}/schedule`);
  }

  async updateMessageStatus(messageId: string, status: string): Promise<any> {
    return put(`/conversations/messages/${messageId}/status`, { status });
  }

  // ========================
  // USERS / TEAM
  // ========================

  async getUsers(): Promise<any[]> {
    try {
      const data = await get('/users');
      return (data.users || []).map((u: any) => ({
        id: u.id,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name,
        email: u.email,
        role: u.role === 'admin' ? 'admin' : 'user',
        status: 'Active',
        avatar: `https://ui-avatars.com/api/?name=${u.firstName}+${u.lastName}&background=random`
      }));
    } catch { return []; }
  }

  async getUser(id: string): Promise<any> {
    return get(`/users/${id}`);
  }

  async createUser(data: any): Promise<any> {
    return post('/users', data);
  }

  async updateUser(id: string, data: any): Promise<any> {
    return put(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<any> {
    return del(`/users/${id}`);
  }

  // ========================
  // PIPELINES & OPPORTUNITIES
  // ========================

  async getPipelines(): Promise<Pipeline[]> {
    try {
      const data = await get('/opportunities/pipelines');
      return (data.pipelines || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        stages: (p.stages || []).map((s: any) => ({
          id: s.id, title: s.name, count: 0, totalValue: 0, color: '#3b82f6', deals: []
        }))
      }));
    } catch (error: any) { throw error; }
  }

  async getPipeline(id: string): Promise<any> {
    return get(`/opportunities/pipelines/${id}`);
  }

  async createPipeline(name: string, stages: string[]): Promise<any> {
    return post('/opportunities/pipelines', { name, stages });
  }

  async updatePipeline(id: string, data: any): Promise<any> {
    return put(`/opportunities/pipelines/${id}`, data);
  }

  async deletePipeline(id: string): Promise<any> {
    return del(`/opportunities/pipelines/${id}`);
  }

  async getOpportunities(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/opportunities', params);
      return data.opportunities || [];
    } catch (error: any) { throw error; }
  }

  async getOpportunity(id: string): Promise<any> {
    return get(`/opportunities/${id}`);
  }

  async createOpportunity(data: any): Promise<any> {
    return post('/opportunities', data);
  }

  async updateOpportunity(id: string, data: any): Promise<any> {
    return put(`/opportunities/${id}`, data);
  }

  async deleteOpportunity(id: string): Promise<any> {
    return del(`/opportunities/${id}`);
  }

  async updateOpportunityStatus(id: string, status: string): Promise<any> {
    return put(`/opportunities/${id}/status`, { status });
  }

  async upsertOpportunity(data: any): Promise<any> {
    return post('/opportunities/upsert', data);
  }

  // ========================
  // CALENDARS & EVENTS
  // ========================

  async getCalendars(): Promise<any[]> {
    try {
      const data = await get('/calendars');
      return data.calendars || [];
    } catch { return []; }
  }

  async getCalendar(id: string): Promise<any> {
    return get(`/calendars/${id}`);
  }

  async createCalendar(data: any): Promise<any> {
    return post('/calendars', data);
  }

  async updateCalendar(id: string, data: any): Promise<any> {
    return put(`/calendars/${id}`, data);
  }

  async deleteCalendar(id: string): Promise<any> {
    return del(`/calendars/${id}`);
  }

  async getCalendarFreeSlots(calendarId: string, params: Record<string, string>): Promise<any> {
    return get(`/calendars/${calendarId}/free-slots`, params);
  }

  // Calendar Events
  async getAppointments(): Promise<any[]> {
    try {
      const data = await get('/appointments');
      return data.events || data.appointments || [];
    } catch (error: any) { throw error; }
  }

  async getCalendarEvents(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/calendars/events', params);
      return data.events || [];
    } catch { return []; }
  }

  async getCalendarEvent(eventId: string): Promise<any> {
    return get(`/calendars/events/${eventId}`);
  }

  async createCalendarEvent(data: any): Promise<any> {
    return post('/calendars/events', data);
  }

  async updateCalendarEvent(eventId: string, data: any): Promise<any> {
    return put(`/calendars/events/${eventId}`, data);
  }

  async deleteCalendarEvent(eventId: string): Promise<any> {
    return del(`/calendars/events/${eventId}`);
  }

  // Calendar Groups
  async getCalendarGroups(): Promise<any[]> {
    try {
      const data = await get('/calendars/groups');
      return data.groups || [];
    } catch { return []; }
  }

  async createCalendarGroup(data: any): Promise<any> {
    return post('/calendars/groups', data);
  }

  async updateCalendarGroup(groupId: string, data: any): Promise<any> {
    return put(`/calendars/groups/${groupId}`, data);
  }

  async deleteCalendarGroup(groupId: string): Promise<any> {
    return del(`/calendars/groups/${groupId}`);
  }

  // Calendar Resources
  async getCalendarResources(): Promise<any[]> {
    try {
      const data = await get('/calendars/resources');
      return data.resources || [];
    } catch { return []; }
  }

  async getCalendarResource(resourceId: string): Promise<any> {
    return get(`/calendars/resources/${resourceId}`);
  }

  async createCalendarResource(data: any): Promise<any> {
    return post('/calendars/resources', data);
  }

  async updateCalendarResource(resourceId: string, data: any): Promise<any> {
    return put(`/calendars/resources/${resourceId}`, data);
  }

  async deleteCalendarResource(resourceId: string): Promise<any> {
    return del(`/calendars/resources/${resourceId}`);
  }

  // ========================
  // PAYMENTS & FINANCE
  // ========================

  // Orders
  async getOrders(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/payments/orders', params);
      return data.orders || [];
    } catch { return []; }
  }

  async getOrder(id: string): Promise<any> {
    return get(`/payments/orders/${id}`);
  }

  async createOrder(data: any): Promise<any> {
    return post('/payments/orders', data);
  }

  async collectPayment(orderId: string, data: any): Promise<any> {
    return post(`/payments/orders/${orderId}/collect`, data);
  }

  // Transactions
  async getTransactions(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/payments/transactions', params);
      return data.transactions || data.orders || [];
    } catch (error: any) { throw error; }
  }

  async getTransaction(id: string): Promise<any> {
    return get(`/payments/transactions/${id}`);
  }

  // Subscriptions
  async getSubscriptions(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/payments/subscriptions', params);
      return data.subscriptions || [];
    } catch { return []; }
  }

  async getSubscription(id: string): Promise<any> {
    return get(`/payments/subscriptions/${id}`);
  }

  // Payment Integrations
  async getPaymentIntegrations(): Promise<any[]> {
    try {
      const data = await get('/payments/integrations');
      return data.integrations || [];
    } catch { return []; }
  }

  async createPaymentIntegration(data: any): Promise<any> {
    return post('/payments/integrations', data);
  }

  // Coupons
  async getCoupons(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/payments/coupons', params);
      return data.coupons || [];
    } catch { return []; }
  }

  async getCoupon(id: string): Promise<any> {
    return get(`/payments/coupons/${id}`);
  }

  async createCoupon(data: any): Promise<any> {
    return post('/payments/coupons', data);
  }

  async updateCoupon(id: string, data: any): Promise<any> {
    return put(`/payments/coupons/${id}`, data);
  }

  async deleteCoupon(id: string): Promise<any> {
    return del(`/payments/coupons/${id}`);
  }

  // Custom Payment Providers
  async getCustomPaymentProviders(): Promise<any[]> {
    try {
      const data = await get('/payments/custom-providers');
      return data.providers || [];
    } catch { return []; }
  }

  async createCustomPaymentProvider(data: any): Promise<any> {
    return post('/payments/custom-providers', data);
  }

  async deleteCustomPaymentProvider(id: string): Promise<any> {
    return del(`/payments/custom-providers/${id}`);
  }

  // ========================
  // INVOICES
  // ========================

  async getInvoices(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/invoices', params);
      return data.invoices || [];
    } catch { return []; }
  }

  async getInvoice(id: string): Promise<any> {
    return get(`/invoices/${id}`);
  }

  async createInvoice(data: any): Promise<any> {
    return post('/invoices', data);
  }

  async updateInvoice(id: string, data: any): Promise<any> {
    return put(`/invoices/${id}`, data);
  }

  async deleteInvoice(id: string): Promise<any> {
    return del(`/invoices/${id}`);
  }

  async voidInvoice(id: string): Promise<any> {
    return post(`/invoices/${id}/void`);
  }

  async sendInvoice(id: string, data: any): Promise<any> {
    return post(`/invoices/${id}/send`, data);
  }

  async recordInvoicePayment(id: string, data: any): Promise<any> {
    return post(`/invoices/${id}/record-payment`, data);
  }

  // Invoice Schedules
  async getInvoiceSchedules(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/invoices/schedule', params);
      return data.schedules || [];
    } catch { return []; }
  }

  async getInvoiceSchedule(scheduleId: string): Promise<any> {
    return get(`/invoices/schedule/${scheduleId}`);
  }

  async createInvoiceSchedule(data: any): Promise<any> {
    return post('/invoices/schedule', data);
  }

  async updateInvoiceSchedule(scheduleId: string, data: any): Promise<any> {
    return put(`/invoices/schedule/${scheduleId}`, data);
  }

  async deleteInvoiceSchedule(scheduleId: string): Promise<any> {
    return del(`/invoices/schedule/${scheduleId}`);
  }

  // Invoice Templates
  async getInvoiceTemplates(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/invoices/template', params);
      return data.templates || [];
    } catch { return []; }
  }

  async getInvoiceTemplate(templateId: string): Promise<any> {
    return get(`/invoices/template/${templateId}`);
  }

  async createInvoiceTemplate(data: any): Promise<any> {
    return post('/invoices/template', data);
  }

  async updateInvoiceTemplate(templateId: string, data: any): Promise<any> {
    return put(`/invoices/template/${templateId}`, data);
  }

  async deleteInvoiceTemplate(templateId: string): Promise<any> {
    return del(`/invoices/template/${templateId}`);
  }

  // Estimates
  async getEstimates(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/invoices/estimate', params);
      return data.estimates || [];
    } catch { return []; }
  }

  async getEstimate(estimateId: string): Promise<any> {
    return get(`/invoices/estimate/${estimateId}`);
  }

  async createEstimate(data: any): Promise<any> {
    return post('/invoices/estimate', data);
  }

  async updateEstimate(estimateId: string, data: any): Promise<any> {
    return put(`/invoices/estimate/${estimateId}`, data);
  }

  async deleteEstimate(estimateId: string): Promise<any> {
    return del(`/invoices/estimate/${estimateId}`);
  }

  // ========================
  // PRODUCTS & E-COMMERCE
  // ========================

  async getProducts(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/products', params);
      return data.products || [];
    } catch { return []; }
  }

  async getProduct(id: string): Promise<any> {
    return get(`/products/${id}`);
  }

  async createProduct(data: any): Promise<any> {
    return post('/products', data);
  }

  async updateProduct(id: string, data: any): Promise<any> {
    return put(`/products/${id}`, data);
  }

  async deleteProduct(id: string): Promise<any> {
    return del(`/products/${id}`);
  }

  // Product Prices
  async getProductPrices(productId: string): Promise<any[]> {
    try {
      const data = await get(`/products/${productId}/prices`);
      return data.prices || [];
    } catch { return []; }
  }

  async getProductPrice(productId: string, priceId: string): Promise<any> {
    return get(`/products/${productId}/prices/${priceId}`);
  }

  async createProductPrice(productId: string, data: any): Promise<any> {
    return post(`/products/${productId}/prices`, data);
  }

  async updateProductPrice(productId: string, priceId: string, data: any): Promise<any> {
    return put(`/products/${productId}/prices/${priceId}`, data);
  }

  async deleteProductPrice(productId: string, priceId: string): Promise<any> {
    return del(`/products/${productId}/prices/${priceId}`);
  }

  // Product Collections
  async getProductCollections(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/products/collections', params);
      return data.collections || [];
    } catch { return []; }
  }

  async getProductCollection(collectionId: string): Promise<any> {
    return get(`/products/collections/${collectionId}`);
  }

  async createProductCollection(data: any): Promise<any> {
    return post('/products/collections', data);
  }

  async updateProductCollection(collectionId: string, data: any): Promise<any> {
    return put(`/products/collections/${collectionId}`, data);
  }

  async deleteProductCollection(collectionId: string): Promise<any> {
    return del(`/products/collections/${collectionId}`);
  }

  // ========================
  // LOCATIONS & CRM CONFIG
  // ========================

  async getLocation(): Promise<any> {
    return get('/locations');
  }

  async updateLocation(data: any): Promise<any> {
    return put('/locations', data);
  }

  // Custom Fields
  async getCustomFields(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/locations/custom-fields', params);
      return data.customFields || [];
    } catch { return []; }
  }

  async getCustomField(id: string): Promise<any> {
    return get(`/locations/custom-fields/${id}`);
  }

  async createCustomField(data: any): Promise<any> {
    return post('/locations/custom-fields', data);
  }

  async updateCustomField(id: string, data: any): Promise<any> {
    return put(`/locations/custom-fields/${id}`, data);
  }

  async deleteCustomField(id: string): Promise<any> {
    return del(`/locations/custom-fields/${id}`);
  }

  // Custom Values
  async getCustomValues(): Promise<any[]> {
    try {
      const data = await get('/locations/custom-values');
      return data.customValues || [];
    } catch { return []; }
  }

  async createCustomValue(data: any): Promise<any> {
    return post('/locations/custom-values', data);
  }

  async updateCustomValue(id: string, data: any): Promise<any> {
    return put(`/locations/custom-values/${id}`, data);
  }

  async deleteCustomValue(id: string): Promise<any> {
    return del(`/locations/custom-values/${id}`);
  }

  // Tags
  async getTags(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/locations/tags', params);
      return data.tags || [];
    } catch { return []; }
  }

  async getTag(id: string): Promise<any> {
    return get(`/locations/tags/${id}`);
  }

  async createTag(data: any): Promise<any> {
    return post('/locations/tags', data);
  }

  async updateTag(id: string, data: any): Promise<any> {
    return put(`/locations/tags/${id}`, data);
  }

  async deleteTag(id: string): Promise<any> {
    return del(`/locations/tags/${id}`);
  }

  // Templates
  async getLocationTemplates(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/locations/templates', params);
      return data.templates || [];
    } catch { return []; }
  }

  // Location Tasks
  async getLocationTasks(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/locations/tasks', params);
      return data.tasks || [];
    } catch { return []; }
  }

  // ========================
  // BUSINESSES
  // ========================

  async getBusinesses(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/businesses', params);
      return data.businesses || [];
    } catch { return []; }
  }

  async getBusiness(id: string): Promise<any> {
    return get(`/businesses/${id}`);
  }

  async createBusiness(data: any): Promise<any> {
    return post('/businesses', data);
  }

  async updateBusiness(id: string, data: any): Promise<any> {
    return put(`/businesses/${id}`, data);
  }

  async deleteBusiness(id: string): Promise<any> {
    return del(`/businesses/${id}`);
  }

  // ========================
  // CUSTOM OBJECTS
  // ========================

  async getObjectSchemas(): Promise<any[]> {
    try {
      const data = await get('/objects/schemas');
      return data.schemas || [];
    } catch { return []; }
  }

  async getObjectSchema(schemaId: string): Promise<any> {
    return get(`/objects/schemas/${schemaId}`);
  }

  async createObjectSchema(data: any): Promise<any> {
    return post('/objects/schemas', data);
  }

  async updateObjectSchema(schemaId: string, data: any): Promise<any> {
    return put(`/objects/schemas/${schemaId}`, data);
  }

  async deleteObjectSchema(schemaId: string): Promise<any> {
    return del(`/objects/schemas/${schemaId}`);
  }

  // Object Records
  async getObjectRecords(schemaId: string, params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get(`/objects/schemas/${schemaId}/records`, params);
      return data.records || [];
    } catch { return []; }
  }

  async getObjectRecord(schemaId: string, recordId: string): Promise<any> {
    return get(`/objects/schemas/${schemaId}/records/${recordId}`);
  }

  async createObjectRecord(schemaId: string, data: any): Promise<any> {
    return post(`/objects/schemas/${schemaId}/records`, data);
  }

  async updateObjectRecord(schemaId: string, recordId: string, data: any): Promise<any> {
    return put(`/objects/schemas/${schemaId}/records/${recordId}`, data);
  }

  async deleteObjectRecord(schemaId: string, recordId: string): Promise<any> {
    return del(`/objects/schemas/${schemaId}/records/${recordId}`);
  }

  // ========================
  // ASSOCIATIONS
  // ========================

  async getAssociations(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/objects/associations', params);
      return data.associations || [];
    } catch { return []; }
  }

  async getAssociation(id: string): Promise<any> {
    return get(`/objects/associations/${id}`);
  }

  async createAssociation(data: any): Promise<any> {
    return post('/objects/associations', data);
  }

  async updateAssociation(id: string, data: any): Promise<any> {
    return put(`/objects/associations/${id}`, data);
  }

  async deleteAssociation(id: string): Promise<any> {
    return del(`/objects/associations/${id}`);
  }

  // Association Relations
  async getAssociationRelations(associationId: string, params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get(`/objects/associations/${associationId}/relations`, params);
      return data.relations || [];
    } catch { return []; }
  }

  async createAssociationRelation(associationId: string, data: any): Promise<any> {
    return post(`/objects/associations/${associationId}/relations`, data);
  }

  async deleteAssociationRelation(associationId: string, relationId: string): Promise<any> {
    return del(`/objects/associations/${associationId}/relations/${relationId}`);
  }

  // ========================
  // COURSES / MEMBERSHIPS
  // ========================

  async getCourses(): Promise<any[]> {
    try {
      const data = await get('/courses');
      return data.courses || [];
    } catch { return []; }
  }

  async getCourse(id: string): Promise<any> {
    return get(`/courses/${id}`);
  }

  async createCourse(data: any): Promise<any> {
    return post('/courses', data);
  }

  async updateCourse(id: string, data: any): Promise<any> {
    return put(`/courses/${id}`, data);
  }

  async deleteCourse(id: string): Promise<any> {
    return del(`/courses/${id}`);
  }

  async getCourseModules(courseId: string): Promise<any[]> {
    try {
      const data = await get(`/courses/${courseId}/modules`);
      return data.modules || [];
    } catch { return []; }
  }

  async importCourseStudents(courseId: string, data: any): Promise<any> {
    return post(`/courses/${courseId}/import`, data);
  }

  // ========================
  // MEDIA LIBRARY
  // ========================

  async getMedia(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/media', params);
      return data.medias || data.files || [];
    } catch { return []; }
  }

  async getMediaFile(id: string): Promise<any> {
    return get(`/media/${id}`);
  }

  async uploadMedia(data: any): Promise<any> {
    return post('/media/upload', data);
  }

  async deleteMedia(id: string): Promise<any> {
    return del(`/media/${id}`);
  }

  // ========================
  // EMAIL BUILDER
  // ========================

  async getEmails(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/emails', params);
      return data.emails || [];
    } catch { return []; }
  }

  async getEmail(id: string): Promise<any> {
    return get(`/emails/${id}`);
  }

  async createEmail(data: any): Promise<any> {
    return post('/emails', data);
  }

  async updateEmail(id: string, data: any): Promise<any> {
    return put(`/emails/${id}`, data);
  }

  async deleteEmail(id: string): Promise<any> {
    return del(`/emails/${id}`);
  }

  // Email Schedules
  async getEmailSchedules(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/emails/schedule', params);
      return data.schedules || [];
    } catch { return []; }
  }

  async createEmailSchedule(data: any): Promise<any> {
    return post('/emails/schedule', data);
  }

  async updateEmailSchedule(scheduleId: string, data: any): Promise<any> {
    return put(`/emails/schedule/${scheduleId}`, data);
  }

  async deleteEmailSchedule(scheduleId: string): Promise<any> {
    return del(`/emails/schedule/${scheduleId}`);
  }

  // ========================
  // PHONE NUMBERS & TWILIO
  // ========================

  async getPhoneNumbers(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/phone-numbers', params);
      return data.phoneNumbers || [];
    } catch { return []; }
  }

  async getPhoneNumber(id: string): Promise<any> {
    return get(`/phone-numbers/${id}`);
  }

  async createPhoneNumber(data: any): Promise<any> {
    return post('/phone-numbers', data);
  }

  async updatePhoneNumber(id: string, data: any): Promise<any> {
    return put(`/phone-numbers/${id}`, data);
  }

  async deletePhoneNumber(id: string): Promise<any> {
    return del(`/phone-numbers/${id}`);
  }

  async getNumberPools(): Promise<any[]> {
    try {
      const data = await get('/phone-numbers/pools');
      return data.pools || [];
    } catch { return []; }
  }

  async getTwilioInfo(): Promise<any> {
    return get('/phone-numbers/twilio');
  }

  // ========================
  // SOCIAL PLANNER
  // ========================

  async getSocialPosts(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/social/posts', params);
      return data.posts || [];
    } catch { return []; }
  }

  async getSocialPost(id: string): Promise<any> {
    return get(`/social/posts/${id}`);
  }

  async createSocialPost(data: any): Promise<any> {
    return post('/social/posts', data);
  }

  async updateSocialPost(id: string, data: any): Promise<any> {
    return put(`/social/posts/${id}`, data);
  }

  async deleteSocialPost(id: string): Promise<any> {
    return del(`/social/posts/${id}`);
  }

  async getSocialAccounts(): Promise<any[]> {
    try {
      const data = await get('/social/accounts');
      return data.accounts || [];
    } catch { return []; }
  }

  async getSocialAccount(id: string): Promise<any> {
    return get(`/social/accounts/${id}`);
  }

  async deleteSocialAccount(id: string): Promise<any> {
    return del(`/social/accounts/${id}`);
  }

  async getSocialTags(): Promise<any[]> {
    try {
      const data = await get('/social/tags');
      return data.tags || [];
    } catch { return []; }
  }

  async getSocialTag(id: string): Promise<any> {
    return get(`/social/tags/${id}`);
  }

  async createSocialCategory(data: any): Promise<any> {
    return post('/social/categories', data);
  }

  async getSocialStats(params?: Record<string, string>): Promise<any> {
    return get('/social/stats', params);
  }

  async exportSocialCsv(params?: Record<string, string>): Promise<any> {
    return get('/social/csv/export', params);
  }

  async importSocialCsv(data: any): Promise<any> {
    return post('/social/csv/import', data);
  }

  // ========================
  // BLOGS
  // ========================

  async getBlogs(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/blogs', params);
      return data.blogs || [];
    } catch { return []; }
  }

  async getBlogPosts(blogId: string, params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get(`/blogs/${blogId}/posts`, params);
      return data.posts || [];
    } catch { return []; }
  }

  async getBlogPost(blogId: string, postId: string): Promise<any> {
    return get(`/blogs/${blogId}/posts/${postId}`);
  }

  async createBlogPost(blogId: string, data: any): Promise<any> {
    return post(`/blogs/${blogId}/posts`, data);
  }

  async updateBlogPost(blogId: string, postId: string, data: any): Promise<any> {
    return put(`/blogs/${blogId}/posts/${postId}`, data);
  }

  async deleteBlogPost(blogId: string, postId: string): Promise<any> {
    return del(`/blogs/${blogId}/posts/${postId}`);
  }

  async getBlogCategories(blogId: string): Promise<any[]> {
    try {
      const data = await get(`/blogs/${blogId}/categories`);
      return data.categories || [];
    } catch { return []; }
  }

  async getBlogAuthors(blogId: string): Promise<any[]> {
    try {
      const data = await get(`/blogs/${blogId}/authors`);
      return data.authors || [];
    } catch { return []; }
  }

  async checkBlogSlug(blogId: string, slug: string): Promise<any> {
    return get(`/blogs/${blogId}/check-slug`, { slug });
  }

  // ========================
  // DOCUMENTS & CONTRACTS
  // ========================

  async getDocuments(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/documents', params);
      return data.documents || [];
    } catch { return []; }
  }

  async getDocument(id: string): Promise<any> {
    return get(`/documents/${id}`);
  }

  async sendDocumentLink(id: string, data: any): Promise<any> {
    return post(`/documents/${id}/send`, data);
  }

  async getDocumentTemplates(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/documents/templates', params);
      return data.templates || [];
    } catch { return []; }
  }

  async getDocumentTemplate(templateId: string): Promise<any> {
    return get(`/documents/templates/${templateId}`);
  }

  async sendDocumentTemplateLink(templateId: string, data: any): Promise<any> {
    return post(`/documents/templates/${templateId}/send`, data);
  }

  // ========================
  // FUNNELS & PAGES
  // ========================

  async getFunnels(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/funnels', params);
      return data.funnels || [];
    } catch (error: any) { throw error; }
  }

  async getFunnel(id: string): Promise<any> {
    return get(`/funnels/${id}`);
  }

  async getFunnelPages(funnelId: string, params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get(`/funnels/${funnelId}/pages`, params);
      return data.pages || [];
    } catch { return []; }
  }

  async getFunnelPageCount(funnelId: string): Promise<number> {
    try {
      const data = await get(`/funnels/${funnelId}/page-count`);
      return data.count || 0;
    } catch { return 0; }
  }

  async getFunnelRedirects(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/funnels/redirects', params);
      return data.redirects || [];
    } catch { return []; }
  }

  async createFunnelRedirect(data: any): Promise<any> {
    return post('/funnels/redirects', data);
  }

  async updateFunnelRedirect(redirectId: string, data: any): Promise<any> {
    return put(`/funnels/redirects/${redirectId}`, data);
  }

  async deleteFunnelRedirect(redirectId: string): Promise<any> {
    return del(`/funnels/redirects/${redirectId}`);
  }

  // ========================
  // MARKETING (Campaigns, Workflows, Forms, Surveys)
  // ========================

  async getCampaigns(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/marketing/campaigns', params);
      return data.campaigns || [];
    } catch { return []; }
  }

  async getCampaign(id: string): Promise<any> {
    return get(`/marketing/campaigns/${id}`);
  }

  async getWorkflows(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/marketing/workflows', params);
      return data.workflows || [];
    } catch (error: any) { throw error; }
  }

  async getWorkflow(id: string): Promise<any> {
    return get(`/marketing/workflows/${id}`);
  }

  async getForms(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/marketing/forms', params);
      return data.forms || [];
    } catch { return []; }
  }

  async getFormSubmissions(formId: string, params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get(`/marketing/forms/${formId}/submissions`, params);
      return data.submissions || [];
    } catch { return []; }
  }

  async getSurveys(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/marketing/surveys', params);
      return data.surveys || [];
    } catch { return []; }
  }

  async getSurveySubmissions(surveyId: string, params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get(`/marketing/surveys/${surveyId}/submissions`, params);
      return data.submissions || [];
    } catch { return []; }
  }

  // ========================
  // CHARGES / BILLING
  // ========================

  async getCharges(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/charges', params);
      return data.charges || [];
    } catch { return []; }
  }

  async getCharge(id: string): Promise<any> {
    return get(`/charges/${id}`);
  }

  async createCharge(data: any): Promise<any> {
    return post('/charges', data);
  }

  // ========================
  // RECURRING TASKS
  // ========================

  async getRecurringTasks(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/recurring-tasks', params);
      return data.tasks || [];
    } catch { return []; }
  }

  async getRecurringTask(id: string): Promise<any> {
    return get(`/recurring-tasks/${id}`);
  }

  async createRecurringTask(data: any): Promise<any> {
    return post('/recurring-tasks', data);
  }

  async updateRecurringTask(id: string, data: any): Promise<any> {
    return put(`/recurring-tasks/${id}`, data);
  }

  async deleteRecurringTask(id: string): Promise<any> {
    return del(`/recurring-tasks/${id}`);
  }

  // ========================
  // LINKS
  // ========================

  async getLinks(params?: Record<string, string>): Promise<any[]> {
    try {
      const data = await get('/links', params);
      return data.links || [];
    } catch { return []; }
  }

  async getLink(id: string): Promise<any> {
    return get(`/links/${id}`);
  }

  async createLink(data: any): Promise<any> {
    return post('/links', data);
  }

  async updateLink(id: string, data: any): Promise<any> {
    return put(`/links/${id}`, data);
  }

  async deleteLink(id: string): Promise<any> {
    return del(`/links/${id}`);
  }

  // ========================
  // SaaS / SUBACCOUNTS
  // ========================

  async getSaasLocation(): Promise<any> {
    return get('/saas/location');
  }

  async updateSaasLocation(data: any): Promise<any> {
    return put('/saas/location', data);
  }

  // ========================
  // REVIEWS (legacy)
  // ========================

  async getReviews(): Promise<any[]> {
    try {
      const data = await get('/reviews');
      return data.reviews || [];
    } catch { return []; }
  }

  // ========================
  // LOCAL TASKS (file-based)
  // ========================

  async getTasks(): Promise<Task[]> {
    try {
      const data = await get('/tasks');
      return data.tasks || [];
    } catch { return []; }
  }

  async createTask(task: Partial<Task>): Promise<Task> {
    return post('/tasks', task);
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    return put(`/tasks/${id}`, updates);
  }

  async deleteTask(id: string): Promise<void> {
    await del(`/tasks/${id}`);
  }
}

export const apiService = new ApiService();
