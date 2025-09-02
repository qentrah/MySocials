import { Label } from "@/components/ui/label";
import { currentUser } from "@clerk/nextjs/server";
import ManageForm from "../../_components/ManageForm";
import Link from "next/link";
import UserPageLink from "../../_components/UserPageLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Settings, Eye, Share2, BarChart3, Users, Globe, Sparkles } from "lucide-react";

export async function generateMetadata({ params }) {
  return {
    title: "Manage Profile - MySocials",
    description: "Create and manage your personalized social media profile",
  };
}

export default async function Page() {
  const { imageUrl, firstName, lastName } = await currentUser();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your social media profile and keep all your links in one beautiful place
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">1</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Profile Created</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">9</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Social Platforms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Share2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">∞</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Share Limit</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">100%</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Free Forever</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Link Section */}
        <div className="mb-12">
          <UserPageLink />
        </div>

        {/* Profile Image Section */}
        <Card className="mb-12 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Profile Image
            </CardTitle>
            <CardDescription>
              Your profile picture from your account. Click below to change it.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative inline-block mb-4">
              <img
                className="w-24 h-24 rounded-full border-4 border-background shadow-lg"
                src={imageUrl}
                alt={`${firstName} ${lastName}`}
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Settings className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                {firstName} {lastName}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/user-profile/profile" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Change Profile Picture
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mx-auto mb-4">
                <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Preview Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">
                See how your profile looks to visitors
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/${firstName?.toLowerCase() || 'username'}`} className="gap-2">
                  <Eye className="h-4 w-4" />
                  View Profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-fit mx-auto mb-4">
                <Share2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get your profile link to share with others
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="#share" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Copy Link
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Track your profile views and engagement
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="#analytics" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Stats
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <Sparkles className="h-5 w-5" />
              Pro Tips for a Great Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">1</Badge>
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">Complete Your Bio</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Add a compelling description to make your profile stand out</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">2</Badge>
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">Use High-Quality Images</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Ensure your profile picture is clear and professional</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">3</Badge>
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">Organize Your Links</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Group similar platforms together for better organization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">4</Badge>
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">Regular Updates</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Keep your profile fresh with new content and links</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <div className="mb-16">
          <ManageForm />
        </div>
      </div>
    </div>
  );
}
