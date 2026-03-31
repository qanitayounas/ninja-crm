import React from 'react';
import { Plus, Zap, TrendingUp, Activity, Edit2, Copy, X, ChevronDown, Check } from 'lucide-react';
import { Card, cn } from '../../components/ui';
import toast from 'react-hot-toast';

/* ─────────────────────────────────────────
   Custom Dropdown Component
───────────────────────────────────────── */
const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = value || '';

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-4 py-3 bg-white border rounded-xl text-sm font-medium transition-all text-left",
          open ? "border-ninja-yellow ring-2 ring-ninja-yellow/20" : "border-gray-200 hover:border-gray-300",
          selected ? "text-ninja-dark" : "text-gray-400"
        )}
      >
        <span className="truncate">{selected || placeholder}</span>
        <ChevronDown
          size={16}
          className={cn("shrink-0 text-gray-400 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-100 rounded-2xl shadow-xl shadow-black/10 overflow-hidden animate-in zoom-in-95 fade-in duration-150 origin-top">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-left transition-colors",
                opt === selected
                  ? "bg-ninja-yellow/10 text-ninja-dark font-black"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <span>{opt}</span>
              {opt === selected && <Check size={14} className="text-ninja-dark shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const automations = [
  {
    id: 1,
    name: 'Welcome New Leads',
    status: 'Active',
    trigger: 'Form completed',
    actions: ['Send email', 'Add tag', 'Assign to pipeline'],
    executions: 234,
  },
  {
    id: 2,
    name: 'Abandoned Cart Follow-up',
    status: 'Active',
    trigger: 'Cart > 24h without purchase',
    actions: ['Send reminder email', 'Send 10% coupon'],
    executions: 89,
  },
  {
    id: 3,
    name: 'Nurturing Email Sequence',
    status: 'Active',
    trigger: 'Tag: Hot Lead',
    actions: ['Email day 1', 'Email day 3', 'Email day 7', 'Assign seller'],
    executions: 156,
  },
  {
    id: 4,
    name: 'Post-Purchase Follow Up',
    status: 'Draft',
    trigger: 'Purchase completed',
    actions: ['Send thank you email', 'Request review'],
    executions: 0,
  },
];

const kpis = [
  { label: 'Active Automations', value: '3', icon: <Zap size={22} />, color: 'bg-ninja-yellow/20 text-ninja-dark' },
  { label: 'Total Executions', value: '479', icon: <Activity size={22} />, color: 'bg-purple-100 text-purple-600' },
  { label: 'Success Rate', value: '98.5%', icon: <TrendingUp size={22} />, color: 'bg-ninja-yellow/20 text-ninja-dark' },
];

const TRIGGER_OPTIONS = [
  'Form completed',
  'Email opened',
  'Link clicked',
  'Tag added/removed',
  'Purchase made',
  'Page visited',
  'Time elapsed',
];

const FIELD_OPTIONS = ['Field', 'Email', 'Phone', 'Country', 'Name', 'City'];
const OPERATOR_OPTIONS = ['contains', 'is equal to', 'is not equal to', 'starts with', 'ends with'];

const ACTION_OPTIONS = [
  'Send email',
  'Send SMS',
  'Send WhatsApp',
  'Add tag',
  'Remove tag',
  'Assign to pipeline',
  'Create task',
  'Notify seller',
];

/* ─────────────────────────────────────────
   Create Automation Modal
───────────────────────────────────────── */
const CreateAutomationModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [trigger, setTrigger] = React.useState('');
  const [conditions, setConditions] = React.useState([{ field: '', operator: '', value: '' }]);
  const [actions, setActions] = React.useState(['']);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-4">
          <div>
            <h2 className="text-xl font-black text-ninja-dark tracking-tight">Create New Automation</h2>
            <p className="text-sm font-medium text-gray-400 mt-1">Configure triggers and actions</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-ninja-dark transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Automation Name *
            </label>
            <input
              placeholder="E.g.: Welcome New Leads"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ninja-yellow/30 focus:border-ninja-yellow transition-all"
            />
          </div>

          {/* Trigger */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Trigger (Event)
            </label>
            <CustomSelect
              options={TRIGGER_OPTIONS}
              value={trigger}
              onChange={setTrigger}
              placeholder="Select trigger..."
            />
          </div>

          {/* Conditions */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Conditions (optional)
            </label>
            {conditions.map((cond, i) => (
              <div key={i} className="flex items-center gap-2 animate-in slide-in-from-top-1">
                <div className="flex-1">
                  <CustomSelect
                    options={FIELD_OPTIONS}
                    value={cond.field}
                    onChange={(v) => {
                      const next = [...conditions];
                      next[i].field = v;
                      setConditions(next);
                    }}
                    placeholder="Field"
                  />
                </div>
                <div className="flex-1">
                  <CustomSelect
                    options={OPERATOR_OPTIONS}
                    value={cond.operator}
                    onChange={(v) => {
                      const next = [...conditions];
                      next[i].operator = v;
                      setConditions(next);
                    }}
                    placeholder="contains"
                  />
                </div>
                <input
                  placeholder="Value"
                  value={cond.value}
                  onChange={(e) => {
                    const next = [...conditions];
                    next[i].value = e.target.value;
                    setConditions(next);
                  }}
                  className="flex-[1.2] px-3 py-3 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ninja-yellow/30 focus:border-ninja-yellow transition-all"
                />
              </div>
            ))}
            <button
              onClick={() => setConditions([...conditions, { field: '', operator: '', value: '' }])}
              className="flex items-center gap-1.5 text-[10px] font-black text-ninja-yellow uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              <Plus size={13} strokeWidth={3} /> Add condition
            </button>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</label>
            {actions.map((action, i) => (
              <div key={i} className="flex items-center gap-3 animate-in slide-in-from-top-1">
                <div className="h-6 w-6 rounded-full bg-ninja-yellow text-ninja-dark text-[9px] font-black flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <CustomSelect
                  options={ACTION_OPTIONS}
                  value={action}
                  onChange={(v) => {
                    const next = [...actions];
                    next[i] = v;
                    setActions(next);
                  }}
                  placeholder="Select action..."
                />
              </div>
            ))}
            <button
              onClick={() => setActions([...actions, ''])}
              className="flex items-center gap-1.5 text-[10px] font-black text-ninja-yellow uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              <Plus size={13} strokeWidth={3} /> Add action
            </button>
          </div>

          {/* Submit */}
          <button
            className="w-full py-4 bg-ninja-yellow text-ninja-dark rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-ninja-yellow/20 hover:scale-[1.02] active:scale-95 transition-all mt-2"
            onClick={() => {
              toast.success('Automation created!');
              onClose();
            }}
          >
            Create Automation
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Automation Card
───────────────────────────────────────── */
const AutomationCard = ({ auto }: { auto: typeof automations[0] }) => {
  const isActive = auto.status === 'Active';
  return (
    <div
      className={cn(
        'bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition-all group border border-gray-100/80',
        isActive ? 'border-l-4 border-l-ninja-yellow' : 'border-l-4 border-l-gray-200'
      )}
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-black text-ninja-dark tracking-tight group-hover:text-ninja-yellow transition-colors">
              {auto.name}
            </h3>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest',
                isActive
                  ? 'bg-ninja-yellow/10 text-ninja-dark border border-ninja-yellow/30'
                  : 'bg-gray-100 text-gray-400'
              )}
            >
              {auto.status}
            </span>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Executions</p>
            <p className={cn('text-2xl font-black', isActive ? 'text-ninja-yellow' : 'text-gray-300')}>
              {auto.executions}
            </p>
          </div>
        </div>

        {/* Trigger */}
        <div className="flex items-center gap-2 flex-wrap">
          <Zap size={14} className="text-ninja-yellow shrink-0" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trigger:</span>
          <span className="text-sm font-bold text-ninja-dark/70">{auto.trigger}</span>
        </div>

        {/* Actions */}
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Actions:</p>
          <div className="flex flex-wrap gap-2">
            {auto.actions.map((action, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="h-5 w-5 rounded-full bg-ninja-yellow text-ninja-dark text-[9px] font-black flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <span className="text-xs font-bold text-ninja-dark/70">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer action bar */}
      <div className="flex items-center gap-2 border-t border-gray-100 bg-gray-50/50 px-6 py-3 flex-wrap">
        <button className="flex-1 min-w-[120px] py-2.5 border border-gray-200 rounded-xl text-xs font-black text-ninja-dark uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
          <Edit2 size={13} /> Edit Workflow
        </button>
        <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-xs font-black text-ninja-dark uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2">
          <Copy size={13} /> Duplicate
        </button>
        <button
          className={cn(
            'px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all',
            isActive
              ? 'bg-ninja-yellow text-ninja-dark hover:scale-105 shadow-md shadow-ninja-yellow/20'
              : 'border border-ninja-yellow text-ninja-dark hover:bg-ninja-yellow'
          )}
        >
          {isActive ? 'Pause' : 'Activate'}
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export const MarketingAutomation = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <CreateAutomationModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="flex flex-col gap-8 animate-in fade-in duration-500">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Marketing Automation</h1>
            <p className="text-sm font-bold text-gray-400 mt-1">Workflows and automated flows</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3.5 bg-ninja-yellow text-ninja-dark rounded-2xl text-sm font-black uppercase shadow-lg shadow-ninja-yellow/20 hover:scale-105 active:scale-95 transition-all self-start sm:self-auto shrink-0"
          >
            <Plus size={18} strokeWidth={3} />
            Create Automation
          </button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((k, i) => (
            <Card key={i} className="p-6 border-none shadow-sm bg-white hover:scale-[1.02] transition-all">
              <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center mb-4', k.color)}>
                {k.icon}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{k.label}</p>
              <h4 className="text-3xl font-black text-ninja-dark">{k.value}</h4>
            </Card>
          ))}
        </div>

        {/* Automation List */}
        <div className="space-y-4">
          {automations.map((auto) => (
            <AutomationCard key={auto.id} auto={auto} />
          ))}
        </div>
      </div>
    </>
  );
};
