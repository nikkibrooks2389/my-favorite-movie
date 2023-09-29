import React, { useState } from 'react';
import styled from 'styled-components';

const WatchlistContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const MovieList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MovieItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }
`;

const WatchListPage = () => {
  // Sample hardcoded list of movies for the watchlist
  const [movies, setMovies] = useState([
    "The Shawshank Redemption",
    "The Godfather",
    "Pulp Fiction",
    "The Dark Knight",
    "Forrest Gump"
  ]);

  return (
    <WatchlistContainer>
      <Title>Your Watchlist</Title>
      <MovieList>
        {movies.map((movie, index) => (
          <MovieItem key={index}>
            {movie}
          </MovieItem>
        ))}
      </MovieList>
    </WatchlistContainer>
  );
}

export default WatchListPage;