export const automationsData = {
  kpis: [
    {
      title: 'Triggers Today',
      value: '672',
      change: '+18%',
      isPositive: true,
      subtitle: 'vs. yesterday',
      iconStyle: 'yellow'
    },
    {
      title: 'Active Workflows',
      value: '12',
      change: '',
      isPositive: true,
      subtitle: 'of 15 total',
      iconStyle: 'purple'
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      change: '',
      isPositive: true,
      subtitle: 'last 7 days',
      iconStyle: 'green'
    },
    {
      title: 'Average Conversion',
      value: '34.7%',
      change: '+12%',
      isPositive: true,
      subtitle: 'this week',
      iconStyle: 'lime'
    }
  ],
  chartData: [
    { day: 'Mon', triggers: 1200, conversions: 400 },
    { day: 'Tue', triggers: 1450, conversions: 500 },
    { day: 'Wed', triggers: 1100, conversions: 350 },
    { day: 'Thu', triggers: 1650, conversions: 550 },
    { day: 'Fri', triggers: 1950, conversions: 650 },
    { day: 'Sat', triggers: 850, conversions: 250 },
    { day: 'Sun', triggers: 600, conversions: 180 },
  ],
  pieData: [
    { name: 'Acquisition', value: 35, color: '#D4FF00' },
    { name: 'Nurturing', value: 30, color: '#BFA9FF' },
    { name: 'Closing', value: 20, color: '#3B82F6' },
    { name: 'Retention', value: 15, color: '#F97316' }
  ],
  topWorkflows: [
    { id: '#1', name: 'Auto-Response 24/7', platform: 'WhatsApp', rate: '42.1%', triggers: '2876', color: 'bg-ninja-yellow text-ninja-dark' },
    { id: '#2', name: 'DM Welcome Sequence', platform: 'Instagram', rate: '34.5%', triggers: '1245', color: 'bg-ninja-purple/30 text-ninja-purple' },
    { id: '#3', name: 'Lead Ads Nurturing', platform: 'Facebook', rate: '28.3%', triggers: '892', color: 'bg-blue-500/20 text-blue-500' },
    { id: '#4', name: 'AI-Assisted Closing', platform: 'WhatsApp', rate: '51.3%', triggers: '423', color: 'bg-blue-500/20 text-blue-500' }
  ],
  recentActivity: [
    { status: 'success', text: 'Auto-Response 24/7 executed', time: '2 mins ago' },
    { status: 'success', text: 'DM Welcome Sequence executed', time: '5 mins ago' },
    { status: 'error', text: 'ChatGPT Sales Assistant failed', time: '12 mins ago' },
    { status: 'success', text: 'Abandoned Cart Recovery executed', time: '18 mins ago' },
    { status: 'success', text: 'Lead Ads Nurturing executed', time: '25 mins ago' }
  ]
};
