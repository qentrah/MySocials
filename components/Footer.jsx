"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Github, Twitter, Mail, Heart, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const isArabic = language === 'ar';

  const footerLinks = {
    product: [
      { name: isArabic ? 'المميزات' : 'Features', href: "#features" },
      { name: isArabic ? 'الأسعار' : 'Pricing', href: "#pricing" },
      { name: isArabic ? 'الأمثلة' : 'Examples', href: "#examples" },
      { name: 'API', href: "#api" },
    ],
    company: [
      { name: isArabic ? 'حول' : 'About', href: "#about" },
      { name: isArabic ? 'المدونة' : 'Blog', href: "#blog" },
      { name: isArabic ? 'الوظائف' : 'Careers', href: "#careers" },
      { name: isArabic ? 'اتصل بنا' : 'Contact', href: "#contact" },
    ],
    support: [
      { name: isArabic ? 'مركز المساعدة' : 'Help Center', href: "#help" },
      { name: isArabic ? 'الوثائق' : 'Documentation', href: "#docs" },
      { name: isArabic ? 'الحالة' : 'Status', href: "#status" },
      { name: isArabic ? 'المجتمع' : 'Community', href: "#community" },
    ],
    legal: [
      { name: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy', href: "#privacy" },
      { name: isArabic ? 'شروط الخدمة' : 'Terms of Service', href: "#terms" },
      { name: isArabic ? 'سياسة الكوكيز' : 'Cookie Policy', href: "#cookies" },
      { name: 'GDPR', href: "#gdpr" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/r2hu1/mysocials", icon: Github },
    { name: "Twitter", href: "https://twitter.com/mysocials", icon: Twitter },
    { name: isArabic ? 'البريد الإلكتروني' : 'Email', href: "mailto:contact@mysocials.com", icon: Mail },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MySocials
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              {isArabic 
                ? 'أنشئ مركزك الاجتماعي الشخصي مع رابط واحد جميل يربط جميع ملفاتك الشخصية ومحتواك وفرصك.'
                : 'Create your personalized social hub with one beautiful link that connects all your profiles, content, and opportunities.'
              }
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {isArabic ? 'المنتج' : 'Product'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {isArabic ? 'الشركة' : 'Company'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {isArabic ? 'الدعم' : 'Support'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {isArabic ? 'قانوني' : 'Legal'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-foreground mb-2">
              {isArabic ? 'ابق محدثاً' : 'Stay updated'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isArabic 
                ? 'احصل على أحدث التحديثات والمميزات التي يتم تسليمها إلى صندوق الوارد الخاص بك.'
                : 'Get the latest updates and features delivered to your inbox.'
              }
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="flex-1 px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button size="sm" className="px-4">
                {isArabic ? 'اشتراك' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} MySocials. {isArabic ? 'صنع بـ' : 'Made with'}</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>{isArabic ? 'من المجتمع' : 'by the community'}</span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              {isArabic ? 'العودة للأعلى' : 'Back to top'}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
