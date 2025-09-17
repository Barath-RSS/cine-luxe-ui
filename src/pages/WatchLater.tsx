import { useState, useEffect } from "react";
import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/MovieCard";
import { MovieDetailsModal } from "@/components/MovieDetailsModal";
import { allMovies, Movie } from "@/data/movies";

export default function WatchLater() {
  const [watchLaterMovies, setWatchLaterMovies] = useState<number[]>([]);
  const [likedMovies, setLikedMovies] = useState<number[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<number[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedWatchLater = localStorage.getItem('watchLaterMovies');
    const savedLikes = localStorage.getItem('likedMovies');
    const savedDislikes = localStorage.getItem('dislikedMovies');
    
    if (savedWatchLater) setWatchLaterMovies(JSON.parse(savedWatchLater));
    if (savedLikes) setLikedMovies(JSON.parse(savedLikes));
    if (savedDislikes) setDislikedMovies(JSON.parse(savedDislikes));
  }, []);

  const handleRemoveFromWatchLater = (movieId: number) => {
    const newWatchLaterMovies = watchLaterMovies.filter(id => id !== movieId);
    setWatchLaterMovies(newWatchLaterMovies);
    localStorage.setItem('watchLaterMovies', JSON.stringify(newWatchLaterMovies));
  };

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

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleClearWatchLater = () => {
    setWatchLaterMovies([]);
    localStorage.removeItem('watchLaterMovies');
  };

  // Get watch later movies
  const watchLaterMovieData = allMovies.filter(movie => 
    watchLaterMovies.includes(movie.id)
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="font-display font-bold text-4xl text-foreground flex items-center space-x-3">
              <Clock className="w-8 h-8 text-accent-from" />
              <span>Watch Later</span>
            </h1>
            <p className="text-muted-foreground">
              {watchLaterMovieData.length} movies saved for later viewing
            </p>
          </div>

          {watchLaterMovieData.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearWatchLater}
              className="text-destructive border-destructive/20 hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Watch Later Content */}
        {watchLaterMovieData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {watchLaterMovieData.map((movie) => (
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
                onDislike={handleDislike}
                onAddToWatchLater={handleRemoveFromWatchLater}
                onMovieClick={handleMovieClick}
                isLiked={likedMovies.includes(movie.id)}
                isInWatchLater={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-semibold text-2xl text-muted-foreground">
                Your watch later list is empty
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start adding movies to your watch later list by clicking the heart icon on any movie card
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

        {/* Movie Details Modal */}
        <MovieDetailsModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onLike={handleLike}
          onDislike={handleDislike}
          onAddToWatchLater={handleRemoveFromWatchLater}
          isLiked={selectedMovie ? likedMovies.includes(selectedMovie.id) : false}
          isDisliked={selectedMovie ? dislikedMovies.includes(selectedMovie.id) : false}
          isInWatchLater={selectedMovie ? watchLaterMovies.includes(selectedMovie.id) : false}
        />
      </div>
    </div>
  );
}