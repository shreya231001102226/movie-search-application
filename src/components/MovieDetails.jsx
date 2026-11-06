function MovieDetails({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modal-overlay">

      <div className="details-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="details-content">

          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://placehold.co/300x450?text=No+Poster"
            }
            alt={movie.Title}
            className="details-poster"
          />

          <div className="details-text">

            <h1>{movie.Title}</h1>

            <p><b>Year:</b> {movie.Year}</p>

            <p><b>Rated:</b> {movie.Rated}</p>

            <p><b>Released:</b> {movie.Released}</p>

            <p><b>Runtime:</b> {movie.Runtime}</p>

            <p><b>Genre:</b> {movie.Genre}</p>

            <p><b>Director:</b> {movie.Director}</p>

            <p><b>Actors:</b> {movie.Actors}</p>

            <p><b>Language:</b> {movie.Language}</p>

            <p><b>Country:</b> {movie.Country}</p>

            <p><b>Awards:</b> {movie.Awards}</p>

            <h3>Movie Ratings</h3>

            <p className="rating">
              ⭐ IMDb: {movie.imdbRating || "N/A"}/10
            </p>

            {movie.Ratings?.map((rating) => (
              <p key={rating.Source}>
                {rating.Source}: {rating.Value}
              </p>
            ))}

            <h3>Plot</h3>

            <p className="plot">
              {movie.Plot}
            </p>

          </div>

        </div>

        <button
          className="close-bottom"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default MovieDetails;