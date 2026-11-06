import MovieCard from "./MovieCard";

function Favorites({
  favorites,
  onView,
  onFavorite,
}) {
  return (
    <div className="favorites-section">

      <h2>❤️ My Favorite Movies</h2>

      {favorites.length === 0 ? (
        <div className="empty">
          <h3>No favorite movies yet!</h3>
          <p>Add movies to your favorites list.</p>
        </div>
      ) : (
        <div className="movie-grid">

          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onView={onView}
              onFavorite={onFavorite}
              isFavorite={true}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default Favorites;