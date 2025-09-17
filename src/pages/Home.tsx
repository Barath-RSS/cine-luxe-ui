import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { MovieSection } from "@/components/MovieSection";
import { Slideshow } from "@/components/Slideshow";
import { MovieDetailsModal } from "@/components/MovieDetailsModal";
import { 
  getFeaturedMovies, 
  getTrendingMovies, 
  getUpcomingMovies, 
  getPersonalizedMovies,
  Movie 
} from "@/data/movies";

export default function Home() {
  const [likedMovies, setLikedMovies] = useState<number[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<number[]>([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState<number[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedMovies');
    const savedDislikes = localStorage.getItem('dislikedMovies');
    const savedWatchLater = localStorage.getItem('watchLaterMovies');
    
    if (savedLikes) setLikedMovies(JSON.parse(savedLikes));
    if (savedDislikes) setDislikedMovies(JSON.parse(savedDislikes));
    if (savedWatchLater) setWatchLaterMovies(JSON.parse(savedWatchLater));
  }, []);

  const handleLike = (movieId: number) => {
    const newLikedMovies = likedMovies.includes(movieId)
      ? likedMovies.filter(id => id !== movieId)
      : [...likedMovies, movieId];
    const newDislikedMovies = dislikedMovies.filter(id => id !== movieId);
    
    setLikedMovies(newLikedMovies);
    setDislikedMovies(newDislikedMovies);
    localStorage.setItem('likedMovies', JSON.stringify(newLikedMovies));
    localStorage.setItem('dislikedMovies', JSON.stringify(newDislikedMovies));
  };

  const handleDislike = (movieId: number) => {
    const newDislikedMovies = dislikedMovies.includes(movieId)
      ? dislikedMovies.filter(id => id !== movieId)
      : [...dislikedMovies, movieId];
    const newLikedMovies = likedMovies.filter(id => id !== movieId);
    
    setDislikedMovies(newDislikedMovies);
    setLikedMovies(newLikedMovies);
    localStorage.setItem('dislikedMovies', JSON.stringify(newDislikedMovies));
    localStorage.setItem('likedMovies', JSON.stringify(newLikedMovies));
  };

  const handleAddToWatchLater = (movieId: number) => {
    const newWatchLaterMovies = watchLaterMovies.includes(movieId)
      ? watchLaterMovies.filter(id => id !== movieId)
      : [...watchLaterMovies, movieId];
    
    setWatchLaterMovies(newWatchLaterMovies);
    localStorage.setItem('watchLaterMovies', JSON.stringify(newWatchLaterMovies));
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-8 pb-4">
        <Slideshow 
          movies={getFeaturedMovies()} 
          onMovieClick={handleMovieClick}
        />
      </div>

      <div className="container mx-auto px-4 space-y-16 py-8">
        <MovieSection
          title="Trending Now"
          movies={getTrendingMovies()}
          onLike={handleLike}
          onDislike={handleDislike}
          onAddToWatchLater={handleAddToWatchLater}
          onMovieClick={handleMovieClick}
          likedMovies={likedMovies}
          watchLaterMovies={watchLaterMovies}
        />

        <MovieSection
          title="Upcoming Releases"
          movies={getUpcomingMovies()}
          onLike={handleLike}
          onDislike={handleDislike}
          onAddToWatchLater={handleAddToWatchLater}
          onMovieClick={handleMovieClick}
          likedMovies={likedMovies}
          watchLaterMovies={watchLaterMovies}
        />

        <MovieSection
          title="Personalized For You"
          movies={getPersonalizedMovies()}
          onLike={handleLike}
          onDislike={handleDislike}
          onAddToWatchLater={handleAddToWatchLater}
          onMovieClick={handleMovieClick}
          likedMovies={likedMovies}
          watchLaterMovies={watchLaterMovies}
        />
      </div>

      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLike={handleLike}
        onDislike={handleDislike}
        onAddToWatchLater={handleAddToWatchLater}
        isLiked={selectedMovie ? likedMovies.includes(selectedMovie.id) : false}
        isDisliked={selectedMovie ? dislikedMovies.includes(selectedMovie.id) : false}
        isInWatchLater={selectedMovie ? watchLaterMovies.includes(selectedMovie.id) : false}
      />
    </div>
  );
}