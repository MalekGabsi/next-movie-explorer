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

export { fetchPopularMovies, searchMovies };