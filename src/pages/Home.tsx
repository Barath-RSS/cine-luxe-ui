import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { MovieSection } from "@/components/MovieSection";
import moviePoster1 from "@/assets/movie-poster-1.jpg";
import moviePoster2 from "@/assets/movie-poster-2.jpg";
import moviePoster3 from "@/assets/movie-poster-3.jpg";

// Mock movie data
const trendingMovies = [
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

const upcomingMovies = [
  {
    id: 6,
    title: "Quantum Leap",
    year: 2025,
    rating: 0,
    genre: "Sci-Fi",
    poster: moviePoster3,
    description: "Time travel meets quantum physics in this mind-bending thriller."
  },
  {
    id: 7,
    title: "Desert Storm",
    year: 2025,
    rating: 0,
    genre: "Action",
    poster: moviePoster1,
    description: "Survival against impossible odds in the harsh desert landscape."
  },
  {
    id: 8,
    title: "Lost Symphony",
    year: 2025,
    rating: 0,
    genre: "Drama",
    poster: moviePoster2,
    description: "A musician's journey to rediscover their lost masterpiece."
  }
];

const personalizedMovies = [
  {
    id: 9,
    title: "Night Vision",
    year: 2024,
    rating: 8.3,
    genre: "Mystery",
    poster: moviePoster3,
    description: "Detective work meets supernatural elements in this gripping mystery."
  },
  {
    id: 10,
    title: "City of Dreams",
    year: 2024,
    rating: 7.8,
    genre: "Drama",
    poster: moviePoster1,
    description: "Urban life and human connections in a bustling metropolis."
  }
];

export default function Home() {
  const [likedMovies, setLikedMovies] = useState<number[]>([]);
  const [wishlistMovies, setWishlistMovies] = useState<number[]>([]);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedMovies');
    const savedWishlist = localStorage.getItem('wishlistMovies');
    
    if (savedLikes) setLikedMovies(JSON.parse(savedLikes));
    if (savedWishlist) setWishlistMovies(JSON.parse(savedWishlist));
  }, []);

  const handleLike = (movieId: number) => {
    const newLikedMovies = likedMovies.includes(movieId)
      ? likedMovies.filter(id => id !== movieId)
      : [...likedMovies, movieId];
    
    setLikedMovies(newLikedMovies);
    localStorage.setItem('likedMovies', JSON.stringify(newLikedMovies));
  };

  const handleAddToWishlist = (movieId: number) => {
    const newWishlistMovies = wishlistMovies.includes(movieId)
      ? wishlistMovies.filter(id => id !== movieId)
      : [...wishlistMovies, movieId];
    
    setWishlistMovies(newWishlistMovies);
    localStorage.setItem('wishlistMovies', JSON.stringify(newWishlistMovies));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Movie Sections */}
      <div className="container mx-auto px-4 space-y-12 py-12">
        <MovieSection
          title="Trending Now"
          movies={trendingMovies}
          onLike={handleLike}
          onAddToWishlist={handleAddToWishlist}
          likedMovies={likedMovies}
          wishlistMovies={wishlistMovies}
        />

        <MovieSection
          title="Upcoming Releases"
          movies={upcomingMovies}
          onLike={handleLike}
          onAddToWishlist={handleAddToWishlist}
          likedMovies={likedMovies}
          wishlistMovies={wishlistMovies}
        />

        <MovieSection
          title="Personalized Suggestions"
          movies={personalizedMovies}
          onLike={handleLike}
          onAddToWishlist={handleAddToWishlist}
          likedMovies={likedMovies}
          wishlistMovies={wishlistMovies}
        />
      </div>
    </div>
  );
}