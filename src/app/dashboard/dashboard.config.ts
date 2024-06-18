import {
    ComputerDesktopIcon,
    RectangleGroupIcon,
    ChatBubbleBottomCenterIcon
  } from '@heroicons/react/24/outline'
//   import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'


const dashboardConfig = {
    user: {
        navigation: [
            { name: 'Dashboard', href: '/dashboard', icon: ComputerDesktopIcon},
        ]
    },
    admin: {
        navigation: [
            { name: 'Dashboard', href: '/dashboard', icon: ComputerDesktopIcon},
            { name: 'Mockup', href: '/dashboard/mockup', icon: RectangleGroupIcon},
            { name: 'Chat', href: '/dashboard/mockup/chat', icon: ChatBubbleBottomCenterIcon}
        ]
    } 
};

export default dashboardConfig;
