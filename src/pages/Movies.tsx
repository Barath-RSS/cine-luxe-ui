import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MovieCard } from "@/components/MovieCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  },
  {
    id: 6,
    title: "Quantum Leap",
    year: 2025,
    rating: 8.2,
    genre: "Sci-Fi",
    poster: moviePoster3,
    description: "Time travel meets quantum physics in this mind-bending thriller."
  },
  {
    id: 7,
    title: "Desert Storm",
    year: 2025,
    rating: 7.5,
    genre: "Action",
    poster: moviePoster1,
    description: "Survival against impossible odds in the harsh desert landscape."
  },
  {
    id: 8,
    title: "Lost Symphony",
    year: 2025,
    rating: 8.0,
    genre: "Drama",
    poster: moviePoster2,
    description: "A musician's journey to rediscover their lost masterpiece."
  }
];

const genres = ["All", "Action", "Romance", "Horror", "Thriller", "Adventure", "Sci-Fi", "Drama"];
const sortOptions = ["Latest", "Rating", "Alphabetical"];

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [likedMovies, setLikedMovies] = useState<number[]>([]);
  const [wishlistMovies, setWishlistMovies] = useState<number[]>([]);

  // Load saved preferences
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

  // Filter and sort movies
  const filteredMovies = allMovies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Rating":
          return b.rating - a.rating;
        case "Alphabetical":
          return a.title.localeCompare(b.title);
        case "Latest":
        default:
          return b.year - a.year;
      }
    });

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="space-y-6 mb-8">
          <h1 className="font-display font-bold text-4xl text-foreground">
            All Movies
          </h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-surface border-border/50"
              />
            </div>

            {/* Genre Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-32 justify-between">
                  <span>{selectedGenre}</span>
                  <Filter className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {genres.map((genre) => (
                  <DropdownMenuItem
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={selectedGenre === genre ? "bg-accent" : ""}
                  >
                    {genre}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-32 justify-between">
                  <span>Sort: {sortBy}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={sortBy === option ? "bg-accent" : ""}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {selectedGenre !== "All" && (
              <Badge 
                variant="secondary" 
                className="bg-gradient-accent text-white cursor-pointer"
                onClick={() => setSelectedGenre("All")}
              >
                {selectedGenre} ✕
              </Badge>
            )}
            {searchQuery && (
              <Badge 
                variant="secondary" 
                className="bg-surface cursor-pointer"
                onClick={() => setSearchQuery("")}
              >
                "{searchQuery}" ✕
              </Badge>
            )}
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
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
                onAddToWishlist={handleAddToWishlist}
                isLiked={likedMovies.includes(movie.id)}
                isInWishlist={wishlistMovies.includes(movie.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="font-display font-semibold text-2xl text-muted-foreground mb-2">
              No movies found
            </h2>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}