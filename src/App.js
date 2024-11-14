import React, { useEffect, useState } from "react";
import "./index.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

const APIKEY = process.env.REACT_APP_OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${APIKEY}`;
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    try {
      const res = await fetch(`${API_URL}&s=${title}`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      <div className='empty'>
        <h2>No movies found</h2>
      </div>;
    }
  };

  useEffect(() => {
    searchMovies("Iron man");
  }, []);

  return (
    <div className='app'>
      <h1>BingeWatch</h1>

      <div className='search'>
        <input
          type='text'
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
