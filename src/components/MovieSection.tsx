import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  description?: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
  onAddToWatchLater?: (id: number) => void;
  onMovieClick?: (movie: Movie) => void;
  likedMovies?: number[];
  watchLaterMovies?: number[];
}

export function MovieSection({
  title,
  movies,
  onLike,
  onDislike,
  onAddToWatchLater,
  onMovieClick,
  likedMovies = [],
  watchLaterMovies = []
}: MovieSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280; // Card width + gap
      const newScrollPosition = scrollRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-2xl text-foreground">
          {title}
        </h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-surface hover:bg-surface-elevated border border-border/50"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"  
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-surface hover:bg-surface-elevated border border-border/50"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Movies Scroll Container */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.year}
            rating={movie.rating}
            genre={movie.genre}
            poster={movie.poster}
            description={movie.description}
            onLike={onLike}
            onDislike={onDislike}
            onAddToWatchLater={onAddToWatchLater}
            onMovieClick={onMovieClick}
            isLiked={likedMovies.includes(movie.id)}
            isInWatchLater={watchLaterMovies.includes(movie.id)}
            className="flex-none"
          />
        ))}
      </div>
    </section>
  );
}