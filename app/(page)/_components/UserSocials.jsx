"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Facebook, 
  Github, 
  Snapchat, 
  Youtube, 
  Linkedin, 
  Twitter, 
  MessageCircle, 
  Reddit,
  StackOverflow,
  Code,
  Code2,
  Trophy,
  Code3,
  BookOpen,
  Twitch,
  Music,
  Spotify,
  Music2,
  MessageSquare,
  Send,
  MessageCircle2,
  Phone,
  ShoppingCart,
  Store,
  Heart,
  Coffee,
  Gift,
  Globe,
  FileText,
  Mail,
  PhoneCall,
  ExternalLink,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  github: Github,
  snapchat: Snapchat,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  threads: MessageCircle,
  reddit: Reddit,
  stackoverflow: StackOverflow,
  leetcode: Code,
  codeforces: Code2,
  hackerrank: Trophy,
  codechef: Code3,
  geeksForGeeks: BookOpen,
  twitch: Twitch,
  soundcloud: Music,
  spotify: Spotify,
  applemusic: Music2,
  discord: MessageSquare,
  telegram: Send,
  whatsapp: MessageCircle2,
  skype: Phone,
  amazon: ShoppingCart,
  shopify: Store,
  kofi: Heart,
  buyMeACoffee: Coffee,
  patreon: Gift,
  website: Globe,
  blog: FileText,
  email: Mail,
  phone: PhoneCall,
};

const socialCategories = {
  social: ['youtube', 'instagram', 'facebook', 'snapchat', 'twitter', 'threads', 'reddit'],
  professional: ['linkedin', 'github', 'stackoverflow', 'leetcode', 'codeforces', 'hackerrank', 'codechef', 'geeksForGeeks'],
  creative: ['twitch', 'soundcloud', 'spotify', 'applemusic'],
  messaging: ['discord', 'telegram', 'whatsapp', 'skype'],
  storefront: ['amazon', 'shopify', 'kofi', 'buyMeACoffee', 'patreon'],
  miscellaneous: ['website', 'blog', 'email', 'phone']
};

const categoryNames = {
  social: 'Social Media',
  professional: 'Professional',
  creative: 'Creative',
  messaging: 'Messaging',
  storefront: 'Storefront',
  miscellaneous: 'Miscellaneous'
};

const categoryNamesAr = {
  social: 'وسائل التواصل الاجتماعي',
  professional: 'مهني',
  creative: 'إبداعي',
  messaging: 'الرسائل',
  storefront: 'المتجر',
  miscellaneous: 'متنوعات'
};

const categoryColors = {
  social: 'from-pink-500 to-rose-500',
  professional: 'from-blue-500 to-indigo-500',
  creative: 'from-purple-500 to-pink-500',
  messaging: 'from-green-500 to-emerald-500',
  storefront: 'from-orange-500 to-red-500',
  miscellaneous: 'from-gray-500 to-slate-500'
};

