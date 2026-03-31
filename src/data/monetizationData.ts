export const monetizationMetrics = [
    { label: 'Total Revenue', value: '$54,500', subtext: 'this month', trend: '+28%', badge: '+28%', icon: 'dollar' },
    { label: 'Recurring Revenue', value: '$22,773', subtext: '447 subscribers', trend: 'MRR', badge: 'MRR', icon: 'refresh' },
    { label: 'AOV', value: '$98', subtext: 'average order value', trend: '$98', badge: '$98', icon: 'trending' },
    { label: 'Total Sales', value: '805', subtext: 'this month', trend: '805', badge: '805', icon: 'package' }
];

export const revenueEvolutionData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 18500 },
    { month: 'Mar', revenue: 15000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 22000 },
    { month: 'Jun', revenue: 30000 }
];

export const revenueDistribution = [
    { name: 'Individual Courses', value: 45, color: '#D4FF00' },
    { name: 'Subscriptions', value: 35, color: '#BFA9FF' },
    { name: 'Bundles', value: 20, color: '#0F0F0F' }
];

export const salesByProductData = [
    { month: 'Jan', sales: 11000 },
    { month: 'Feb', sales: 16500 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 25000 },
    { month: 'May', sales: 21000 },
    { month: 'Jun', sales: 30000 }
];

export const pricingModels = [
    { product: 'Digital Marketing Strategies', type: 'Individual Course', price: '$99', sales: 342, revenue: '$33,858', status: 'Active' },
    { product: 'Pro Membership', type: 'Monthly Subscription', price: '$49', sales: 156, revenue: '$7,644', status: 'Active' },
    { product: 'Complete Marketing Bundle', type: 'Bundle', price: '$249', sales: 89, revenue: '$22,161', status: 'Active' },
    { product: 'Advanced Sales with CRM', type: 'Individual Course', price: '$79', sales: 218, revenue: '$17,222', status: 'Active' }
];

export const subscriptionPlans = [
    {
        name: 'Basic Plan',
        price: '$29',
        period: '/month',
        subscribers: 124,
        mrr: '$3,596',
        churnRate: '5.2%',
        features: ['Access to 5 courses', 'Basic community', 'Email support']
    },
    {
        name: 'Pro Plan',
        price: '$49',
        period: '/month',
        subscribers: 256,
        mrr: '$12,544',
        churnRate: '3.8%',
        features: ['Unlimited access', 'All communities', 'Priority support', 'Premium certificates'],
        isPopular: true
    },
    {
        name: 'Enterprise Plan',
        price: '$99',
        period: '/month',
        subscribers: 67,
        mrr: '$6,633',
        churnRate: '2.1%',
        features: ['Everything in Pro', '1-on-1 sessions', 'Exclusive content', 'API access']
    }
];

export const subscriptionSummary = [
    { label: 'Total MRR', value: '$22,773', subtext: '+12% vs last month' },
    { label: 'ARR', value: '$273,276', subtext: 'annual projection' },
    { label: 'Avg Churn', value: '3.7%', subtext: 'last 3 months', isWarning: true },
    { label: 'LTV', value: '$1,320', subtext: 'customer lifetime value' }
];
