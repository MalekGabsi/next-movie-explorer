"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../pages/api/movieApi";
import Link from "next/link";
import { addMovie, removeMovie } from "@/redux/features/watchListSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { toast } from 'react-toastify';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setIsFetching(true);
      try {
        const data = await fetchPopularMovies(page);
        setMovies(data);
      } catch (error) {
        console.log(error);
        
        console.error("Failed to load movies", error);
      } finally {
        setIsFetching(false);
      }
    };

    getMovies();
  }, [page]);

  const dispatch = useDispatch();
  const { watchlist } = useSelector((state) => state.watchlist);

  const isInWatchlist = (movie) =>
    watchlist.some((item) => item.id === movie.id);

  const handleAddToWatchlist = (movie) => {
    if (isInWatchlist(movie)) {
      dispatch(removeMovie(movie.id));
      toast.success(`Removed "${movie.title}" from your watchlist!`);
    } else {
      dispatch(addMovie(movie));
      toast.success(`Added "${movie.title}" to your watchlist!`);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="space-y-8" style={{ marginLeft: "20px" }}>
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold">Popular Movies</h1>
          <p className="text-muted-foreground opacity-70">
            Discover the latest and greatest films trending worldwide
          </p>
        </div>
      </div>

      <br />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:scale-105"
          >
            <Link href={`/films/${movie.id}`} passHref>
            
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
              
            </Link>

            <button
              className="cursor-pointer absolute top-3 right-3 z-10 bg-gray-900 bg-opacity-90 rounded-full p-2 hover:bg-red-500 hover:text-white transition"
              onClick={() => handleAddToWatchlist(movie)}
            >
              <FontAwesomeIcon
                icon={isInWatchlist(movie) ? solidBookmark : regularBookmark}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pt-6">
        <Link
          href={`/?page=${Math.max(1, page - 1)}`}
          passHref
          className={`px-6 py-3 text-white rounded-lg transition-all duration-300 
            ${page === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-500/80"}`}
        >
          <span className="font-semibold">Previous</span>
        </Link>

        <Link
          href={`/?page=${page + 1}`}
          passHref
          className={`px-6 py-3 text-white rounded-lg transition-all duration-300 
            ${isFetching ? "bg-gray-500" : "bg-red-500 hover:bg-red-500/80"}`}
        >
          <span className="font-semibold">Next</span>
        </Link>
      </div>
    </div>
  );
}
