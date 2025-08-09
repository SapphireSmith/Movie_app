import React, { useEffect, useState } from "react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w400";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Load favorite movie IDs from local storage
    const savedFavorites = JSON.parse(localStorage.getItem("movieAppFavorites")) || [];
    setFavorites(savedFavorites);

    // Fetch movie details for each favorite movie
    const fetchFavoriteMovies = async () => {
      const movieDetails = await Promise.all(
        savedFavorites.map(async (movieId) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=32d0294720a95481124243e5ab3d02da&language=en-US`
          );
          return res.json();
        })
      );
      setMovies(movieDetails);
    };

    if (savedFavorites.length > 0) {
      fetchFavoriteMovies();
    }
  }, []);

  const handleRemoveFavorite = (movieId) => {
    const updatedFavorites = favorites.filter((id) => id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("movieAppFavorites", JSON.stringify(updatedFavorites));
    setMovies(movies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Your Favorite Movies
        </h1>
        {movies.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">You haven't added any favorites yet.</p>
            <a
              href="/"
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Browse Movies
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <img
                  src={
                    movie.poster_path
                      ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {movie.overview}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "N/A"}
                    </span>
                    <button
                      onClick={() => handleRemoveFavorite(movie.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;