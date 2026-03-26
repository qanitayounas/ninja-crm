import {
    Image,
    FileText,
    Video,
    FileCode,
    Package,
    Archive
} from 'lucide-react';

export const mediaStats = [
    { label: 'Total Files', value: '2,847', color: 'bg-ninja-yellow/10' },
    { label: 'Storage Used', value: '4.97 GB', color: 'bg-purple-100' },
    { label: 'Folders', value: '24', color: 'bg-yellow-50' }, // Soft yellow
    { label: 'Shared Files', value: '156', color: 'bg-purple-50' } // Soft purple
];

export const mediaFolders = [
    {
        name: 'Product Images',
        count: 124,
        size: '2.4 GB',
        color: 'bg-yellow-100', // Matches yellow-ish folder icon bg
        icon: Image
    },
    {
        name: 'Marketing Materials',
        count: 87,
        size: '1.8 GB',
        color: 'bg-purple-100', // Matches purple folder icon bg
        icon: FileText
    },
    {
        name: 'Logos & Branding',
        count: 45,
        size: '320 MB',
        color: 'bg-ninja-yellow/20', // Matches greenish-yellow icon bg
        icon: Package
    },
    {
        name: 'Documents',
        count: 156,
        size: '450 MB',
        color: 'bg-purple-100', // Matches purple folder icon bg
        icon: FileText
    }
];

export const recentFiles = [
    {
        name: 'product-hero-banner.jpg',
        size: '2.4 MB',
        date: 'Mar 10, 2026',
        type: 'image',
        color: 'bg-yellow-100',
        icon: Image
    },
    {
        name: 'company-logo.svg',
        size: '145 KB',
        date: 'Mar 9, 2026',
        type: 'vector',
        color: 'bg-purple-100',
        icon: FileCode
    },
    {
        name: 'email-template.html',
        size: '38 KB',
        date: 'Mar 8, 2026',
        type: 'code',
        color: 'bg-teal-50',
        icon: FileCode
    },
    {
        name: 'sales-presentation.pdf',
        size: '8.2 MB',
        date: 'Mar 7, 2026',
        type: 'document',
        color: 'bg-orange-50',
        icon: FileText
    },
    {
        name: 'product-demo-video.mp4',
        size: '45.8 MB',
        date: 'Mar 6, 2026',
        type: 'video',
        color: 'bg-blue-50',
        icon: Video
    },
    {
        name: 'social-post-image.png',
        size: '1.8 MB',
        date: 'Mar 5, 2026',
        type: 'image',
        color: 'bg-yellow-50',
        icon: Image
    },
    {
        name: 'brand-guidelines.pdf',
        size: '12.4 MB',
        date: 'Mar 4, 2026',
        type: 'document',
        color: 'bg-orange-50',
        icon: FileText
    },
    {
        name: 'icon-set.zip',
        size: '2.1 MB',
        date: 'Mar 3, 2026',
        type: 'archive',
        color: 'bg-gray-100',
        icon: Archive
    }
];
