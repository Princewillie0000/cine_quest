// popular Movies
// popular TVshow
// search
//Recommended movies
//Recommended TVshows
// Details of a particular movie
// Trailers
// similar movies

import axios from "axios";

const API_KEY = "52408183d2a06b516b7bdf3559246227";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    console.log("🔍 Raw search results:", response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching search results: ", error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await api.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// fetching popular tvShows
export const fetchPopularTVShows = async () => {
  try {
    const response = await api.get("tv/popular");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular TV Shows: ", error);
    throw error;
  }
};

export const fetchRecommendMovies = async () => {
  try {
    const response = await api.get("movie/top_rated");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Recommended movies: ", error);
    throw error;
  }
};

export const fetchRecommendShows = async () => {
  try {
    const response = await api.get("tv/top_rated");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Recommended shows: ", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details", error);
    throw error;
  }
};

export const fetchShowDetails = async (tvShowId) => {
  try {
    const response = await api.get(`/tv/${tvShowId}`, {
      params: {
        append_to_response: "videos",
      },
    });
    console.log("✅ API Response (TV):", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching show details", error);
    throw error;
  }
};

export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`, {
      params: {
        language: "en-US",
      },
    });

    const trailer = response.data.results.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    console.log(response.data.results);

    return trailer.length ? trailer[0].key : null;
  } catch (error) {
    console.error("Error fetching movie trailer", error);
    throw error;
  }
};

export const fetchShowTrailer = async (tvShowId) => {
  try {
    console.log(
      "Trailer URL:",
      `https://api.themoviedb.org/3/movie/${tvShowId}/videos?api_key=${API_KEY}`
    );

    const response = await api.get(`/tv/${tvShowId}/videos`, {
      params: {
        language: "en-US",
      },
    });

    const trailer = response.data.results.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    console.log("Video results:", response.data.results);

    return trailer.length ? trailer[0].key : null;
  } catch (error) {
    console.error("Error fetching TV Show trailer", error);
    throw error;
  }
};

export const fetchSimilarMovies = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/similar`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    // console.log("Error fetching similar videos", error);
    console.error(
      "Error fetching similar videos:",
      error.response?.data || error.message
    );

    return [];
  }
};

export const fetchSimilarShows = async (tvShowId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${tvShowId}/similar`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log("Error fetching similar tv shows", error);
    return [];
  }
};
