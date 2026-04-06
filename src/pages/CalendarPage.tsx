import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  RefreshCw,
  MoreVertical,
  Search,
  Calendar as CalendarIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, Button, cn, Modal, Input, Select, Textarea } from '../components/ui';
import { calendarDays, timeSlots } from '../data/calendarData';
import { apiService } from '../services/apiService';

export const CalendarPage = () => {
  const [view, setView] = useState<'semana' | 'mes'>('semana');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setIsLoading(true);
    setSyncError(null);
    try {
      const data = await apiService.getAppointments();
      setAppointments(data || []);
    } catch (error: any) {
      console.error('Error loading appointments:', error);
      if (error.status === 403 || error.status === 401) {
        setSyncError('Calendar events are currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
      } else {
        toast.error('Failed to load appointments');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const agendaData = appointments
    .filter(app => {
      const today = new Date().toISOString().split('T')[0];
      return app.startTime.startsWith(today);
    })
    .slice(0, 10)
    .map(app => ({
      id: app.id,
      title: app.title || 'Meeting',
      time: new Date(app.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: '45 min',
      color: app.status === 'confirmed' ? 'border-l-ninja-yellow' : 'border-l-blue-400'
    }));


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Calendar</h1>
          <p className="text-gray-400 font-medium">Manage your schedule and appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            onClick={() => toast.success('Calendar synced successfully!')}
            className="flex items-center gap-2 bg-ninja-dark text-white border-none hover:bg-ninja-dark/90"
          >
            <RefreshCw size={18} />
            <span>Sync Calendar</span>
          </Button>
          <Button
            onClick={() => setIsAddEventModalOpen(true)}
            className="flex items-center gap-2 px-6"
          >
            <Plus size={20} />
            <span>New Appointment</span>
          </Button>
        </div>
      </div>

      {/* Alert Case: Branded Setup Notice */}
      {syncError && (
        <Card className="p-4 border-l-4 border-l-ninja-purple bg-ninja-purple/5 border-ninja-purple/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ninja-purple/10 rounded-lg text-ninja-purple">
              <CalendarIcon size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-ninja-dark">Module Synchronization</p>
              <p className="text-xs text-slate-500 font-medium">{syncError}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column: Calendar View */}
        <div className="flex-1 min-w-0">
          <Card className="p-0 border-none shadow-sm overflow-hidden flex flex-col h-full bg-white">
            {/* Calendar Sub-header */}
            <div className="p-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-50">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-lg font-bold text-ninja-dark whitespace-nowrap">March 14-20, 2026</span>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-1 rounded-xl flex">
                <button
                  onClick={() => setView('week' as any)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                    view === ('week' as any) || view === 'semana' ? "bg-ninja-yellow text-ninja-dark shadow-sm" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  Week
                </button>
                <button
                  onClick={() => setView('month' as any)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                    view === ('month' as any) || view === 'mes' ? "bg-ninja-yellow text-ninja-dark shadow-sm" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Weekly Grid */}
            <div className="flex-1 overflow-x-auto custom-scrollbar overflow-y-hidden">
              <div className="min-w-[1000px] flex flex-col h-full">
                {/* Days Header */}
                <div className="flex border-b border-gray-50 bg-gray-50/30">
                  <div className="w-20 flex-shrink-0" /> {/* Time column spacer */}
                  {calendarDays.map((day, i) => (
                    <div key={i} className="flex-1 py-4 flex flex-col items-center gap-1 border-l border-gray-50 first:border-l-0">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{day.day}</span>
                      <div className={cn(
                        "h-10 w-10 flex items-center justify-center rounded-2xl text-lg font-black",
                        day.isToday ? "bg-ninja-yellow text-ninja-dark shadow-lg shadow-ninja-yellow/20" : "text-ninja-dark/30"
                      )}>
                        {day.date}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Grid with Slots */}
                <div className="relative flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
                  {timeSlots.map((time, i) => (
                    <div key={i} className="flex border-b border-gray-50/50 min-h-[80px] relative transition-colors hover:bg-gray-50/20">
                      <div className="w-20 flex-shrink-0 flex items-start justify-center pt-2">
                        <span className="text-[10px] font-bold text-gray-400">{time}</span>
                      </div>
                      {calendarDays.map((_, dayIndex) => (
                        <div key={dayIndex} className="flex-1 border-l border-gray-50/50 relative" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Agenda de Hoy */}
        <div className="w-full xl:w-[320px] 2xl:w-[380px] flex-shrink-0">
          <Card className="flex flex-col gap-6 h-full border-none shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-ninja-dark tracking-tighter">Today's Agenda</h2>
              <button className="text-gray-300 hover:text-ninja-dark transition-colors">
                <Search size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-4">
              {agendaData.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "p-5 rounded-3xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-ninja transition-all group cursor-pointer",
                    item.color
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-ninja-dark group-hover:text-ninja-yellow transition-colors leading-tight">{item.title}</h3>
                    <button className="text-gray-200 group-hover:text-gray-400 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                      <Clock size={14} className="text-gray-300" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => toast.success('Reminders sent to all attendees!')}
              className="w-full py-4 text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-ninja-yellow/20 mb-2"
            >
              Send Reminder to All
            </Button>

            <Button variant="secondary" className="w-full mt-auto py-3 text-[10px] uppercase tracking-widest font-black rounded-xl border-2 border-gray-100 hover:border-ninja-yellow hover:bg-ninja-yellow/5 hover:text-ninja-dark transition-all">
              View Full Calendar
            </Button>
          </Card>
        </div>
      </div>

      <Modal isOpen={isAddEventModalOpen} onClose={() => setIsAddEventModalOpen(false)} title="Create New Event">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark">Title *</label>
            <Input placeholder="e.g.: Client Meeting" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Time *</label>
              <Input type="time" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Duration</label>
              <Select defaultValue="30">
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Type</label>
              <Select defaultValue="Meeting">
                <option value="Meeting">Meeting</option>
                <option value="Call">Call</option>
                <option value="Reminder">Reminder</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Location</label>
              <Input placeholder="e.g.: Conference Room" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark">Attendees (separated by comma)</label>
            <Input placeholder="John, Sarah, Mike" />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark">Description</label>
            <Textarea placeholder="Additional details about the event..." />
          </div>

          <div className="flex items-center gap-3 justify-end mt-2">
            <Button variant="secondary" onClick={() => setIsAddEventModalOpen(false)} className="border-none hover:bg-gray-100">Cancel</Button>
            <Button
              onClick={async () => {
                try {
                  const titleInput = document.querySelector<HTMLInputElement>('input[placeholder="e.g.: Client Meeting"]');
                  const timeInput = document.querySelector<HTMLInputElement>('input[type="time"]');
                  if (!titleInput?.value) { toast.error('Title is required'); return; }

                  // Get calendar and contacts
                  const [calendars, contactsRaw] = await Promise.all([
                    apiService.getCalendars(),
                    apiService.getContacts()
                  ]);

                  if (!calendars || calendars.length === 0) {
                    toast.error('No calendars found. Create one in GHL first.');
                    return;
                  }
                  if (!contactsRaw || contactsRaw.length === 0) {
                    toast.error('No contacts found. Add a contact first.');
                    return;
                  }

                  // Use tomorrow and snap to 30-min slot boundary
                  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
                  const dateStr = tomorrow.toISOString().split('T')[0];
                  const timeVal = timeInput?.value || '10:00';
                  const [hours, mins] = timeVal.split(':').map(Number);
                  const snappedMins = Math.floor(mins / 15) * 15;
                  const paddedH = String(hours).padStart(2, '0');
                  const paddedM = String(snappedMins).padStart(2, '0');
                  const startTime = new Date(`${dateStr}T${paddedH}:${paddedM}:00`).toISOString();
                  const endTime = new Date(new Date(startTime).getTime() + 30 * 60000).toISOString();

                  const payload = {
                    calendarId: calendars[0].id,
                    locationId: calendars[0].locationId,
                    contactId: contactsRaw[0].id,
                    title: titleInput.value,
                    startTime,
                    endTime,
                    appointmentStatus: 'new'
                  };

                  console.log('Creating event:', payload);
                  await apiService.createCalendarEvent(payload);
                  toast.success('Event created successfully!');
                  setIsAddEventModalOpen(false);
                  loadAppointments();
                } catch (error: any) {
                  console.error('Event creation error:', error);
                  const detail = error?.providerError;
                  const msg = Array.isArray(detail) ? detail[0] : (typeof detail === 'string' ? detail : 'Failed to create event. Check console.');
                  toast.error(msg);
                }
              }}
              className="font-black px-10"
            >
              Create Event
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
