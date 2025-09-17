import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  description?: string;
}

interface SlideshowProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
  autoSlideInterval?: number;
}

export function Slideshow({ movies, onMovieClick, autoSlideInterval = 5000 }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (movies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [movies.length, autoSlideInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  if (!movies.length) return null;

  const currentMovie = movies[currentSlide];

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl bg-surface">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentMovie.poster}
          alt={currentMovie.title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">
                Featured Movie
              </Badge>
              <h1 className="font-display font-bold text-4xl md:text-6xl text-white leading-tight">
                {currentMovie.title}
              </h1>
              <div className="flex items-center space-x-4 text-white/90">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{currentMovie.rating.toFixed(1)}</span>
                </div>
                <span>{currentMovie.year}</span>
                <Badge variant="outline" className="text-white border-white/30">
                  {currentMovie.genre}
                </Badge>
              </div>
            </div>

            {currentMovie.description && (
              <p className="text-white/90 text-lg leading-relaxed max-w-xl">
                {currentMovie.description}
              </p>
            )}

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => onMovieClick?.(currentMovie)}
                className="bg-gradient-accent hover:opacity-90 text-white shadow-lg"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}