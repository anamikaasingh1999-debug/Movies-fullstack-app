import { useState } from "react";
import Header from "../Header";
import MovieCard from "../MovieCard";
import Pagination from "../Pagination";

export default function MovieListPage({ movies = [], onAdd }) {
  const [page, setPage] = useState(1);

  const MOVIES_PER_PAGE = 8;

  // Pagination calculations
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const currentMovies = movies.slice(startIndex, endIndex);

  return (
    <div className="content">
      <Header onAdd={onAdd} />

      <div className="movie-grid">
        {currentMovies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(movies.length / MOVIES_PER_PAGE)}
      />
    </div>
  );
}
