import { TrashIcon, StarIcon, ShareIcon, HomeIcon } from '@heroicons/react/24/outline'

export const piquetteConfig = {
    meta: {
        id: 'piquette',
        title: 'Piquette',
        description: 'Piquette is a free and open-source platform for creating and managing your own Pikette database.',
    },
    navbar: {
        display: true,
        links: [
            { id: 'about', label: 'About', href: '/about' },
            { id: 'contact', label: 'Contact', href: '/contact' },
            { id: 'blog', label: 'Blog', href: '/blog' },
            { id: 'faq', label: 'FAQ', href: '/faq' },
        ]
    },
    footer: {
        display: true,
        newsletter: {
            display: false,
            title: 'Subscribe to our newsletter',
            description: 'The latest news, articles, and resources, sent to your inbox weekly.',
            placeholder: 'Enter your email',
            button: 'Subscribe'
        },
        social: [
            {
                id: 'github',
                name: 'GitHub',
                href: 'https://github.com/notbrooks/piquette',
            },
        ],
        columns: [
            { 
                header: "Solutions", links: [
                    { label: 'Marketing', href: '#' },
                    { label: 'Analytics', href: '#' },
                    { label: 'Commerce', href: '#' },
                    { label: 'Insights', href: '#' },
                ],
            },
            { 
                header: "Support", links: [
                    { label: 'Pricing', href: '#' },
                    { label: 'Documentation', href: '#' },
                    { label: 'Guides', href: '#' },
                    { label: 'API Status', href: '#' },
                ],
            },
            { 
                header: "Company", links: [
                    { label: 'About', href: '#' },
                    { label: 'Blog', href: '#' },
                    { label: 'Jobs', href: '#' },
                    { label: 'Press', href: '#' },
                    { label: 'Partners', href: '#' },
                ],
            },
            { 
                header: "Legal", links: [
                    { label: 'Claim', href: '#' },
                    { label: 'Privacy', href: '#' },
                    { label: 'Terms', href: '#' },
                ],
            },
        ]

    },
    app: {
        features: [
            {id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: HomeIcon},
        ],
        services: [
            {id: 'favorites', label: 'Favorites', href: '/dashboard/favorites', icon: StarIcon},
            {id: 'archive', label: 'Archive', href: '/dashboard/archives', icon: TrashIcon},
            {id: 'shared', label: 'Shared', href: '/dashboard/shared', icon: ShareIcon},
        ],
    }
}