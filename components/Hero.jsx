"use client";

import Image from "next/image";
import { ArrowRight, Sparkles, Globe, Users, Zap, Star, Eye } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { CornerRightDown } from "lucide-react";
import { useLanguage } from "./utils/language-provider";

export default function Hero() {
  const { isSignedIn } = useUser();
  const { isArabic } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-14 px-6 md:px-20 lg:px-32" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Language Toggle */}
      <div className="absolute top-6 right-6">
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {isArabic ? 'العربية' : 'English'}
        </Button>
      </div>

      {/* GitHub Contribution Banner */}
      <div className="border mb-8 w-fit mx-auto py-2 px-4 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <a
          className="hover:underline transition-all duration-300"
          href="https://github.com/r2hu1/mysocials"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-sm flex items-center justify-center gap-2 text-purple-700 dark:text-purple-300">
            <Star className="h-4 w-4" />
            {isArabic ? 'ساهم في هذا المشروع على GitHub' : 'Contribute to this project on GitHub'}
            <ArrowRight className="h-4 w-4" />
          </p>
        </a>
      </div>

      {/* Main Hero Content */}
      <div className="grid place-content-center sm:text-center gap-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            {isArabic ? 'مجاني للأبد' : 'Free Forever'}
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            <Users className="h-4 w-4" />
            {isArabic ? '+1000 مستخدم' : '1000+ Users'}
          </div>
        </div>

        <h1 className="text-4xl text-center max-w-md sm:max-w-3xl md:max-w-5xl sm:text-5xl font-bold md:text-7xl text-gray-900 dark:text-gray-50 leading-tight">
          {isArabic ? 'شارك جميع وسائل التواصل الاجتماعي الخاصة بك في' : 'Share all your socials in'}{" "}
          <span className="relative">
            <span className="animate-text-gradient inline-flex bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-size-[200%_auto] bg-clip-text leading-tight text-transparent">
              {isArabic ? 'رابط واحد.' : 'one single link.'}
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full animate-pulse"></div>
          </span>
        </h1>

        <p className="md:text-xl text-base sm:text-lg text-[15px] max-w-sm md:max-w-2xl text-center sm:mx-auto text-foreground/70 mt-4 leading-relaxed">
          {isArabic 
            ? 'أنشئ مركزك الاجتماعي الشخصي مع MySocials — رابط واحد جميل يربط جميع ملفاتك الشخصية ومحتواك وفرصك في مكان واحد. مثالي للمبدعين والمحترفين وأي شخص يريد تبسيط وجوده عبر الإنترنت.'
            : 'Create your personalized social hub with MySocials — one beautiful link that connects all your profiles, content, and opportunities in one place. Perfect for creators, professionals, and anyone who wants to simplify their online presence.'
          }
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800">
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {isArabic ? 'سريع كالبرق' : 'Lightning Fast'}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800">
            <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {isArabic ? 'تصميم جميل' : 'Beautiful Design'}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
            <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {isArabic ? 'مشاركة سهلة' : 'Easy Sharing'}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
        <Button asChild size="lg" className="gap-3 px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <Link
            href={!isSignedIn ? "/sign-in" : "/dashboard/manage"}
            className="gap-2"
          >
            <Sparkles className="h-5 w-5" />
            {isArabic ? 'أنشئ رابطك' : 'Create Your Link'}
            <CornerRightDown className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="gap-3 px-8 py-3 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-900 transform hover:scale-105 transition-all duration-300">
          <Link
            href="https://mysocialz.vercel.app/r2hu1"
            className="flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Eye className="h-5 w-5" />
            {isArabic ? 'معاينة المثال' : 'Preview Example'}
            <ArrowRight className="h-5 w-4 -rotate-45" />
          </Link>
        </Button>
      </div>

      {/* How It Works Section */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
          {isArabic ? 'كيف يعمل' : 'How It Works'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">
              {isArabic ? 'إنشاء حساب' : 'Sign Up'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {isArabic ? 'أنشئ حسابك في ثوانٍ بنقرات قليلة' : 'Create your account in seconds with just a few clicks'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">
              {isArabic ? 'أضف روابطك' : 'Add Your Links'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {isArabic ? 'اربط جميع ملفات وسائل التواصل الاجتماعي والمواقع الإلكترونية' : 'Connect all your social media profiles and websites'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">
              {isArabic ? 'شارك وتواصل' : 'Share & Connect'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {isArabic ? 'شارك رابطك الوحيد وابدأ التواصل مع الآخرين' : 'Share your single link and start connecting with others'}
            </p>
          </div>
        </div>
      </div>

      {/* Preview Image */}
      <div className="mt-20 w-fit h-fit mx-auto">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-2xl">
            <img
              className="rounded-xl transform group-hover:scale-105 transition-transform duration-500"
              src="/assets/homepage-dark.png"
              alt={isArabic ? 'معاينة MySocials' : 'MySocials Preview'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
