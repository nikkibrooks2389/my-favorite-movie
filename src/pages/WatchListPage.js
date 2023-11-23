import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MovieCard from '../components/common/MovieCard';

const WatchlistContainer = styled.div`
  width: 100%;
  margin: 2rem auto;
  border-radius: 8px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 4rem;
  font-family: 'Bebas Neue', sans-serif;
`;

const MovieList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  list-style-type: none;
  padding: 0;
`;

const MovieItem = styled.li`
  padding: 0.5rem 0;

  &:last-child {
    border-bottom: none;
  }
`;

const NoMoviesMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const WatchListPage = () => {

  const watchlist = useSelector((state) => state.watchlist);

  return (
    <WatchlistContainer>
      <Title> Watchlist</Title>
      {watchlist.length === 0 && <NoMoviesMessage>There are no movies in your watchlist</NoMoviesMessage>}

      <MovieList>
        {watchlist.map((movie, index) => (
          <MovieItem key={index}>

            <MovieCard movie={movie} />
          </MovieItem>
        ))}
      </MovieList>
    </WatchlistContainer>
  );
}

export default WatchListPage;