"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchMovieDetails, fetchMovieVideos, fetchMovieCast } from "../api/movieApi";
import { toast } from "react-toastify";
import ReviewForm from "@/components/ReviewForm";
const FilmDetail = ({user}) => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // If id is falsy, exit early

    const fetchAllMovieData = async () => {
      try {
        const [movieData, videos, castData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieVideos(id),
          fetchMovieCast(id),
        ]);

        setMovie(movieData);
        setCast(castData || []);

        const foundTrailer =
          videos.find((video) => video.type === "Trailer" && video.site === "YouTube") ||
          videos.find((video) => video.site === "YouTube");

        setTrailer(foundTrailer || null);
      } catch (error) {
        toast.error("Failed to load movie data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovieData();
  }, [id]); // Only runs when `id` changes


  if (loading) return <div className="text-center text-2xl text-white py-10">Loading...</div>;
  if (!movie) return <div className="text-center text-2xl text-white py-10">Movie not found</div>;

  return (
    <div className="bg-gradient-to-t from-gray-800 via-gray-900 to-black text-white min-h-screen py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg text-gray-400">{movie.release_date}</p>
        </div>
        <div className="md:w-1/3 text-center md:text-right">
          <span className="text-lg text-yellow-500 font-semibold">⭐ {movie.vote_average}</span>
        </div>
      </div>

      <div className="relative w-full h-[50vh] mt-8 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-8 flex flex-col md:flex-row gap-10">
        {/* Left Side - Poster, Genres, Rating */}
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-white">Genres</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="text-sm text-gray-300 bg-gray-700 rounded-full px-4 py-1"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white">Rating</h3>
            <p className="text-lg text-gray-300">{movie.vote_average} / 10</p>
          </div>
        </div>

        <div className="md:w-2/3 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Overview</h3>
            <p className="text-lg text-gray-300">{movie.overview}</p>
          </div>

          {trailer && (
            <div>
              <h3 className="text-2xl font-bold text-white">Trailer</h3>
              <div className="mt-4">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  className="w-full h-[350px] rounded-lg shadow-lg"
                  title="Trailer"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Cast */}
          {cast.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white">Cast</h3>
              <div className="mt-4 flex flex-wrap gap-4">
                {cast.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="text-center w-24">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto"
                    />
                    <p className="mt-2 text-gray-300 text-sm">{actor.name}</p>
                    <p className="text-gray-500 text-xs">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    
      <ReviewForm user={user} />
    </div>


  );
};

export default FilmDetail;
