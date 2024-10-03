import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

interface Share {
    label: "Share"
}

interface Hide {
    label: "Hide"
}

interface Edit {
    label: "Edit"
}

interface Remove {
    label: "Remove"
}

interface ActionsComponentProps {
    actions: Array<"share" | "hide" | "edit" | "remove">
}


export default function ActionsComponent({ actions }: ActionsComponentProps) {
    if (!actions || actions.length === 0) return null;

    return (
        <Menu as="div" className="relative flex-none">
            <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                {actions.map((item, idx) => (
                    <MenuItem key={idx}>
                        <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 capitalize">
                            {item as unknown as string}
                        </a>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}