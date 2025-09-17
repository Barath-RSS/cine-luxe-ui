import moviePoster1 from "@/assets/movie-poster-1.jpg";
import moviePoster2 from "@/assets/movie-poster-2.jpg";
import moviePoster3 from "@/assets/movie-poster-3.jpg";

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  description?: string;
}

export const allMovies: Movie[] = [
  // Action Movies
  {
    id: 1,
    title: "Shadow Hunter",
    year: 2024,
    rating: 8.4,
    genre: "Action",
    poster: moviePoster1,
    description: "An elite operative must navigate through a web of betrayal and conspiracy in this high-octane thriller."
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
    id: 11,
    title: "Steel Thunder",
    year: 2024,
    rating: 8.1,
    genre: "Action",
    poster: moviePoster2,
    description: "A former soldier must stop a terrorist plot using advanced military technology."
  },
  {
    id: 15,
    title: "Crimson Dawn",
    year: 2024,
    rating: 7.8,
    genre: "Action",
    poster: moviePoster3,
    description: "Elite mercenaries face their deadliest mission in war-torn territories."
  },
  {
    id: 19,
    title: "Velocity",
    year: 2025,
    rating: 8.2,
    genre: "Action",
    poster: moviePoster1,
    description: "High-speed chase sequences define this adrenaline-pumping thriller."
  },
  {
    id: 23,
    title: "Phoenix Protocol",
    year: 2024,
    rating: 7.9,
    genre: "Action",
    poster: moviePoster2,
    description: "Special forces operative uncovers a conspiracy that threatens global security."
  },
  
  // Romance Movies
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
    id: 12,
    title: "Spring Awakening",
    year: 2024,
    rating: 8.0,
    genre: "Romance",
    poster: moviePoster3,
    description: "Two strangers find love during a magical spring in the countryside."
  },
  {
    id: 16,
    title: "Letters to Vienna",
    year: 2025,
    rating: 7.6,
    genre: "Romance",
    poster: moviePoster1,
    description: "A long-distance love story told through heartfelt letters across continents."
  },
  {
    id: 20,
    title: "Summer's End",
    year: 2024,
    rating: 8.3,
    genre: "Romance",
    poster: moviePoster2,
    description: "A bittersweet romance that blooms during one unforgettable summer."
  },
  {
    id: 24,
    title: "Dancing Hearts",
    year: 2024,
    rating: 7.7,
    genre: "Romance",
    poster: moviePoster3,
    description: "Two professional dancers discover love and passion on the dance floor."
  },

  // Horror Movies
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
    id: 13,
    title: "Whispers in the Dark",
    year: 2024,
    rating: 7.4,
    genre: "Horror",
    poster: moviePoster1,
    description: "A family moves into a house with a terrifying supernatural presence."
  },
  {
    id: 17,
    title: "The Haunting Hour",
    year: 2025,
    rating: 8.0,
    genre: "Horror",
    poster: moviePoster2,
    description: "Every night at 3 AM, something sinister stalks the residents of Elm Street."
  },
  {
    id: 21,
    title: "Blood Moon Rising",
    year: 2024,
    rating: 7.8,
    genre: "Horror",
    poster: moviePoster3,
    description: "A small town faces an ancient curse that awakens during the blood moon."
  },
  {
    id: 25,
    title: "The Last Séance",
    year: 2024,
    rating: 8.2,
    genre: "Horror",
    poster: moviePoster1,
    description: "A medium's final séance unleashes spirits that refuse to rest in peace."
  },

  // Thriller Movies
  {
    id: 4,
    title: "Digital Fortress",
    year: 2024,
    rating: 8.6,
    genre: "Thriller",
    poster: moviePoster1,
    description: "A cybersecurity expert uncovers a massive conspiracy threatening global infrastructure."
  },
  {
    id: 14,
    title: "Mind Games",
    year: 2024,
    rating: 8.3,
    genre: "Thriller",
    poster: moviePoster2,
    description: "A psychological thriller about manipulation and mind control experiments."
  },
  {
    id: 18,
    title: "The Collector",
    year: 2025,
    rating: 7.9,
    genre: "Thriller",
    poster: moviePoster3,
    description: "A detective hunts a serial killer who collects memories from victims."
  },
  {
    id: 22,
    title: "Parallel Lines",
    year: 2024,
    rating: 8.4,
    genre: "Thriller",
    poster: moviePoster1,
    description: "Two strangers' lives intertwine in a web of conspiracy and deception."
  },
  {
    id: 26,
    title: "Silent Witness",
    year: 2024,
    rating: 7.6,
    genre: "Thriller",
    poster: moviePoster2,
    description: "A witness protection case goes wrong, exposing corruption at the highest levels."
  },

  // Adventure Movies
  {
    id: 5,
    title: "Ocean's Call",
    year: 2024,
    rating: 7.7,
    genre: "Adventure",
    poster: moviePoster2,
    description: "Deep sea exploration leads to an extraordinary discovery of ancient civilizations."
  },
  {
    id: 27,
    title: "Mountain's Peak",
    year: 2025,
    rating: 8.0,
    genre: "Adventure",
    poster: moviePoster3,
    description: "Climbers face deadly challenges on the world's most treacherous mountain."
  },
  {
    id: 28,
    title: "Lost Temple",
    year: 2024,
    rating: 7.8,
    genre: "Adventure",
    poster: moviePoster1,
    description: "Archaeologists search for a legendary temple hidden in the Amazon jungle."
  },

  // Sci-Fi Movies
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
    id: 29,
    title: "Starbound",
    year: 2025,
    rating: 8.5,
    genre: "Sci-Fi",
    poster: moviePoster2,
    description: "Humanity's first interstellar mission encounters alien intelligence."
  },
  {
    id: 30,
    title: "Neural Network",
    year: 2024,
    rating: 7.9,
    genre: "Sci-Fi",
    poster: moviePoster1,
    description: "In a world where minds can be uploaded, identity becomes questionable."
  },

  // Drama Movies
  {
    id: 8,
    title: "Lost Symphony",
    year: 2025,
    rating: 8.0,
    genre: "Drama",
    poster: moviePoster2,
    description: "A musician's journey to rediscover their lost masterpiece."
  },
  {
    id: 10,
    title: "City of Dreams",
    year: 2024,
    rating: 7.8,
    genre: "Drama",
    poster: moviePoster1,
    description: "Urban life and human connections in a bustling metropolis."
  },

  // Mystery Movies
  {
    id: 9,
    title: "Night Vision",
    year: 2024,
    rating: 8.3,
    genre: "Mystery",
    poster: moviePoster3,
    description: "Detective work meets supernatural elements in this gripping mystery."
  }
];

export const getFeaturedMovies = (): Movie[] => {
  return allMovies.filter(movie => movie.rating >= 8.2).slice(0, 5);
};

export const getTrendingMovies = (): Movie[] => {
  return allMovies.filter(movie => movie.year === 2024).slice(0, 8);
};

export const getUpcomingMovies = (): Movie[] => {
  return allMovies.filter(movie => movie.year === 2025).slice(0, 6);
};

export const getPersonalizedMovies = (): Movie[] => {
  return allMovies.filter(movie => movie.genre === "Mystery" || movie.genre === "Drama").slice(0, 4);
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  if (genre === "All") return allMovies;
  return allMovies.filter(movie => movie.genre === genre);
};

export const getAllGenres = (): string[] => {
  const genres = Array.from(new Set(allMovies.map(movie => movie.genre)));
  return ["All", ...genres.sort()];
};