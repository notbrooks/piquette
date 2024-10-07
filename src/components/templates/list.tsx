import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

interface ListTemplateProps {
    children: React.ReactNode;
}

export function ListContainer({ children }: ListTemplateProps) {
    return (
        <ul role="list" className="divide-y divide-gray-100  bg-white border border-gray-200 rounded-lg">
            {children}
        </ul>
    )
}

export function ListItem({ children }: ListTemplateProps) {
    return (
        <li className="flex items-center justify-between gap-x-6 py-5">
            {children}
        </li>
    )
}