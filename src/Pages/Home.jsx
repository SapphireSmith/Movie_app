"use client";

import { useState, useEffect } from "react";

// Simple UI Components
const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>{children}</div>
)

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
)

const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${className}`}
    {...props}
  >
    {children}
  </select>
)

// Icons
const Search = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const Filter = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
    />
  </svg>
)

const Star = ({ filled = false }) => (
  <svg className={`h-4 w-4 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"}`} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

const Heart = ({ filled = false }) => (
  <svg
    className={`h-5 w-5 ${filled ? "text-red-500 fill-current" : "text-gray-400"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const Play = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293L12 11l.707-.707A1 1 0 0113.414 10H15M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const TMDB_API_KEY = "32d0294720a95481124243e5ab3d02da" // <-- Replace with your TMDB API key

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w400"

// Movie genres for filtering
const movieGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
]

// Mock data for demonstration (replace with TMDB API calls)
const mockMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    overview: "Set more than a decade after the events of the first film, learn the story of the Sully family.",
    poster_path: "/placeholder.svg?height=400&width=300",
    backdrop_path: "/placeholder.svg?height=200&width=400",
    release_date: "2022-12-16",
    vote_average: 7.6,
    genre_ids: [878, 12, 14],
    media_type: "movie",
  },
  {
    id: 2,
    title: "Black Panther: Wakanda Forever",
    overview: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation.",
    poster_path: "/placeholder.svg?height=400&width=300",
    backdrop_path: "/placeholder.svg?height=200&width=400",
    release_date: "2022-11-11",
    vote_average: 7.3,
    genre_ids: [28, 12, 18],
    media_type: "movie",
  },
  {
    id: 3,
    title: "The Last of Us",
    overview:
      "Twenty years after modern civilization has been destroyed, Joel must smuggle Ellie out of an oppressive quarantine zone.",
    poster_path: "/placeholder.svg?height=400&width=300",
    backdrop_path: "/placeholder.svg?height=200&width=400",
    first_air_date: "2023-01-15",
    vote_average: 8.7,
    genre_ids: [18, 27, 878],
    media_type: "tv",
  },
  {
    id: 4,
    title: "Wednesday",
    overview: "A coming-of-age supernatural mystery comedy horror series that follows Wednesday Addams.",
    poster_path: "/placeholder.svg?height=400&width=300",
    backdrop_path: "/placeholder.svg?height=200&width=400",
    first_air_date: "2022-11-23",
    vote_average: 8.5,
    genre_ids: [35, 80, 9648],
    media_type: "tv",
  },
  {
    id: 5,
    title: "Top Gun: Maverick",
    overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    poster_path: "/placeholder.svg?height=400&width=300",
    backdrop_path: "/placeholder.svg?height=200&width=400",
    release_date: "2022-05-27",
    vote_average: 8.3,
    genre_ids: [28, 18],
    media_type: "movie",
  },
  {
    id: 6,
    title: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.",
    poster_path: "/placeholder.svg?height=400&width=300",
    backdrop_path: "/placeholder.svg?height=200&width=400",
    first_air_date: "2016-07-15",
    vote_average: 8.7,
    genre_ids: [18, 14, 27],
    media_type: "tv",
  },
]

// Star Rating Component
const StarRating = ({ rating, onRate, readonly = false }) => {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${readonly ? "cursor-default" : "cursor-pointer"} transition-colors`}
          onClick={() => !readonly && onRate && onRate(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          disabled={readonly}
        >
          <Star filled={star <= (hover || rating)} />
        </button>
      ))}
      <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
    </div>
  )
}

// Movie Card Component
const MovieCard = ({ movie, onToggleFavorite, onRate, userRating, isFavorite }) => {
  const isMovie = movie.media_type === "movie"
  const title = isMovie ? movie.title : movie.name
  const releaseDate = isMovie ? movie.release_date : movie.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A"

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={movie.poster_path || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <Button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="mr-2" />
            Watch Now
          </Button>
        </div>
        <button
          onClick={() => onToggleFavorite(movie.id)}
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
        >
          <Heart filled={isFavorite} />
        </button>
        <div className="absolute top-2 left-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
          {isMovie ? "Movie" : "TV Show"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{movie.overview}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">{year}</span>
          <div className="flex items-center space-x-1">
            <Star filled />
            <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="text-sm text-gray-600 mb-2">Your Rating:</div>
          <StarRating rating={userRating || 0} onRate={(rating) => onRate(movie.id, rating)} />
        </div>
      </div>
    </Card>
  )
}

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // New state for pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages from TMDB API

  // Fetch movies from TMDB
  useEffect(() => {
    setLoading(true);

    const fetchMovies = async () => {
      let url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${currentPage}`;

      // If there's a search query, use the search endpoint
      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
          searchQuery
        )}&page=${currentPage}&include_adult=false`;
      }

      // Add genre filter
      if (selectedGenre) {
        url += `&with_genres=${selectedGenre}`;
      }

      // Add minimum rating filter
      if (minRating) {
        url += `&vote_average.gte=${minRating}`;
      }

      // Fetch data
      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1); // Update total pages
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, selectedGenre, minRating, sortBy, currentPage]); // Include currentPage as a dependency

  // Load user data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieAppFavorites");
    const savedRatings = localStorage.getItem("movieAppRatings");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRatings) setUserRatings(JSON.parse(savedRatings));
  }, []);

  const handleToggleFavorite = (movieId) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];
    setFavorites(newFavorites);
    localStorage.setItem("movieAppFavorites", JSON.stringify(newFavorites));
  };

  const handleRateMovie = (movieId, rating) => {
    const newRatings = { ...userRatings, [movieId]: rating };
    setUserRatings(newRatings);
    localStorage.setItem("movieAppRatings", JSON.stringify(newRatings));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("");
    setSelectedType("all");
    setMinRating("");
    setSortBy("popularity");
    setCurrentPage(1); // Reset to the first page
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Discover Movies</h1>
          <p className="text-xl text-blue-100 mb-8">Find your next favorite movie or binge-worthy series</p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-black text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
            </h2>
            <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="flex items-center">
              Filters
            </Button>
          </div>
          {showFilters && (
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                  <Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    <option value="">All Genres</option>
                    {movieGenres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                  <Select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                    <option value="">Any Rating</option>
                    <option value="7">7+ Stars</option>
                    <option value="8">8+ Stars</option>
                    <option value="9">9+ Stars</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating</option>
                    <option value="year">Release Date</option>
                    <option value="title">Title</option>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {movies.length} results on page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading movies...</div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No movies found</div>
            <Button onClick={clearFilters} variant="primary">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Card key={movie.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => handleToggleFavorite(movie.id)}
                    className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <Heart filled={favorites.includes(movie.id)} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{movie.overview}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={handlePreviousPage}
            variant="outline"
            disabled={currentPage === 1}
            className="px-4 py-2"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            variant="outline"
            disabled={currentPage === totalPages}
            className="px-4 py-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
