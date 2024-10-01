"use client"
import { SignOutButton} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface AccountDropdownCompomentProps {
    user?: {
        imageUrl: string;
        fullName?: string;
    };
    showName?: boolean;
}

export default function AccountDropdownComponent({ user, showName }: AccountDropdownCompomentProps) {



    return (
        <Menu as="div" className="relative ml-3">
    
        <MenuButton className="relative flex rounded-full text-sm">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            {user?.imageUrl && (
                <Image
                    alt="Avatar"
                    src={(user as { imageUrl: string }).imageUrl}
                    className="h-8 w-8 rounded-full"
                    width={256}
                    height={256}
                />
            )}
            {
                showName && <span className="hidden lg:flex lg:items-center pt-1">
                    <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                        {user?.fullName ?? ""}
                    </span>
                    <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                </span>
            }
            
        </MenuButton>
    
        <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
            <MenuItem>
            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                Dashboard
            </Link>
            </MenuItem>
            <MenuItem>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                Your Profile
            </a>
            </MenuItem>
            <MenuItem>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                Settings
            </a>
            </MenuItem>
            <MenuItem>
            <SignOutButton redirectUrl="/">
                <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Logout
                </span>
            </SignOutButton>
            
            </MenuItem>
        </MenuItems>
        </Menu>
    )
}
