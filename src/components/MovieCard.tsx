import { useState } from "react";
import { Heart, Play, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  description?: string;
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
  onAddToWishlist?: (id: number) => void;
  isLiked?: boolean;
  isInWishlist?: boolean;
  className?: string;
}

export function MovieCard({
  id,
  title,
  year,
  rating,
  genre,
  poster,
  description,
  onLike,
  onDislike,
  onAddToWishlist,
  isLiked = false,
  isInWishlist = false,
  className = "",
}: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleBookTickets = () => {
    // External booking integration
    window.open(`https://fandango.com/search?q=${encodeURIComponent(title)}`, '_blank');
  };

  return (
    <div className={`movie-card group w-64 ${className}`}>
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface">
        <img
          src={poster}
          alt={`${title} poster`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface animate-pulse flex items-center justify-center">
            <Play className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="movie-card-overlay flex flex-col justify-end p-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-white text-lg leading-tight">
                {title}
              </h3>
              {description && (
                <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium text-sm">{rating.toFixed(1)}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {genre}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                onClick={handleBookTickets}
                className="flex-1 bg-gradient-accent hover:opacity-90 text-white border-0 shadow-lg"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Book Tickets
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onAddToWishlist?.(id)}
                className={`w-10 h-8 p-0 ${
                  isInWishlist 
                    ? 'bg-accent-from text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart 
                  className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`}
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="pt-3 space-y-1">
        <h3 className="font-display font-semibold text-foreground truncate">
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{year}</span>
          <Badge variant="outline" className="text-xs">
            {genre}
          </Badge>
        </div>
      </div>
    </div>
  );
}