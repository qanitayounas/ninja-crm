export interface SmartListFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'in';
  value: any;
}

export interface SmartList {
  id: string;
  name: string;
  description: string;
  filters: SmartListFilter[];
  createdAt: string;
}

export const smartLists: SmartList[] = [
  {
    id: 'hot-leads',
    name: 'Hot Leads',
    description: 'Leads with high probability and recently contacted',
    filters: [
      { field: 'status', operator: 'equals', value: 'Warm' },
      { field: 'tags', operator: 'contains', value: 'Hot' }
    ],
    createdAt: '2024-03-20T10:00:00Z'
  },
  {
    id: 'vip-clients',
    name: 'VIP Clients',
    description: 'Clients from Enterprise companies',
    filters: [
      { field: 'status', operator: 'equals', value: 'Client' },
      { field: 'company', operator: 'contains', value: 'Corp' }
    ],
    createdAt: '2024-03-21T12:30:00Z'
  },
  {
    id: 'new-signups',
    name: 'New Signups',
    description: 'Contacts added in the last 7 days',
    filters: [
      { field: 'status', operator: 'equals', value: 'Cold' }
    ],
    createdAt: '2024-03-22T08:15:00Z'
  }
];
