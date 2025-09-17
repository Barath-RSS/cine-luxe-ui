import { useState } from "react";
import { Search, User, Heart, Home, Film, Mic } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onThemeChange: (theme: 'red' | 'cyan') => void;
  currentTheme: 'red' | 'cyan';
}

export function Header({ onThemeChange, currentTheme }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
            <Film className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl gradient-text">
            CinemaX
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
              isActive("/")
                ? "bg-gradient-accent text-white shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/movies"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
              isActive("/movies")
                ? "bg-gradient-accent text-white shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Film className="w-4 h-4" />
            <span className="font-medium">Movies</span>
          </Link>
          <Link
            to="/watch-later"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
              isActive("/watch-later")
                ? "bg-gradient-accent text-white shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span className="font-medium">Watch Later</span>
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search movies, genres, actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 bg-surface border-border/50 focus:border-accent-from focus:ring-2 focus:ring-accent-from/20"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 hover:bg-accent-from/10"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-surface-elevated border border-border/50 hover:border-accent-from/50"
            >
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border-border/50">
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onThemeChange(currentTheme === 'red' ? 'cyan' : 'red')}
              className="flex items-center justify-between"
            >
              <span>Theme</span>
              <div className="flex space-x-1">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 ${currentTheme === 'red' ? 'ring-2 ring-white' : ''}`} />
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 ${currentTheme === 'cyan' ? 'ring-2 ring-white' : ''}`} />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}