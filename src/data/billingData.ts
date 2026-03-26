export const currentPlan = {
    name: 'Agency Elite Plan',
    price: '$497',
    interval: 'mo',
    status: 'active',
    nextBillingDate: 'April 20, 2026',
    features: [
        'Unlimited Subaccounts',
        'White-label Reporting',
        'Custom Domains',
        'Advanced Automations',
        'Dedicated Account Manager'
    ]
};

export const paymentMethods = [
    {
        type: 'Visa',
        last4: '4242',
        expiry: '12/28',
        isPrimary: true,
        color: 'bg-blue-600'
    },
    {
        type: 'Mastercard',
        last4: '8888',
        expiry: '05/27',
        isPrimary: false,
        color: 'bg-gray-800'
    }
];

export const invoiceHistory = [
    {
        id: 'INV-2026-001',
        date: 'Mar 20, 2026',
        amount: '$497.00',
        status: 'Paid',
        method: 'Visa ****4242'
    },
    {
        id: 'INV-2026-002',
        date: 'Feb 20, 2026',
        amount: '$497.00',
        status: 'Paid',
        method: 'Visa ****4242'
    },
    {
        id: 'INV-2026-003',
        date: 'Jan 20, 2026',
        amount: '$497.00',
        status: 'Paid',
        method: 'Visa ****4242'
    },
    {
        id: 'INV-2025-120',
        date: 'Dec 20, 2025',
        amount: '$299.00',
        status: 'Paid',
        method: 'Mastercard ****8888'
    }
];
