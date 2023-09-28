import React, { useState, useEffect } from 'react';


function MovieList({ onSelectMovie }) {
    const [movies, setMovies] = useState([]);


    return (
        <div>
            {movies.map(movie => (
                <div key={movie.id} onClick={() => onSelectMovie(movie.id)}>
                    <h3>{movie.title}</h3>
                    <img src={movie.posterPath} alt={movie.title} />
                </div>
            ))}
        </div>
    );
}

export default MovieList;