"use client" 
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image"
import { BellIcon, QrCodeIcon,ChevronDownIcon } from '@heroicons/react/24/outline'

import {PopoverComponent} from "~/common";

import { cn } from "~/lib/utils"

interface AccountProps {
    type: "page" | "dashboard"
}

export default function Account({type}: AccountProps) {

    const { isLoaded, user } = useUser();
  
  
    if (!isLoaded) {
        // Handle loading state however you like
        return null;
    }
  
    return (
        <>
            {type === "page" && (
                <>
                    {/* <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                    <PopoverComponent  icon={<QrCodeIcon className="h-6 w-6 bg-gray-800 text-gray-400 hover:text-white lg:hidden" />} data={"test"}/>
                    <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                    >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </>
            )}
            {type === "dashboard" && (
                <>
                    <PopoverComponent  icon={<QrCodeIcon className="h-6 w-6 lg:hidden" />} data={"test"}/>
                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Separator */}
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
                </>
            )}
            
            <Menu as="div" className="relative ml-3">
                <div>
                    {type === "page" && (
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none  f-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {user && (
                                <Image
                                    className="h-8 w-8 rounded-full"
                                    src={user.imageUrl}
                                    alt=""
                                    width={25}
                                    height={25}
                                    objectFit="contain"
                                />
                            )}
                      </Menu.Button>
                    )}

                    {type === "dashboard" && (
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            {user && (
                                <Image
                                    className="h-8 w-8 rounded-full"
                                    src={user.imageUrl}
                                    alt=""
                                    width={25}
                                    height={25}
                                    objectFit="contain"
                                />
                            )}
                            <span className="hidden lg:flex lg:items-center">
                            <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                {user?.fullName}
                            </span>
                            <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Menu.Button>
                    )}
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                        <p className="text-sm">Signed in as</p>
                        <p className="truncate text-sm font-medium text-gray-900">{user?.emailAddresses[0]?.emailAddress}</p>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="/dashboard"
                            className={cn(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                            Dashboard
                            </a>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="/dashboard/settings"
                            className={cn(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                            Settings
                            </a>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <SignOutButton redirectUrl="/">
                            <span className={cn(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>Sign Out</span>
                            </SignOutButton>
                        )}
                        </Menu.Item>
                    </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
    