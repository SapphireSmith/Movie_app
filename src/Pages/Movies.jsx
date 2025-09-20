import React, { useState, useEffect } from "react";

const TMDB_API_KEY = import.meta.env.REACT_APP_TMDB_API_KEY; // Use the environment variable
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w400";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular"); // Default category
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${TMDB_API_KEY}&language=en-US&page=${currentPage}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    };

    fetchMovies();
  }, [category, currentPage]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Explore Movies</h1>
          <p className="text-xl text-blue-100 mb-8">
            Browse movies by category, rating, and more
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="flex space-x-4 mb-6">
          {["popular", "top_rated", "upcoming", "now_playing"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg font-medium ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {cat.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
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
                <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Rating: {movie.vote_average.toFixed(1)}
                  </span>
                  <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">
                    Like
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;