import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const API = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

// Search movies
export const searchMovies = (query, page = 1) => {
  return API.get("/", {
    params: {
      apikey: API_KEY,
      s: query,
      page: page,
      type: "movie",
    },
  });
};

// Get movie details
export const getMovieDetails = (id) => {
  return API.get("/", {
    params: {
      apikey: API_KEY,
      i: id,
      plot: "full",
    },
  });
};