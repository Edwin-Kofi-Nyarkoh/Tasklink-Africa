"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Menu,
  Search,
  ShoppingCart,
  Settings,
  LogOut,
  MessageSquare,
  Calendar,
  Home,
  Users,
  Briefcase,
  HelpCircle,
  BookOpen,
  LogIn,
  UserPlus,
} from "lucide-react"
import { useBookingStore } from "@/lib/store"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useLanguage } from "./language-provider"
export function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useBookingStore()
  const { t } = useLanguage()

  const totalBookedHours = items.reduce((total, item) => total + item.estimatedHours, 0)

  const navigation = [
    { name: t("nav.home"), href: "/", icon: Home },
    { name: t("nav.findWorkers"), href: "/workers", icon: Users },
    { name: t("nav.services"), href: "/services", icon: Briefcase },
    { name: t("nav.howItWorks"), href: "/how-it-works", icon: HelpCircle },
    { name: t("nav.help"), href: "/help", icon: HelpCircle },
    { name: t("nav.blog"), href: "/blog", icon: BookOpen },
  ]

  const userNavigation = [
    { name: t("nav.dashboard"), href: "/dashboard", icon: Home },
    { name: t("nav.myBookings"), href: "/bookings", icon: Calendar },
    { name: t("nav.messages"), href: "/messages", icon: MessageSquare },
    { name: t("nav.settings"), href: "/settings", icon: Settings },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TL</span>
              </div>
              <span className=" sm:hidden font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                TaskLink
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Mobile Optimized */}
          <div className="flex items-center space-x-2">
            {/* Desktop Only Elements */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <LanguageSwitcher />
              <ModeToggle />
            </div>

            {/* Cart - Always Visible */}
            <Link href="/bookings/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalBookedHours > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalBookedHours}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Desktop User Menu */}
            {session ? (
              <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {session.user?.name && <p className="font-medium">{session.user.name}</p>}
                        {session.user?.email && (
                          <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    {userNavigation.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onSelect={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("auth.signOut")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">{t("auth.signIn")}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">{t("auth.signUp")}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu - Always Visible on Small Screens */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-6 mt-6">
                  {/* User Info Section */}
                  {session && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-medium text-sm">{session.user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">
                      {t("nav.navigation")}
                    </h3>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* User Account Links */}
                  {session && (
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">
                        {t("nav.account")}
                      </h3>
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          signOut()
                          setIsOpen(false)
                        }}
                        className="flex items-center space-x-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t("auth.signOut")}</span>
                      </button>
                    </div>
                  )}

                  {/* Auth Buttons for Non-Authenticated Users */}
                  {!session && (
                    <div className="space-y-3 pt-4 border-t">
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                          <LogIn className="mr-2 h-4 w-4" />
                          {t("auth.signIn")}
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" asChild>
                        <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          {t("auth.signUp")}
                        </Link>
                      </Button>
                    </div>
                  )}

                  {/* Mobile Settings */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center justify-between px-3">
                      <span className="text-sm font-medium">{t("nav.language")}</span>
                      <LanguageSwitcher />
                    </div>
                    <div className="flex items-center justify-between px-3">
                      <span className="text-sm font-medium">Theme</span>
                      <ModeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
