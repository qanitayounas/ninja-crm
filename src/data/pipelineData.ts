export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  description: string;
  owner: {
    name: string;
    initials: string;
    color: string;
  };
}

export interface PipelineStage {
  id: string;
  title: string;
  count: number;
  totalValue: number;
  color: string;
  deals: Deal[];
}

export const pipelineData: PipelineStage[] = [
  {
    id: 'new-client',
    title: 'New Lead',
    count: 3,
    totalValue: 48500,
    color: '#94a3b8', // text-slate-400
    deals: [
      {
        id: '1',
        title: 'Website Redesign',
        company: 'Tech Co',
        value: 15000,
        probability: 20,
        description: 'Client interested in modernizing their web presence',
        owner: { name: 'John', initials: 'J', color: 'bg-indigo-400' }
      },
      {
        id: '2',
        title: 'CRM Implementation',
        company: 'Startup Inc',
        value: 25000,
        probability: 25,
        description: 'They need to centralize their sales',
        owner: { name: 'Sarah', initials: 'S', color: 'bg-purple-400' }
      },
      {
        id: '3',
        title: 'SEO Audit',
        company: 'Retail Group',
        value: 8500,
        probability: 10,
        description: 'Initial positioning analysis',
        owner: { name: 'Mike', initials: 'M', color: 'bg-blue-400' }
      }
    ]
  },
  {
    id: 'contacted',
    title: 'Contacted',
    count: 2,
    totalValue: 77000,
    color: '#3b82f6', // text-blue-500
    deals: [
      {
        id: '4',
        title: 'Software License',
        company: 'Enterprise Corp',
        value: 45000,
        probability: 40,
        description: 'Requires 50 user licenses',
        owner: { name: 'Emily', initials: 'E', color: 'bg-pink-400' }
      },
      {
        id: '5',
        title: 'Consulting Services',
        company: 'Finance Ltd',
        value: 32000,
        probability: 35,
        description: 'Digital transformation consultancy',
        owner: { name: 'John', initials: 'J', color: 'bg-indigo-400' }
      }
    ]
  },
  {
    id: 'proposal-sent',
    title: 'Proposal Sent',
    count: 2,
    totalValue: 119000,
    color: '#a855f7', // text-purple-500
    deals: [
      {
        id: '6',
        title: 'Cloud Migration',
        company: 'Healthcare Plus',
        value: 67000,
        probability: 60,
        description: 'Proposal sent on March 10',
        owner: { name: 'Sarah', initials: 'S', color: 'bg-purple-400' }
      },
      {
        id: '7',
        title: 'App Development',
        company: 'Retail Chain',
        value: 52000,
        probability: 55,
        description: 'Native app for iOS and Android',
        owner: { name: 'Emily', initials: 'E', color: 'bg-pink-400' }
      }
    ]
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    count: 1,
    totalValue: 89000,
    color: '#f59e0b', // text-amber-500
    deals: [
      {
        id: '8',
        title: 'Platform Integration',
        company: 'Tech Innovations',
        value: 89000,
        probability: 80,
        description: 'Negotiating payment terms',
        owner: { name: 'Emily', initials: 'E', color: 'bg-pink-400' }
      }
    ]
  }
];
