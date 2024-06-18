"use client"


import { SignInButton, SignedIn, SignedOut} from "@clerk/nextjs";

import { Disclosure} from '@headlessui/react'
import { Account } from "~/common";

import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'

import { cn } from "~/lib/utils"
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import navbarData from './navbar.json';

export default function Navbar() {
  
  const pathname = usePathname()
  const pageId = pathname.split('/')[1]

  

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center sm:block">
                  <Link href="/">
                    <Image
                      className="h-8 w-auto sm:hidden"
                      src="/icon.png"
                      alt="Icon"
                      width={100}
                      height={100}
                      objectFit="contain"
                    />
                    <Image
                      className="h-8 w-auto hidden sm:block"
                      src="/logo.png"
                      alt="Logo"
                      width={200}
                      height={200}
                      objectFit="contain"
                    />
                  </Link>
                </div>
                
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    
                    {navbarData.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          item.id === pageId ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.id === pageId ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-3">
                
                <SignedOut>
                  <SignInButton afterSignInUrl="/dashboard" afterSignUpUrl='/onboarding' mode="modal">
                    <span className="text-gray-300 hover:bg-gray-700 hover:text-white">Sign in</span>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Account type="page" />
                </SignedIn>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
             {navbarData.map((item) => (
                <Disclosure.Button
                  key={item.id}
                  as="a"
                  href={item.href}
                  className={cn(
                    item.id === pageId ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.id === pageId ? 'page' : undefined}
                >
                  {item.label}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
