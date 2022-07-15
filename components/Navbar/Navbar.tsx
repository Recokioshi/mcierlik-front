/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  PhoneIcon,
  XIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import logo from '../../assets/images/logo.png'
import Link from 'next/link'
import ScreenReaderSpan from '../Common/ScreenReaderSpan'

export function Navbar() {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <div>
                <ScreenReaderSpan>Workflow</ScreenReaderSpan>
                <Image
                  className="h-8 w-auto sm:h-10 cursor-pointer"
                  src={logo}
                  alt="logo"
                  width={48}
                  height={48}
                />
              </div>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <ScreenReaderSpan>Open menu</ScreenReaderSpan>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Link href="/products">
              <span className="text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer">Products</span>
            </Link>
            <Link href="/about">
              <span className="text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer">About me</span>
            </Link>
            <Link href="/contact">
              <span className="text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer">Contact</span>
            </Link>
          </Popover.Group>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    className="h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                    height={24}
                    width={24}
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <ScreenReaderSpan>Close menu</ScreenReaderSpan>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link href="/products">
                    <span className="text-base font-medium text-gray-900 hover:text-gray-700 cursor-pointer">About me</span> 
                  </Link>
                  <Link href="/about">
                    <span className="text-base font-medium text-gray-900 hover:text-gray-700 cursor-pointer">About me</span> 
                  </Link>
                  <Link href="/contact">
                    <span className="text-base font-medium text-gray-900 hover:text-gray-700 cursor-pointer">Contact</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
