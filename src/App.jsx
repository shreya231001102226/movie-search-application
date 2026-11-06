import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";

import {
  searchMovies,
  getMovieDetails,
} from "./services/api";

function App() {
  const [movies, setMovies] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("favorites")
      ) || [];
    } catch {
      return [];
    }
  });

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);

  const [totalResults, setTotalResults] = useState(0);

  const [showFavorites, setShowFavorites] = useState(false);

  // Save favorites in localStorage
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Search movies
  const handleSearch = async (searchQuery, pageNumber = 1) => {
    try {
      setLoading(true);
      setError("");
      setShowFavorites(false);
      setSelectedMovie(null);

      const response = await searchMovies(
        searchQuery,
        pageNumber
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setTotalResults(
          Number(response.data.totalResults)
        );

        setQuery(searchQuery);
        setPage(pageNumber);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(
          response.data.Error || "No movies found."
        );
      }
    } catch (err) {
      setMovies([]);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // View movie details
  const handleViewDetails = async (id) => {
    try {
      setLoading(true);
      setError("");

      const response = await getMovieDetails(id);

      if (response.data.Response === "True") {
        setSelectedMovie(response.data);
      } else {
        setError(response.data.Error || "Movie details not found.");
      }
    } catch (err) {
      setError("Unable to fetch movie details.");
    } finally {
      setLoading(false);
    }
  };

  // Add or remove favorite
  const handleFavorite = (movie) => {
    const exists = favorites.some(
      (fav) => fav.imdbID === movie.imdbID
    );

    if (exists) {
      setFavorites((prev) =>
        prev.filter(
          (fav) => fav.imdbID !== movie.imdbID
        )
      );
    } else {
      setFavorites((prev) => [...prev, movie]);
    }
  };

  // Check favorite status
  const isFavorite = (id) => {
    return favorites.some(
      (fav) => fav.imdbID === id
    );
  };

  // Pagination
  const totalPages = Math.ceil(totalResults / 10);

  const handleNext = () => {
    if (page < totalPages) {
      handleSearch(query, page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      handleSearch(query, page - 1);
    }
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>🎬 Movie Explorer</h1>
        <p>Discover Movies and Explore Details</p>
      </header>

      <main className="container">

        {/* Search */}
        <SearchBar onSearch={(value) => handleSearch(value, 1)} />

        {/* Navigation */}
        <div className="navigation">
          <button
            className={!showFavorites ? "active-tab" : ""}
            onClick={() => setShowFavorites(false)}
          >
            🔍 Search Movies
          </button>

          <button
            className={showFavorites ? "active-tab" : ""}
            onClick={() => setShowFavorites(true)}
          >
            ❤️ Favorites ({favorites.length})
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="error">
            {error}
          </div>
        )}

        {/* Favorites */}
        {!loading && !error && showFavorites && (
          <Favorites
            favorites={favorites}
            onView={handleViewDetails}
            onFavorite={handleFavorite}
          />
        )}

        {/* Movie Results */}
        {!loading && !error && !showFavorites && (
          <>
            {movies.length > 0 ? (
              <>
                <h2 className="section-title">
                  Search Results
                </h2>

                <div className="movie-grid">

                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onView={handleViewDetails}
                      onFavorite={handleFavorite}
                      isFavorite={isFavorite(movie.imdbID)}
                    />
                  ))}

                </div>

                {/* Pagination */}
                <div className="pagination">

                  <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                  >
                    ← Previous
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={page >= totalPages}
                  >
                    Next →
                  </button>

                </div>
              </>
            ) : (
              <div className="empty">
                <h2>Welcome to Movie Explorer!</h2>
                <p>Search for your favorite movies above.</p>
              </div>
            )}
          </>
        )}

      </main>

      {/* Movie Details */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <footer>
        <p>Movie Explorer © 2026 | Powered by OMDb API</p>
      </footer>

    </div>
  );
}

export default App;