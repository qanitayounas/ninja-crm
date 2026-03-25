export interface AgendaItem {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: 'meeting' | 'call' | 'demo' | 'review';
  color: string;
}

export const agendaData: AgendaItem[] = [
  {
    id: '1',
    title: 'Demo with Tech Co',
    time: '9:00 AM',
    duration: '1 hour',
    type: 'demo',
    color: 'border-l-[6px] border-ninja-yellow'
  },
  {
    id: '2',
    title: 'Team Meeting',
    time: '10:30 AM',
    duration: '30 min',
    type: 'meeting',
    color: 'border-l-[6px] border-purple-400'
  },
  {
    id: '3',
    title: 'Lunch with Sarah',
    time: '12:00 PM',
    duration: '1 hour',
    type: 'meeting',
    color: 'border-l-[6px] border-blue-400'
  },
  {
    id: '4',
    title: 'Sales Call - Enterprise Corp',
    time: '2:00 PM',
    duration: '45 min',
    type: 'call',
    color: 'border-l-[6px] border-ninja-yellow'
  },
  {
    id: '5',
    title: 'Product Review',
    time: '4:00 PM',
    duration: '1 hour',
    type: 'review',
    color: 'border-l-[6px] border-indigo-400'
  }
];

export const calendarDays = [
  { day: 'Mon', date: '14' },
  { day: 'Tue', date: '15' },
  { day: 'Wed', date: '16' },
  { day: 'Thu', date: '17' },
  { day: 'Fri', date: '18' },
  { day: 'Sat', date: '19', isToday: true },
  { day: 'Sun', date: '20' }
];

export const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
];
