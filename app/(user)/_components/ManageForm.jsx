"use client";

import { useState, useEffect, useRef } from "react";
import party from "party-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderIcon, CheckCircle, AlertCircle, Info, Copy, ExternalLink, Save, Eye, EyeOff, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ManageForm() {
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [insta, setInsta] = useState("");
  const [face, setFace] = useState("");
  const [github, setGithub] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [youtube, setYoutube] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [threads, setThreads] = useState("");
  const [reddit, setReddit] = useState("");
  const [stackoverflow, setStackoverflow] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [codeforces, setCodeforces] = useState("");
  const [hackerrank, setHackerrank] = useState("");
  const [codechef, setCodechef] = useState("");
  const [geeksForGeeks, setGeeksForGeeks] = useState("");
  const [twitch, setTwitch] = useState("");
  const [soundcloud, setSoundcloud] = useState("");
  const [spotify, setSpotify] = useState("");
  const [applemusic, setApplemusic] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [skype, setSkype] = useState("");
  const [amazon, setAmazon] = useState("");
  const [shopify, setShopify] = useState("");
  const [kofi, setkofi] = useState("");
  const [buyMeACoffee, setBuyMeACoffee] = useState("");
  const [patreon, setPatreon] = useState("");
  const [website, setWebsite] = useState("");
  const [blog, setBlog] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [showAccessKey, setShowAccessKey] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formProgress, setFormProgress] = useState(0);

  const publishRef = useRef(null);

  // Calculate form progress
  useEffect(() => {
    const fields = [username, name, bio, insta, face, github, snapchat, youtube, linkedin, twitter, threads, reddit];
    const filledFields = fields.filter(field => field.trim() !== "").length;
    const progress = Math.round((filledFields / fields.length) * 100);
    setFormProgress(progress);
  }, [username, name, bio, insta, face, github, snapchat, youtube, linkedin, twitter, threads, reddit]);

  useEffect(() => {
    if (loading) {
      fetch("/api/get")
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.data) {
            const d = data.data;
            setUsername(d.username || "");
            setName(d.name || "");
            setBio(d.bio || "");
            setInsta(d.instagram || "");
            setFace(d.facebook || "");
            setGithub(d.github || "");
            setSnapchat(d.snapchat || "");
            setLinkedin(d.linkedin || "");
            setTwitter(d.twitter || "");
            setYoutube(d.youtube || "");
            setThreads(d.threads || "");
            setReddit(d.reddit || "");
            setStackoverflow(d.stackoverflow || "");
            setLeetcode(d.leetcode || "");
            setCodeforces(d.codeforces || "");
            setHackerrank(d.hackerrank || "");
            setCodechef(d.codechef || "");
            setGeeksForGeeks(d.geeksForGeeks || "");
            setTwitch(d.twitch || "");
            setSoundcloud(d.soundcloud || "");
            setSpotify(d.spotify || "");
            setApplemusic(d.applemusic || "");
            setDiscord(d.discord || "");
            setTelegram(d.telegram || "");
            setWhatsapp(d.whatsapp || "");
            setSkype(d.skype || "");
            setAmazon(d.amazon || "");
            setShopify(d.shopify || "");
            setkofi(d.kofi || "");
            setBuyMeACoffee(d.buyMeACoffee || "");
            setPatreon(d.patreon || "");
            setWebsite(d.website || "");
            setBlog(d.blog || "");
            setEmail(d.email || "");
            setPhone(d.phone || "");
            setAccessKey(d.accessKey || "");
          }
        })
        .catch(() => setLoading(false));
    }
  }, [loading]);

  useEffect(() => {
    const flag = localStorage.getItem("celebratedProfile");
    if (flag) {
      party.confetti(document.body, {
        count: party.variation.range(80, 220),
        spread: 150,
      });
      localStorage.removeItem("celebratedProfile");
    }
  }, []);

  const handlePublishEvent = async (e) => {
    e.preventDefault();
    setIsPublishing(true);

    if (username.length < 1) {
      toast({ 
        title: "Username is required", 
        description: "Please enter a username to continue.",
        variant: "destructive"
      });
      setIsPublishing(false);
      return;
    }

    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          name,
          bio,
          instagram: insta,
          facebook: face,
          github,
          snapchat,
          youtube,
          linkedin,
          twitter,
          threads,
          reddit,
          stackoverflow,
          leetcode,
          codeforces,
          hackerrank,
          codechef,
          geeksForGeeks,
          twitch,
          soundcloud,
          spotify,
          applemusic,
          discord,
          telegram,
          whatsapp,
          skype,
          amazon,
          shopify,
          kofi,
          buyMeACoffee,
          patreon,
          website,
          blog,
          email,
          phone,
          accessKey,
        }),
      });
      const data = await res.json();

      if (data.error) {
        toast({ 
          title: "Error", 
          description: data.error,
          variant: "destructive"
        });
        setIsPublishing(false);
        return;
      }

      toast({ 
        title: "Success!", 
        description: "Your profile has been published successfully! 🎉",
        variant: "default"
      });

      localStorage.setItem("celebratedProfile", "true");

      setTimeout(() => location.reload(), 1000);
    } catch (err) {
      toast({ 
        title: "Something went wrong", 
        description: "Please try again later.",
        variant: "destructive"
      });
      setIsPublishing(false);
    }
  };

  const copyProfileLink = () => {
    if (username) {
      const link = `${window.location.origin}/${username}`;
      navigator.clipboard.writeText(link);
      toast({ 
        title: "Link copied!", 
        description: "Your profile link has been copied to clipboard.",
        variant: "default"
      });
    }
  };

  const getSocialCount = () => {
    const socials = [insta, face, github, snapchat, youtube, linkedin, twitter, threads, reddit];
    return socials.filter(social => social.trim() !== "").length;
  };

  if (loading) {
    return (
      <div className="grid gap-4 mt-5 lg:px-40">
        <Skeleton className="h-5 w-20 mt-2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-5 w-20 mt-2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-5 w-20 mt-2" />
        <Skeleton className="h-20 w-full mb-8" />
        <Skeleton className="h-5 w-20 mt-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress and Stats */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Profile Progress</h2>
          <Badge variant="secondary" className="text-sm">
            {formProgress}% Complete
          </Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${formProgress}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span>Social Links: {getSocialCount()}/9</span>
          <span>•</span>
          <span>Basic Info: {username && name && bio ? 'Complete' : 'Incomplete'}</span>
        </div>
      </div>

      <form onSubmit={handlePublishEvent} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Start with your essential details. These will be displayed prominently on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  Username
                  <Badge variant="outline" className="text-xs">Required</Badge>
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
                  placeholder="your-username"
                  maxLength={20}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  This will be your profile URL: mysocials.com/{username || 'username'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  maxLength={40}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">About</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself, your interests, or what you do..."
                maxLength={500}
                rows={4}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Share your story, interests, or professional summary</span>
                <span>{bio.length}/500</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-green-600" />
              Social Media Links
            </CardTitle>
            <CardDescription>
              Connect your social media profiles. Only filled links will appear on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
                <TabsTrigger value="messaging">Messaging</TabsTrigger>
                <TabsTrigger value="storefront">Storefront</TabsTrigger>
                <TabsTrigger value="miscellaneous">Misc</TabsTrigger>
              </TabsList>

              <TabsContent value="social" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      type="url"
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                      placeholder="https://youtube.com/@username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insta">Instagram</Label>
                    <Input
                      id="insta"
                      type="url"
                      value={insta}
                      onChange={(e) => setInsta(e.target.value)}
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="face">Facebook</Label>
                    <Input
                      id="face"
                      type="url"
                      value={face}
                      onChange={(e) => setFace(e.target.value)}
                      placeholder="https://facebook.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="snapchat">Snapchat</Label>
                    <Input
                      id="snapchat"
                      type="url"
                      value={snapchat}
                      onChange={(e) => setSnapchat(e.target.value)}
                      placeholder="https://snapchat.com/add/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      type="url"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="threads">Threads</Label>
                    <Input
                      id="threads"
                      type="url"
                      value={threads}
                      onChange={(e) => setThreads(e.target.value)}
                      placeholder="https://threads.net/@username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reddit">Reddit</Label>
                    <Input
                      id="reddit"
                      type="url"
                      value={reddit}
                      onChange={(e) => setReddit(e.target.value)}
                      placeholder="https://reddit.com/user/username"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="professional" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stackoverflow">Stack Overflow</Label>
                    <Input
                      id="stackoverflow"
                      type="url"
                      value={stackoverflow}
                      onChange={(e) => setStackoverflow(e.target.value)}
                      placeholder="https://stackoverflow.com/users/userid/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leetcode">LeetCode</Label>
                    <Input
                      id="leetcode"
                      type="url"
                      value={leetcode}
                      onChange={(e) => setLeetcode(e.target.value)}
                      placeholder="https://leetcode.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codeforces">Codeforces</Label>
                    <Input
                      id="codeforces"
                      type="url"
                      value={codeforces}
                      onChange={(e) => setCodeforces(e.target.value)}
                      placeholder="https://codeforces.com/profile/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hackerrank">HackerRank</Label>
                    <Input
                      id="hackerrank"
                      type="url"
                      value={hackerrank}
                      onChange={(e) => setHackerrank(e.target.value)}
                      placeholder="https://www.hackerrank.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codechef">CodeChef</Label>
                    <Input
                      id="codechef"
                      type="url"
                      value={codechef}
                      onChange={(e) => setCodechef(e.target.value)}
                      placeholder="https://www.codechef.com/users/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="geeksForGeeks">GeeksforGeeks</Label>
                    <Input
                      id="geeksForGeeks"
                      type="url"
                      value={geeksForGeeks}
                      onChange={(e) => setGeeksForGeeks(e.target.value)}
                      placeholder="https://auth.geeksforgeeks.org/user/username/profile"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="creative" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitch">Twitch</Label>
                    <Input
                      id="twitch"
                      type="url"
                      value={twitch}
                      onChange={(e) => setTwitch(e.target.value)}
                      placeholder="https://twitch.tv/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soundcloud">SoundCloud</Label>
                    <Input
                      id="soundcloud"
                      type="url"
                      value={soundcloud}
                      onChange={(e) => setSoundcloud(e.target.value)}
                      placeholder="https://soundcloud.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spotify">Spotify</Label>
                    <Input
                      id="spotify"
                      type="url"
                      value={spotify}
                      onChange={(e) => setSpotify(e.target.value)}
                      placeholder="https://open.spotify.com/user/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applemusic">Apple Music</Label>
                    <Input
                      id="applemusic"
                      type="url"
                      value={applemusic}
                      onChange={(e) => setApplemusic(e.target.value)}
                      placeholder="https://music.apple.com/profile/username"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="messaging" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discord">Discord</Label>
                    <Input
                      id="discord"
                      type="url"
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                      placeholder="https://discord.com/users/discordID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input
                      id="telegram"
                      type="url"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="https://t.me/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      type="url"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="https://wa.me/919876543210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skype">Skype</Label>
                    <Input
                      id="skype"
                      type="url"
                      value={skype}
                      onChange={(e) => setSkype(e.target.value)}
                      placeholder="skype:username?chat"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="storefront" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amazon">Amazon Storefront</Label>
                    <Input
                      id="amazon"
                      type="url"
                      value={amazon}
                      onChange={(e) => setAmazon(e.target.value)}
                      placeholder="https://amazon.com/shop/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shopify">Shopify</Label>
                    <Input
                      id="shopify"
                      type="url"
                      value={shopify}
                      onChange={(e) => setShopify(e.target.value)}
                      placeholder="https://username.myshopify.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kofi">Ko-fi</Label>
                    <Input
                      id="kofi"
                      type="url"
                      value={kofi}
                      onChange={(e) => setkofi(e.target.value)}
                      placeholder="https://ko-fi.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyMeACoffee">Buy Me a Coffee</Label>
                    <Input
                      id="buyMeACoffee"
                      type="url"
                      value={buyMeACoffee}
                      onChange={(e) => setBuyMeACoffee(e.target.value)}
                      placeholder="https://buymeacoffee.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patreon">Patreon</Label>
                    <Input
                      id="patreon"
                      type="url"
                      value={patreon}
                      onChange={(e) => setPatreon(e.target.value)}
                      placeholder="https://patreon.com/username"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="miscellaneous" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Personal Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourdomain.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blog">Blog</Label>
                    <Input
                      id="blog"
                      type="url"
                      value={blog}
                      onChange={(e) => setBlog(e.target.value)}
                      placeholder="https://yourblog.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mailto:you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="tel:+919876543210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessKey" className="flex items-center gap-2">
                    Access Key (Optional)
                    <Badge variant="outline" className="text-xs">Private Links</Badge>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showAccessKey ? "text" : "password"}
                      id="accessKey"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      placeholder="Set an access key for private links"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowAccessKey(!showAccessKey)}
                    >
                      {showAccessKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Set a key to hide private miscellaneous links. Users will need this key to access them.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Profile Preview */}
        {username && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Profile Preview
              </CardTitle>
              <CardDescription>
                Your profile will be available at this link once published.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <span className="font-mono text-sm text-muted-foreground">
                  {window.location.origin}/{username}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={copyProfileLink}
                  className="ml-auto"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            ref={publishRef}
            type="submit"
            disabled={isPublishing}
            className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            {isPublishing ? (
              <>
                <LoaderIcon className="w-5 h-5 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Publish Profile
              </>
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="gap-2"
          >
            <ArrowUp className="w-5 h-5" />
            Back to Top
          </Button>
        </div>
      </form>
    </div>
  );
}
