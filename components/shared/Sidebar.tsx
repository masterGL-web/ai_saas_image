"use client";

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button';

const Sidebar = () => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar transition-all duration-300 bg-white dark:bg-gray-900 shadow-lg
      ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex size-full flex-col gap-4 h-full">
        {/* Header with toggle */}
        <div className="flex items-center justify-between px-4 pt-4">
          {!collapsed && (
            <Link href="/" className="sidebar-logo">
              <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-700 dark:text-gray-300 text-lg p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav mt-4 flex-1 overflow-auto">
          <SignedIn>
            <ul className={`sidebar-nav_elements space-y-1 ${collapsed ? 'w-16' : 'w-full'} transition-all duration-300`}>
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`
                      relative group overflow-hidden
                      rounded-xl
                      transition-all duration-300
                      cursor-pointer
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'}
                    `}
                  >
                    {/* Left indicator bar */}
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md animate-slideIn" />
                    )}

                    <Link
                      href={link.route}
                      className={`flex items-center px-4 py-3 transition-all duration-300
                        ${collapsed ? 'justify-center' : 'gap-4'}`}
                    >
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={20}
                        height={20}
                        className={`transition duration-300 ${isActive ? 'brightness-200' : 'group-hover:brightness-125'
                          }`}
                      />
                      {!collapsed && (
                        <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
                          {link.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>


            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`
                      relative group overflow-hidden
                      rounded-xl
                      transition-all duration-300
                      cursor-pointer
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'}
                    `}
                  >
                    {/* Left indicator bar */}
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md animate-slideIn" />
                    )}

                    <Link
                      href={link.route}
                      className={`flex items-center px-4 py-3 transition-all duration-300
                        ${collapsed ? 'justify-center' : 'gap-4'}`}
                    >
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={20}
                        height={20}
                        className={`transition duration-300 ${isActive ? 'brightness-200' : 'group-hover:brightness-125'
                          }`}
                      />
                      {!collapsed && (
                        <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
                          {link.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName={true} />
              </li>
            </ul>
          </SignedIn>



          <SignedOut>
            <Button asChild className="bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

