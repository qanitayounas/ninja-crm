export const reportMetrics = [
    {
        label: 'Closed Revenue',
        value: '$113,500',
        subtext: 'attributed in period',
        trend: '+24%',
        trendType: 'positive',
        icon: 'dollar'
    },
    {
        label: 'Leads Generated',
        value: '1,499',
        subtext: 'from all channels',
        trend: '+18%',
        trendType: 'positive',
        icon: 'users'
    },
    {
        label: 'Total Conversions',
        value: '398',
        subtext: '26.6% closing rate',
        trend: '398',
        trendType: 'neutral',
        icon: 'chart'
    }
];

export const channelDistribution = [
    { name: 'Google Ads', value: 34, color: '#DCFF02' },
    { name: 'Facebook Ads', value: 28, color: '#A78BFA' },
    { name: 'Organic', value: 22, color: '#60A5FA' },
    { name: 'Email', value: 10, color: '#FDBA74' },
    { name: 'Referrals', value: 6, color: '#34D399' },
];

export const revenueBySource = [
    { source: 'Google Ads', revenue: 42300 },
    { source: 'Facebook Ads', revenue: 31200 },
    { source: 'Organic', revenue: 18900 },
    { source: 'Email Marketing', revenue: 8700 },
    { source: 'Referrals', revenue: 12400 },
];

export const sourcePerformance = [
    {
        source: 'Google Ads',
        leads: 342,
        conversions: 87,
        convRate: '25.4%',
        revenue: '$42,300',
        avgValue: '$486'
    },
    {
        source: 'Facebook Ads',
        leads: 289,
        conversions: 64,
        convRate: '22.1%',
        revenue: '$31,200',
        avgValue: '$488'
    },
    {
        source: 'Organic',
        leads: 456,
        conversions: 124,
        convRate: '27.2%',
        revenue: '$18,900',
        avgValue: '$152'
    },
    {
        source: 'Email Marketing',
        leads: 234,
        conversions: 45,
        convRate: '19.2%',
        revenue: '$8,700',
        avgValue: '$193'
    },
    {
        source: 'Referrals',
        leads: 178,
        conversions: 78,
        convRate: '43.8%',
        revenue: '$12,400',
        avgValue: '$159'
    }
];

export const sessionEvents = [
    {
        source: 'google',
        medium: 'cpc',
        campaign: 'summer_sale_2024',
        content: 'ad_variant_a',
        term: 'crm software',
        status: 'Converted',
        revenue: '$2,400'
    },
    {
        source: 'facebook',
        medium: 'social',
        campaign: 'retargeting_q2',
        content: 'video_testimonials',
        term: '-',
        status: 'Converted',
        revenue: '$1,800'
    }
];

export const keyConclusions = [
    {
        id: 1,
        text: 'Google Ads generates the highest volume of revenue ($42,300) but with a higher CPL'
    },
    {
        id: 2,
        text: 'Organic has the highest volume of leads (456) with a conversion rate of 27.2%'
    },
    {
        id: 3,
        text: 'Referrals have the best conversion rate (43.8%) - Scale this channel'
    },
    {
        id: 4,
        text: '62% of your revenue comes from paid channels - Diversify to reduce risk'
    }
];
