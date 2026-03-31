export const automationMetrics = [
    {
        label: 'Active Automations',
        value: '12',
        trend: '+2',
        icon: 'zap'
    },
    {
        label: 'Executed this Month',
        value: '654',
        trend: '+18%',
        icon: 'trending'
    },
    {
        label: 'Open Rate',
        value: '72.4%',
        trend: '+5.2%',
        icon: 'mail'
    },
    {
        label: 'Success Rate',
        value: '86.2%',
        trend: '+3.1%',
        icon: 'award'
    }
];

export const configuredAutomations = [
    {
        id: 1,
        title: 'Welcome New Students',
        status: 'Active',
        trigger: 'Course enrollment',
        actions: ['Welcome email', 'Add to community', 'Assign first lesson'],
        executed: 342,
        successRate: '98.5%'
    },
    {
        id: 2,
        title: 'Progress Reminder',
        status: 'Active',
        trigger: 'No activity for 3 days',
        actions: ['Reminder email', 'Push notification'],
        executed: 156,
        successRate: '76.3%'
    },
    {
        id: 3,
        title: 'Completion Celebration',
        status: 'Active',
        trigger: 'Course completed',
        actions: ['Congratulations email', 'Send certificate', 'Offer next course'],
        executed: 89,
        successRate: '94.2%'
    },
    {
        id: 4,
        title: 'Abandonment Recovery',
        status: 'Paused',
        trigger: 'Module incomplete for 7 days',
        actions: ['Motivational email', 'Special discount'],
        executed: 67,
        successRate: '45.8%'
    }
];

export const topAutomations = [
    { rank: 1, title: 'Welcome New Students', executions: 342, successRate: '98.5%' },
    { rank: 2, title: 'Progress Reminder', executions: 156, successRate: '76.3%' },
    { rank: 3, title: 'Completion Celebration', executions: 89, successRate: '94.2%' }
];

export const overallPerformance = [
    { label: 'Emails Sent', value: '1,247', unit: 'this month', color: 'bg-ninja-yellow/10 text-ninja-dark' },
    { label: 'Push Notifications', value: '892', unit: 'this month', color: 'bg-purple-50 text-purple-600' },
    { label: 'Time Saved', value: '47 hrs', unit: 'monthly estimate', color: 'bg-blue-50 text-blue-600' }
];

export const automationTemplates = [
    {
        id: 1,
        title: 'Welcome to Course',
        description: 'Automated welcome message when a student enrolls.',
        type: 'Email',
        icon: 'mail',
        color: 'bg-ninja-yellow'
    },
    {
        id: 2,
        title: 'Lesson Reminder',
        description: 'Notify students about pending lessons.',
        type: 'Notification',
        icon: 'bell',
        color: 'bg-purple-500'
    },
    {
        id: 3,
        title: 'Scheduled Session',
        description: 'Reminder for live sessions or scheduled events.',
        type: 'Calendar',
        icon: 'calendar',
        color: 'bg-green-500'
    },
    {
        id: 4,
        title: 'Certificate Delivery',
        description: 'Send certificate automatically on course completion.',
        type: 'Email',
        icon: 'award',
        color: 'bg-blue-500'
    },
    {
        id: 5,
        title: 'Community Invitation',
        description: 'Invite students to join communities.',
        type: 'Notification',
        icon: 'users',
        color: 'bg-purple-500'
    },
    {
        id: 6,
        title: 'Progress Report',
        description: 'Send weekly student progress summaries.',
        type: 'Email',
        icon: 'bar-chart',
        color: 'bg-ninja-yellow'
    }
];

export const triggerList = [
    { title: 'Course Enrollment', icon: 'zap', color: 'bg-ninja-yellow text-ninja-dark' },
    { title: 'Course Completed', icon: 'check', color: 'bg-purple-100 text-purple-600' },
    { title: 'Lesson Completed', icon: 'check', color: 'bg-ninja-yellow text-ninja-dark' },
    { title: 'Quiz Passed', icon: 'zap', color: 'bg-purple-100 text-purple-600' },
    { title: 'Quiz Failed', icon: 'zap', color: 'bg-purple-100 text-purple-600' },
    { title: 'No Activity (3 days)', icon: 'zap', color: 'bg-ninja-yellow text-ninja-dark' },
    { title: 'No Activity (7 days)', icon: 'zap', color: 'bg-purple-100 text-purple-600' },
    { title: 'First Login', icon: 'zap', color: 'bg-ninja-yellow text-ninja-dark' },
    { title: 'Certificate Earned', icon: 'award', color: 'bg-purple-100 text-purple-600' },
    { title: 'Badge Earned', icon: 'zap', color: 'bg-ninja-yellow text-ninja-dark' },
    { title: 'Module Incomplete', icon: 'zap', color: 'bg-purple-100 text-purple-600' },
    { title: 'Subscription Active', icon: 'zap', color: 'bg-ninja-yellow text-ninja-dark' },
    { title: 'Subscription Cancelled', icon: 'zap', color: 'bg-purple-100 text-purple-600' }
];

export const triggerCategories = [
    { title: 'User Triggers', description: 'Based on student actions and behavior', available: 8 },
    { title: 'Course Triggers', description: 'Based on progress and course completion', available: 6 },
    { title: 'Payment Triggers', description: 'Based on transactions and subscriptions', available: 4 }
];
