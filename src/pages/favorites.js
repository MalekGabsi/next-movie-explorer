/* // pages/favorites.js
import { useSelector } from "react-redux";

const Favorites = () => {
  const { watchlist } = useSelector((state) => state.watchlist);

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
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:scale-105">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; */


import { useState, useEffect } from 'react';



const Favorites = () => {
  const [watchlist, setWatchlist] = useState([]);  useEffect(() => {
    // Only run on the client-side (browser)
    if (typeof window !== 'undefined') {
      const savedWatchlist = localStorage.getItem('watchlist');
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    }
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="space-y-8" style={{ marginLeft: "20px" }}>
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold">Search Movies</h1>
          <p className="text-muted-foreground opacity-70">  
            Movies you&apos;ve saved to watch later
          </p>
        </div>
        </div>
        <br></br>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:scale-105">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

