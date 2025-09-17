import { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/MovieCard";
import moviePoster1 from "@/assets/movie-poster-1.jpg";
import moviePoster2 from "@/assets/movie-poster-2.jpg";
import moviePoster3 from "@/assets/movie-poster-3.jpg";

const allMovies = [
  {
    id: 1,
    title: "Shadow Hunter",
    year: 2024,
    rating: 8.4,
    genre: "Action",
    poster: moviePoster1,
    description: "An elite operative must navigate through a web of betrayal and conspiracy."
  },
  {
    id: 2,
    title: "Midnight in Paris",
    year: 2024,
    rating: 7.9,
    genre: "Romance",
    poster: moviePoster2,
    description: "A romantic journey through the enchanting streets of Paris at midnight."
  },
  {
    id: 3,
    title: "The Awakening",
    year: 2024,
    rating: 8.1,
    genre: "Horror",
    poster: moviePoster3,
    description: "Ancient forces stir as darkness threatens to consume everything."
  },
  {
    id: 4,
    title: "Digital Fortress",
    year: 2024,
    rating: 8.6,
    genre: "Thriller",
    poster: moviePoster1,
    description: "A cybersecurity expert uncovers a massive conspiracy."
  },
  {
    id: 5,
    title: "Ocean's Call",
    year: 2024,
    rating: 7.7,
    genre: "Adventure",
    poster: moviePoster2,
    description: "Deep sea exploration leads to an extraordinary discovery."
  }
];

export default function Wishlist() {
  const [wishlistMovies, setWishlistMovies] = useState<number[]>([]);
  const [likedMovies, setLikedMovies] = useState<number[]>([]);

  // Load saved preferences
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlistMovies');
    const savedLikes = localStorage.getItem('likedMovies');
    
    if (savedWishlist) setWishlistMovies(JSON.parse(savedWishlist));
    if (savedLikes) setLikedMovies(JSON.parse(savedLikes));
  }, []);

  const handleRemoveFromWishlist = (movieId: number) => {
    const newWishlistMovies = wishlistMovies.filter(id => id !== movieId);
    setWishlistMovies(newWishlistMovies);
    localStorage.setItem('wishlistMovies', JSON.stringify(newWishlistMovies));
  };

  const handleLike = (movieId: number) => {
    const newLikedMovies = likedMovies.includes(movieId)
      ? likedMovies.filter(id => id !== movieId)
      : [...likedMovies, movieId];
    
    setLikedMovies(newLikedMovies);
    localStorage.setItem('likedMovies', JSON.stringify(newLikedMovies));
  };

  const handleClearWishlist = () => {
    setWishlistMovies([]);
    localStorage.removeItem('wishlistMovies');
  };

  // Get wishlist movies
  const wishlistMovieData = allMovies.filter(movie => 
    wishlistMovies.includes(movie.id)
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="font-display font-bold text-4xl text-foreground flex items-center space-x-3">
              <Heart className="w-8 h-8 text-red-400" />
              <span>My Wishlist</span>
            </h1>
            <p className="text-muted-foreground">
              {wishlistMovieData.length} movies saved for later
            </p>
          </div>

          {wishlistMovieData.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearWishlist}
              className="text-destructive border-destructive/20 hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlistMovieData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {wishlistMovieData.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                rating={movie.rating}
                genre={movie.genre}
                poster={movie.poster}
                description={movie.description}
                onLike={handleLike}
                onAddToWishlist={handleRemoveFromWishlist}
                isLiked={likedMovies.includes(movie.id)}
                isInWishlist={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-semibold text-2xl text-muted-foreground">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start adding movies to your wishlist by clicking the heart icon on any movie card
              </p>
            </div>
            <Button 
              asChild
              className="bg-gradient-accent hover:opacity-90 text-white"
            >
              <a href="/movies">Browse Movies</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}