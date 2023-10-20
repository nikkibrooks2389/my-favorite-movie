import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MovieCard from '../components/common/MovieCard';

const WatchlistContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;

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
  // Retrieve the watchlist items from the Redux store
  const watchlist = useSelector((state) => state.watchlist);

  return (
    <WatchlistContainer>
      <Title>Your Watchlist</Title>
      <MovieList>
        {watchlist.map((movie, index) => (
          <MovieItem key={index}>
            {/* Render each movie using the MovieCard component */}
            <MovieCard movie={movie} />
          </MovieItem>
        ))}
      </MovieList>
    </WatchlistContainer>
  );
}

export default WatchListPage;