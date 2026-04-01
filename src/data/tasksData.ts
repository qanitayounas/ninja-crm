import type { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Follow up with John Smith',
    description: 'Regarding the upcoming product launch and his interest in the premium plan.',
    dueDate: '2026-04-05',
    priority: 'High',
    status: 'To Do',
    assigneeId: 'u1',
    creatorId: 'u1',
    createdAt: '2026-03-31T10:00:00Z',
    updatedAt: '2026-03-31T10:00:00Z',
    contactId: '1', // John Smith
    tags: ['Sales', 'Follow-up']
  },
  {
    id: 't2',
    title: 'Website Redesign Proposal',
    description: 'Prepare the initial pitch for the digital transformation project for Digital Solutions Ltd.',
    dueDate: '2026-04-10',
    priority: 'Medium',
    status: 'In Progress',
    assigneeId: 'u2',
    creatorId: 'u1',
    createdAt: '2026-03-30T09:00:00Z',
    updatedAt: '2026-03-30T15:00:00Z',
    contactId: '2', // Jane Doe
    tags: ['Marketing', 'Proposal']
  },
  {
    id: 't3',
    title: 'Technical Audit for Global Ventures',
    description: 'Perform a full audit of their CRM integration and provide recommendations.',
    dueDate: '2026-03-29',
    priority: 'High',
    status: 'Review',
    assigneeId: 'u1',
    creatorId: 'u1',
    createdAt: '2026-03-25T11:00:00Z',
    updatedAt: '2026-03-31T16:00:00Z',
    contactId: '3', // Michael Brown
    tags: ['Technical', 'Audit']
  },
  {
    id: 't4',
    title: 'Onboarding Call with David Johnson',
    description: 'Schedule a kick-off meeting to discuss the implementation strategy.',
    dueDate: '2026-04-02',
    priority: 'Low',
    status: 'To Do',
    assigneeId: 'u1',
    creatorId: 'u2',
    createdAt: '2026-03-28T08:00:00Z',
    updatedAt: '2026-03-28T08:00:00Z',
    contactId: '5', // David Johnson
    tags: ['Support', 'Onboarding']
  },
  {
    id: 't5',
    title: 'Monthly Performance Report',
    description: 'Compile all key metrics and financial data for the Q1 review.',
    dueDate: '2026-04-01',
    priority: 'Medium',
    status: 'Completed',
    assigneeId: 'u1',
    creatorId: 'u1',
    createdAt: '2026-03-20T14:00:00Z',
    updatedAt: '2026-03-31T18:00:00Z',
    tags: ['Admin', 'Reporting']
  }
];

export const TASK_COLUMNS = [
  { id: 'To Do', title: 'To Do' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Review', title: 'Review' },
  { id: 'Completed', title: 'Completed' }
] as const;
