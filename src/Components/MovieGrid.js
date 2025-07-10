import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";
export default function MovieGrid({ movies, watchlist, toggleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  const OnHandleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const OnGenreChange = (e) => {
    setGenre(e.target.value);
  };
  const OnRatingChange = (e) => {
    setRating(e.target.value);
  };
  const matchGenre = (movie, Genre) => {
    return (
      Genre === "All Genres" ||
      movie.genre.toLowerCase() === Genre.toLowerCase()
    );
  };

  const matchSearchterm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
  const matchRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 8;
      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;
      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };
  const filteredMovies = movies.filter(
    (movie) =>
      matchGenre(movie, genre) &&
      matchSearchterm(movie, searchTerm) &&
      matchRating(movie, rating)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder=" Search for a movie..."
        value={searchTerm}
        onChange={OnHandleChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label className="filter-label">Genre</label>
          <select
            className=" filter-dropdown"
            value={genre}
            onChange={OnGenreChange}
          >
            <option value="All Genres">All Genres</option>
            <option value="Action">Action</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label className="filter-label">Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={OnRatingChange}
          >
            <option value="All">All</option>
            <option value="Good">Good</option>
            <option value="Ok">Ok</option>
            <option value="Bad">Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            toggleWatchlist={toggleWatchlist}
            iswatchlisted={watchlist.includes(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
