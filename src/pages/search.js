import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { searchMovies } from "../pages/api/movieApi"; // Adjust the import path if needed

const SearchPage = () => {
  const router = useRouter();
  const { q = "", page = 1 } = router.query;
  const [query, setQuery] = useState(q);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      setLoading(true);
      setIsFetching(true);
      setError(null); // Reset error state before making a request

      try {
        const data = await searchMovies(query, page); // Call the API function
        if (data.length > 0) {
          setMovies(data);
        } else {
          setError("No movies found.");
        }
      } catch (error) {
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    };

    getMovies();
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { q: query, page: 1 }, // Reset page to 1 when searching
    });
  };

  const handlePagination = (newPage) => {
    router.push({
      pathname: "/search",
      query: { q: query, page: newPage },
    });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="space-y-8" style={{ marginLeft: "20px" }}>
        <div className="space-y-4">
          <h1 className="text-3xl font-display font-bold">Search Movies</h1>
          <p className="text-muted-foreground">
            Find your favorite movies by title
          </p>
        </div>
      </div>
      <br></br>
      <br></br>
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          required
          className="px-4 py-2 w-full max-w-md rounded-md text-black bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        
      </form>

      {error && <div className="text-red-500 text-center">{error}</div>} {/* Show error message */}

      {query ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {loading ? (
              <div className="text-center col-span-full">
                <p>Loading...</p>
              </div>
            ) : (
              movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:scale-105"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-[350px] object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-100 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <h2 className="text-xl font-bold text-white">{movie.title}</h2>
                      <p className="text-sm text-gray-300">
                        ⭐ {movie.vote_average.toFixed(1)} | 🗓 {movie.release_date}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center col-span-full">
                  <p>No movies found</p>
                </div>
              )
            )}
          </div>

          {isFetching && !loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-b-4 border-gray-300"></div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold color-gray">Enter a movie title to search</h2>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
