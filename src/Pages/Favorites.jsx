import React, { useEffect, useState } from "react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w400";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const fetchMoviesByIds = async (movieIds) => {
    if (movieIds.length === 0) return [];

    const movieDetails = await Promise.all(
      movieIds.map(async (movieId) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=32d0294720a95481124243e5ab3d02da&language=en-US`
        );
        return res.json();
      })
    );

    return movieDetails;
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("movieAppFavorites")) || [];
    const savedWatchlist = JSON.parse(localStorage.getItem("movieAppWatchlist")) || [];
    const savedWatched = JSON.parse(localStorage.getItem("movieAppWatched")) || [];

    setFavorites(savedFavorites);
    setWatchlist(savedWatchlist);
    setWatched(savedWatched);

    const fetchCollections = async () => {
      const [favoriteData, watchlistData, watchedData] = await Promise.all([
        fetchMoviesByIds(savedFavorites),
        fetchMoviesByIds(savedWatchlist),
        fetchMoviesByIds(savedWatched),
      ]);

      setFavoriteMovies(favoriteData);
      setWatchlistMovies(watchlistData);
      setWatchedMovies(watchedData);
    };

    fetchCollections();
  }, []);

  const handleRemove = (movieId, key) => {
    const map = {
      movieAppFavorites: { ids: favorites, setIds: setFavorites, movies: favoriteMovies, setMovies: setFavoriteMovies },
      movieAppWatchlist: { ids: watchlist, setIds: setWatchlist, movies: watchlistMovies, setMovies: setWatchlistMovies },
      movieAppWatched: { ids: watched, setIds: setWatched, movies: watchedMovies, setMovies: setWatchedMovies },
    };

    const collection = map[key];
    const updatedIds = collection.ids.filter((id) => id !== movieId);
    collection.setIds(updatedIds);
    collection.setMovies(collection.movies.filter((movie) => movie.id !== movieId));
    localStorage.setItem(key, JSON.stringify(updatedIds));
  };

  const renderSection = (title, movies, key) => {
    if (movies.length === 0) return null;

    return (
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">{title}</h2>
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
                    onClick={() => handleRemove(movie.id, key)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Your Movie Collections
        </h1>
        {favoriteMovies.length === 0 &&
        watchlistMovies.length === 0 &&
        watchedMovies.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">Your favorites, watchlist, and watched list are empty.</p>
            <a
              href="/"
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Browse Movies
            </a>
          </div>
        ) : (
          <>
            {renderSection("Favorites", favoriteMovies, "movieAppFavorites")}
            {renderSection("Watchlist", watchlistMovies, "movieAppWatchlist")}
            {renderSection("Watched", watchedMovies, "movieAppWatched")}
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
