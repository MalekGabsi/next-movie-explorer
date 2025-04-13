import axios from "axios";

const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

 const fetchPopularMovies = async (page) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: "application/json",
      },
      params: {
        page: page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};


 const searchMovies = async (query, page) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`,{

      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      },
      params: {
        query: query,
        page: page,
      },
    });
    
    return await response.data.results;
    
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies. Please try again later.");
  }
};
 const fetchMovieDetails = async (movie_id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movie_id}`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch details for movie ${movie_id}:`, error);
    throw new Error("Failed to fetch movie details");
  }
};

const fetchMovieVideos = async (movieId) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                Accept: "application/json",
            },
        }
    );
    const data = await response.json();
    return data.results;
    };
  const fetchMovieCast = async (movieId) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                Accept: "application/json",
            },
        }
    );
    const data = await response.json();
    return data.cast;
    };

  

export { fetchPopularMovies, searchMovies ,fetchMovieDetails,fetchMovieVideos,fetchMovieCast};