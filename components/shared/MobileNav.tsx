"use client";
import {Sheet,SheetContent,SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react";
import { Button } from "../ui/button";

const MobileNav = () => {
    const pathname = usePathname()
    const [collapsed, _setCollapsed] = useState(false);// hedi te3  _  : me3netha tejehel setCollapsed

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28}></Image>
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <Image 
              src="/assets/icons/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
             <Image
             src="/assets/images/logo-text.svg"
             alt="logo"
             width={152}
             height={23}
             />
             <ul className={`header-nav_elements space-y-1 ${collapsed ? 'w-16' : 'w-full'} transition-all duration-300`}>
              {navLinks.map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                   className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}
                    key={link.route}
                    
                  >
                    {/* Left indicator bar */}
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md animate-slideIn" />
                    )}

                    <Link
                      href={link.route}
                      className={`flex items-center px-4 py-3 transition-all duration-300 cursor-pointer
                        ${collapsed ? 'justify-center' : 'gap-4'}`}
                    >
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={20}
                        height={20}
                       
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

              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        
        <SignedOut>
            <Button asChild className="bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

      </nav>
    </header>
  )
}

export default MobileNav