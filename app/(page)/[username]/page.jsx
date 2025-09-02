"use client";

import { notFound } from "next/navigation";
import UserSocials from "../_components/UserSocials";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, ArrowRight, Globe, Users, Sparkles, Eye, Copy, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { useToast } from "@/components/ui/use-toast";

function UserProfilePage({ params }) {
  // Unwrap params using React.use() for Next.js 15 compatibility
  const resolvedParams = use(params);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching user data for username:', resolvedParams.username);
        
        const res = await fetch(`/api/page/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: resolvedParams.username }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error('API response not ok:', res.status, errorData);
          setError(`Failed to fetch user data: ${res.status}`);
          setUserData(null);
        } else {
          const data = await res.json();
          console.log('User data received:', data);
          
          if (data.data) {
            setUserData(data.data);
          } else {
            console.error('No user data in response:', data);
            setError('No user data found');
            setUserData(null);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(`Error: ${error.message}`);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    }

    if (resolvedParams.username) {
      fetchUserData();
    }
  }, [resolvedParams.username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">
              {language === 'ar' ? 'جاري تحميل الملف الشخصي...' : 'Loading profile...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {language === 'ar' ? 'خطأ في تحميل الملف الشخصي' : 'Error Loading Profile'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {error}
            </p>
            <Button asChild>
              <Link href="/">
                {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    notFound();
  }

  // Debug: Log user data to see what we have
  console.log('Rendering user profile with data:', userData);

  const socialCount = [
    userData.youtube, userData.instagram, userData.facebook, userData.github,
    userData.snapchat, userData.linkedin, userData.twitter, userData.threads,
    userData.reddit, userData.stackoverflow, userData.leetcode, userData.codeforces,
    userData.hackerrank, userData.codechef, userData.geeksForGeeks, userData.twitch,
    userData.soundcloud, userData.spotify, userData.applemusic, userData.discord,
    userData.telegram, userData.whatsapp, userData.skype, userData.amazon,
    userData.shopify, userData.kofi, userData.buyMeACoffee, userData.patreon,
    userData.website, userData.blog, userData.email, userData.phone
  ].filter(link => link && link.trim() !== '').length;

  const copyProfileLink = async () => {
    try {
      const currentUrl = window.location.href;
      console.log('Copying profile link:', currentUrl);
      
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: language === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!',
        description: language === 'ar' ? 'تم نسخ رابط ملفك الشخصي إلى الحافظة' : 'Your profile link has been copied to clipboard',
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: language === 'ar' ? 'خطأ في النسخ' : 'Copy failed',
        description: language === 'ar' ? 'فشل في نسخ الرابط' : 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  const shareProfile = async () => {
    const currentUrl = window.location.href;
    const profileTitle = `${userData.name || userData.username}'s Profile`;
    const shareText = language === 'ar' 
      ? `تحقق من ملف ${userData.name || userData.username} الشخصي على وسائل التواصل الاجتماعي`
      : `Check out ${userData.name || userData.username}'s social media profile`;

    console.log('Sharing profile:', { currentUrl, profileTitle, shareText });

    if (navigator.share) {
      try {
        await navigator.share({
          title: profileTitle,
          text: shareText,
          url: currentUrl,
        });
        console.log('Profile shared successfully');
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to copy if sharing fails
        copyProfileLink();
      }
    } else {
      console.log('Native sharing not supported, falling back to copy');
      copyProfileLink();
    }
  };

  const isArabic = language === 'ar';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto py-8 px-4">
        {/* Share Button */}
        <div className="fixed top-6 right-6 z-50">
          <Button
            onClick={shareProfile}
            variant="outline"
            size="sm"
            className="gap-2 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
          >
            <Share2 className="h-4 w-4" />
            {isArabic ? 'مشاركة' : 'Share'}
          </Button>
        </div>

        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="relative">
              <img
                src={userData.image || '/assets/preview.png'}
                alt={userData.name || userData.username}
                className="w-32 h-32 rounded-full border-4 border-background shadow-2xl object-cover"
                onError={(e) => {
                  console.log('Image failed to load, using fallback');
                  e.target.src = '/assets/preview.png';
                }}
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {userData.name || userData.username}
              </h1>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="outline" className="text-sm">
                  @{userData.username}
                </Badge>
                {userData.accessKey && (
                  <Badge variant="secondary" className="text-sm">
                    <Lock className="h-3 w-3 mr-1" />
                    {isArabic ? 'روابط خاصة' : 'Private Links'}
                  </Badge>
                )}
              </div>
            </div>

            {userData.bio && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {userData.bio}
              </p>
            )}

            {/* Profile Stats */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{socialCount} {isArabic ? 'رابط اجتماعي' : 'social links'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{isArabic ? 'ملف شخصي عام' : 'Public profile'}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-center gap-3">
              <Button onClick={copyProfileLink} variant="outline" size="sm" className="gap-2">
                <Copy className="h-4 w-4" />
                {isArabic ? 'نسخ الرابط' : 'Copy Link'}
              </Button>
              <Button asChild size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="/sign-in">
                  <Sparkles className="h-4 w-4" />
                  {isArabic ? 'أنشئ ملفك' : 'Create Your Own'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="max-w-4xl mx-auto">
          <UserSocials userData={userData} accessKey={userData.accessKey} language={language} />
        </div>

        {/* Call to Action */}
        <Card className="mt-16 max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {isArabic ? 'أنشئ مركزك الاجتماعي الخاص' : 'Create Your Own Social Hub'}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {isArabic 
                    ? 'انضم إلى آلاف المبدعين الذين بسطوا وجودهم عبر الإنترنت مع MySocials. رابط واحد جميل لجميع ملفات وسائل التواصل الاجتماعي الخاصة بك.'
                    : 'Join thousands of creators who\'ve simplified their online presence with MySocials. One beautiful link for all your social media profiles.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Link href="/sign-in">
                      <Sparkles className="h-5 w-5" />
                      {isArabic ? 'ابدأ مجاناً' : 'Get Started Free'}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/">
                      <Eye className="h-5 w-5" />
                      {isArabic ? 'اعرف المزيد' : 'Learn More'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Powered by Badge */}
        <div className="text-center mt-12">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href="/" className="gap-2">
              <span>{isArabic ? 'مدعوم بواسطة' : 'Powered by'}</span>
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MySocials
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
