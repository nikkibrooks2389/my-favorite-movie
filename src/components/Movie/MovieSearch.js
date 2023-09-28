import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import { fetchMovies } from '../../services/movieApi';
const MovieSearch = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const setMovies = useState([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const fetchedMovies = await fetchMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    loadMovies();
  }, []);


  return (
    <div>
      {/* <h1>Movie App</h1> */}
      <MovieList onSelectMovie={setSelectedMovieId} />
      {/* {selectedMovieId && <MovieDetails movieId={selectedMovieId} />} */}
    </div>
  );
}

export default MovieSearch;