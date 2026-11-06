function MovieCard({
  movie,
  onView,
  onFavorite,
  isFavorite,
}) {
  return (
    <div className="movie-card">

      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://placehold.co/300x450?text=No+Poster"
        }
        alt={movie.Title}
        className="poster"
      />

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <p>{movie.Year}</p>

        <p className="type">{movie.Type}</p>

        <button
          className="details-btn"
          onClick={() => onView(movie.imdbID)}
        >
          View Details
        </button>

        <button
          className={isFavorite ? "fav-active" : "fav-btn"}
          onClick={() => onFavorite(movie)}
        >
          {isFavorite ? "♥ Remove Favorite" : "♡ Add Favorite"}
        </button>
      </div>

    </div>
  );
}

export default MovieCard;