export default function UserSocials({ userData, accessKey, language = 'en' }) {
  const [showPrivateLinks, setShowPrivateLinks] = useState(false);
  const [enteredKey, setEnteredKey] = useState('');
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const isArabic = language === 'ar';

  // Debug: Log the userData to see what we're working with
  console.log('UserSocials received userData:', userData);

  const handleKeySubmit = (e) => {
    e.preventDefault();
    if (enteredKey === accessKey) {
      setIsKeyValid(true);
      setShowPrivateLinks(true);
      console.log('Access key validated, showing private links');
    } else {
      setIsKeyValid(false);
      console.log('Invalid access key entered');
    }
  };

  const getSocialLinks = () => {
    const links = [];
    
    console.log('Processing social links for userData:', userData);
    
    Object.entries(socialCategories).forEach(([category, platforms]) => {
      const categoryLinks = platforms
        .map(platform => {
          const value = userData[platform];
          console.log(`Checking platform ${platform}:`, value);
          
          if (value && value.trim() !== '') {
            return { platform, value, category };
          }
          return null;
        })
        .filter(Boolean);

      if (categoryLinks.length > 0) {
        links.push({
          category,
          links: categoryLinks
        });
        console.log(`Category ${category} has ${categoryLinks.length} links:`, categoryLinks);
      }
    });

    console.log('Total social links found:', links);
    return links;
  };

  const socialLinks = getSocialLinks();

  // Debug: Log the final social links
  console.log('Final social links to render:', socialLinks);

  if (socialLinks.length === 0) {
    return (
      <Card className="text-center py-12 bg-muted/30">
        <CardContent>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Globe className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {isArabic ? 'لا توجد روابط اجتماعية بعد' : 'No Social Links Yet'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic ? 'لم يضف هذا المستخدم أي روابط لوسائل التواصل الاجتماعي إلى ملفه الشخصي.' : 'This user hasn\'t added any social media links to their profile.'}
              </p>
              {/* Debug info in development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-3 bg-muted rounded text-xs text-muted-foreground">
                  <p>Debug: userData keys: {Object.keys(userData || {}).join(', ')}</p>
                  <p>Debug: userData values: {JSON.stringify(userData, null, 2)}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Private Links Access */}
      {accessKey && !showPrivateLinks && (
        <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto">
                <Lock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
                  {isArabic ? 'روابط خاصة متاحة' : 'Private Links Available'}
                </h3>
                <p className="text-orange-700 dark:text-orange-300 mb-4">
                  {isArabic ? 'هذا المستخدم لديه روابط خاصة. أدخل مفتاح الوصول لعرضها.' : 'This user has private links. Enter the access key to view them.'}
                </p>
                <form onSubmit={handleKeySubmit} className="flex gap-2 max-w-sm mx-auto">
                  <input
                    type="password"
                    value={enteredKey}
                    onChange={(e) => setEnteredKey(e.target.value)}
                    placeholder={isArabic ? 'أدخل مفتاح الوصول' : 'Enter access key'}
                    className="flex-1 px-3 py-2 border border-orange-200 dark:border-orange-800 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <Button type="submit" size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                </form>
                {enteredKey && !isKeyValid && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                    {isArabic ? 'مفتاح وصول غير صحيح. يرجى المحاولة مرة أخرى.' : 'Invalid access key. Please try again.'}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Links by Category */}
      {socialLinks.map((categoryData) => (
        <div key={categoryData.category} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-1 h-6 bg-gradient-to-b ${categoryColors[categoryData.category]} rounded-full`}></div>
            <h3 className="text-lg font-semibold text-foreground">
              {isArabic ? categoryNamesAr[categoryData.category] : categoryNames[categoryData.category]}
            </h3>
            <Badge variant="secondary" className="ml-auto">
              {categoryData.links.length} {isArabic ? 'رابط' : 'link'}{categoryData.links.length !== 1 ? (isArabic ? 'ات' : 's') : ''}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryData.links.map(({ platform, value, category }) => {
              // Skip private links if not authenticated
              if (category === 'miscellaneous' && accessKey && !showPrivateLinks) {
                return null;
              }

              const Icon = socialIcons[platform];
              const isExternal = value.startsWith('http');
              const isMailto = value.startsWith('mailto:');
              const isTel = value.startsWith('tel:');

              // Ensure the value is properly formatted for different link types
              let displayValue = value;
              let hrefValue = value;

              if (isMailto && !value.includes('@')) {
                hrefValue = `mailto:${value}`;
              } else if (isTel && !value.startsWith('tel:')) {
                hrefValue = `tel:${value}`;
              } else if (!isExternal && !isMailto && !isTel && !value.includes('@')) {
                // If it's not a URL and not email/phone, assume it's a website
                hrefValue = `https://${value}`;
                displayValue = value;
              }

              console.log(`Rendering link for ${platform}:`, { value, hrefValue, displayValue });

              return (
                <Card
                  key={platform}
                  className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 ${
                    hoveredLink === platform ? 'scale-105' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHoveredLink(platform)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <CardContent className="p-4">
                    <a
                      href={hrefValue}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : ""}
                      className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-200"
                      onClick={(e) => {
                        console.log(`Clicked on ${platform} link:`, hrefValue);
                      }}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[category]} bg-opacity-10 dark:bg-opacity-20`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium capitalize truncate">
                          {platform === 'buyMeACoffee' ? (isArabic ? 'اشتري لي قهوة' : 'Buy Me a Coffee') : 
                           platform === 'geeksForGeeks' ? 'GeeksforGeeks' :
                           platform === 'applemusic' ? (isArabic ? 'آبل ميوزك' : 'Apple Music') :
                           platform === 'stackoverflow' ? (isArabic ? 'ستاك أوفرفلو' : 'Stack Overflow') :
                           platform === 'leetcode' ? (isArabic ? 'ليت كود' : 'LeetCode') :
                           platform === 'codeforces' ? (isArabic ? 'كودفورسز' : 'Codeforces') :
                           platform === 'hackerrank' ? (isArabic ? 'هاكر رانك' : 'HackerRank') :
                           platform === 'codechef' ? (isArabic ? 'كود شيف' : 'CodeChef') :
                           platform === 'geeksForGeeks' ? (isArabic ? 'جيكس فور جيكس' : 'GeeksforGeeks') :
                           platform === 'twitch' ? (isArabic ? 'تويتش' : 'Twitch') :
                           platform === 'soundcloud' ? (isArabic ? 'ساوند كلاود' : 'SoundCloud') :
                           platform === 'spotify' ? (isArabic ? 'سبوتيفاي' : 'Spotify') :
                           platform === 'discord' ? (isArabic ? 'ديسكورد' : 'Discord') :
                           platform === 'telegram' ? (isArabic ? 'تلجرام' : 'Telegram') :
                           platform === 'whatsapp' ? (isArabic ? 'واتساب' : 'WhatsApp') :
                           platform === 'skype' ? (isArabic ? 'سكايب' : 'Skype') :
                           platform === 'amazon' ? (isArabic ? 'أمازون' : 'Amazon') :
                           platform === 'shopify' ? (isArabic ? 'شوبيفاي' : 'Shopify') :
                           platform === 'kofi' ? (isArabic ? 'كو في' : 'Ko-fi') :
                           platform === 'patreon' ? (isArabic ? 'باتريون' : 'Patreon') :
                           platform === 'website' ? (isArabic ? 'الموقع الشخصي' : 'Personal Website') :
                           platform === 'blog' ? (isArabic ? 'المدونة' : 'Blog') :
                           platform === 'email' ? (isArabic ? 'البريد الإلكتروني' : 'Email') :
                           platform === 'phone' ? (isArabic ? 'الهاتف' : 'Phone') :
                           platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {isMailto ? (isArabic ? 'إرسال بريد إلكتروني' : 'Send Email') : 
                           isTel ? (isArabic ? 'اتصل الآن' : 'Call Now') : 
                           isExternal ? (isArabic ? 'زيارة الرابط' : 'Visit Link') : displayValue}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="border-dashed border-muted-foreground/30">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">
              <p><strong>Debug Info:</strong></p>
              <p>Total categories: {socialLinks.length}</p>
              <p>Total links: {socialLinks.reduce((acc, cat) => acc + cat.links.length, 0)}</p>
              <p>User data keys: {Object.keys(userData || {}).join(', ')}</p>
              <p>Access key present: {!!accessKey}</p>
              <p>Private links shown: {showPrivateLinks}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
