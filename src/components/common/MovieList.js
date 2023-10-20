// src/components/MovieList.js
import React from 'react';
import styled from 'styled-components';
import MovieCard from "./MovieCard";

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

function MovieList({ movies }) {
    return (
        <ListWrapper>
            {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </ListWrapper>
    );
}

export default MovieList;