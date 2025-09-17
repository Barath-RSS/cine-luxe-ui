import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-movie-1.jpg";

interface HeroMovie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  description: string;
  image: string;
  duration: string;
}

const heroMovies: HeroMovie[] = [
  {
    id: 1,
    title: "Nexus Protocol",
    year: 2024,
    rating: 8.7,
    genre: "Sci-Fi Thriller",
    description: "In a world where reality and virtual existence blur, a cybersecurity expert uncovers a conspiracy that threatens the very fabric of human consciousness.",
    image: heroImage,
    duration: "2h 18m"
  }
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentMovie = heroMovies[currentIndex];

  const handlePlayTrailer = () => {
    // Trailer integration
    window.open(`https://youtube.com/results?search_query=${encodeURIComponent(currentMovie.title + " trailer")}`, '_blank');
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentMovie.image}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl space-y-6">
          {/* Movie Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Badge 
                variant="secondary" 
                className="bg-gradient-accent text-white border-0 px-3 py-1"
              >
                Trending Now
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <span>{currentMovie.year}</span>
                <span>•</span>
                <span>{currentMovie.duration}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{currentMovie.rating}</span>
                </div>
              </div>
            </div>

            <h1 className="font-display font-bold text-5xl md:text-7xl text-white leading-tight">
              {currentMovie.title}
            </h1>

            <p className="text-xl text-white/90 leading-relaxed font-body">
              {currentMovie.description}
            </p>

            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-white border-white/30">
                {currentMovie.genre}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <Button
              onClick={handlePlayTrailer}
              size="lg"
              className="bg-gradient-accent hover:opacity-90 text-white border-0 shadow-glow px-8 py-3"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Watch Trailer
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
            >
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {heroMovies.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % heroMovies.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {heroMovies.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}