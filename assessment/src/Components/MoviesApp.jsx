import { useState, useEffect, use } from "react";
import MovieListPage from "./pages/MovieListPage";
import CreateMoviePage from "./pages/CreateMoviePage";
import WaveBackground from "./layout/WaveBackground";
import { useNavigate } from "react-router-dom";
import './movies.css'

export default function MoviesApp() {
  const [view, setView] = useState("list");
  const [movies, setMovies] = useState([]); // ALWAYS array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYW1pa2FAZ21haWwuY29tIiwic3ViIjoiNjk2OGNlN2U4ZTU3Nzc3NTAxMzIzYmE1IiwiaWF0IjoxNzY4NDc2MzA3LCJleHAiOjE3NjkwODExMDd9.9hBsGFhHM_CuCCDxYtEjEYgzvF_LPuUTi5SSYiRZFdE"
        const response = await fetch(
          "http://localhost:3000/api/v1/movies",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response, "movie api response");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.data, "fetched movies");

        // ✅ IMPORTANT FIX
        setMovies(data.data ? data.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="api-response"><p>Loading movies...</p></div>
  if (error) return <div className="api-response"><p>Error fetching movies: {error}</p></div> 

  return (
    <div className="app-container">
      <WaveBackground />

      {view === "list" && movies.length > 0 ? (
        <MovieListPage
          movies={movies}
          onAdd={() => setView("create")}
        />
      ) : (
        // <CreateMoviePage
        //   onCancel={() => setView("list")}
        //   onSubmit={(movie) => {
        //     setMovies((prev) => [movie, ...prev]);
        //     setView("list");
        //   }}
        // />

        <>
        <div className="empty-movie">
          
          <h1>Your movie list is empty</h1>
          <button className="create-movie-btn" onClick={() =>navigate("/createmovie")}>
            Add a new movie
          </button>

        </div>
        </>
      )}
    </div>
  );
}
