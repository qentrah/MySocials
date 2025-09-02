"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Logo from "./Logo";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Menu, X, Globe, User, Settings, LogOut, Home, Plus, BarChart3 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "./utils/language-provider";

export default function Header() {
  const { user, isSignedIn, signOut } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, changeLanguage, isArabic } = useLanguage();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    changeLanguage(newLanguage);
  };

  const navigation = [
    { name: isArabic ? 'الرئيسية' : 'Home', href: "/", icon: Home },
    { name: isArabic ? 'المميزات' : 'Features', href: "#features", icon: BarChart3 },
    { name: isArabic ? 'الأسعار' : 'Pricing', href: "#pricing", icon: BarChart3 },
  ];

  const userMenuItems = [
    { name: isArabic ? 'لوحة التحكم' : 'Dashboard', href: "/dashboard/manage", icon: User },
    { name: isArabic ? 'الإعدادات' : 'Settings', href: "/user-profile/profile", icon: Settings },
    { name: isArabic ? 'إنشاء جديد' : 'Create New', href: "/dashboard/manage", icon: Plus },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo />
          <span className="hidden sm:inline-block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MySocials
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLanguageChange}
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm"
          >
            <Globe className="h-4 w-4" />
            {isArabic ? "العربية" : "English"}
          </Button>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Menu */}
          {isSignedIn ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="flex items-center gap-2 px-3 py-2"
              >
                <img
                  src={user?.imageUrl}
                  alt={user?.firstName || "User"}
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden sm:inline-block text-sm font-medium">
                  {user?.firstName || "User"}
                </span>
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-background border rounded-lg shadow-lg py-2 z-50">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t my-2" />
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 w-full transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild size="sm">
                <Link href="/sign-in">{isArabic ? 'تسجيل الدخول' : 'Sign In'}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">{isArabic ? 'ابدأ الآن' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile User Menu */}
            {isSignedIn && (
              <>
                <div className="border-t pt-4">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {isArabic ? 'الحساب' : 'Account'}
                  </div>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 w-full rounded-md transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
                  </button>
                </div>
              </>
            )}

            {/* Mobile Language Toggle */}
            <div className="border-t pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLanguageChange}
                className="w-full justify-start px-4 py-2 text-sm"
              >
                <Globe className="h-4 w-4 mr-3" />
                {isArabic ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
