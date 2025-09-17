import { useState, useEffect } from "react";
import { User, Heart, Star, Film, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileProps {
  onThemeChange: (theme: 'red' | 'cyan') => void;
  currentTheme: 'red' | 'cyan';
}

export default function Profile({ onThemeChange, currentTheme }: ProfileProps) {
  const [userName, setUserName] = useState("Movie Enthusiast");
  const [flexingTag, setFlexingTag] = useState("Cinema Connoisseur");
  const [likedMovies, setLikedMovies] = useState<number[]>([]);
  const [wishlistMovies, setWishlistMovies] = useState<number[]>([]);

  // Load saved data
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedTag = localStorage.getItem('flexingTag');
    const savedLikes = localStorage.getItem('likedMovies');
    const savedWishlist = localStorage.getItem('wishlistMovies');
    
    if (savedName) setUserName(savedName);
    if (savedTag) setFlexingTag(savedTag);
    if (savedLikes) setLikedMovies(JSON.parse(savedLikes));
    if (savedWishlist) setWishlistMovies(JSON.parse(savedWishlist));
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('flexingTag', flexingTag);
  };

  const stats = [
    {
      label: "Movies Watched",
      value: "127",
      icon: Film,
      color: "text-blue-400"
    },
    {
      label: "Movies Liked",
      value: likedMovies.length.toString(),
      icon: Heart,
      color: "text-red-400"
    },
    {
      label: "Watchlist",
      value: wishlistMovies.length.toString(),
      icon: Star,
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto shadow-glow">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="font-display font-bold text-3xl text-foreground">
                {userName}
              </h1>
              <Badge 
                variant="secondary" 
                className="bg-gradient-accent text-white px-4 py-1 text-sm font-medium"
              >
                {flexingTag}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="bg-surface border-border/50">
                  <CardContent className="p-6 text-center space-y-2">
                    <Icon className={`w-8 h-8 mx-auto ${stat.color}`} />
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Settings */}
          <Card className="bg-surface border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Profile Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-background border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag">Flexing Tag</Label>
                  <Input
                    id="tag"
                    value={flexingTag}
                    onChange={(e) => setFlexingTag(e.target.value)}
                    className="bg-background border-border/50"
                    placeholder="e.g., Cinema Connoisseur, Movie Buff, Film Critic"
                  />
                </div>
                <Button 
                  onClick={handleSaveProfile}
                  className="bg-gradient-accent hover:opacity-90 text-white"
                >
                  Save Profile
                </Button>
              </div>

              {/* Theme Settings */}
              <div className="space-y-4 border-t border-border/20 pt-6">
                <div className="space-y-2">
                  <Label>Theme Preference</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred color theme for the interface
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    variant={currentTheme === 'red' ? 'default' : 'outline'}
                    onClick={() => onThemeChange('red')}
                    className={`flex items-center space-x-2 ${
                      currentTheme === 'red' 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                        : 'border-red-500/20 hover:bg-red-500/10'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
                    <span>Red Theme</span>
                  </Button>
                  
                  <Button
                    variant={currentTheme === 'cyan' ? 'default' : 'outline'}
                    onClick={() => onThemeChange('cyan')}
                    className={`flex items-center space-x-2 ${
                      currentTheme === 'cyan' 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' 
                        : 'border-cyan-400/20 hover:bg-cyan-400/10'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                    <span>Cyan Theme</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}