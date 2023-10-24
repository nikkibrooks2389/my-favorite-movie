import React, { useState, useEffect } from 'react';

import SearchBar from '../components/common/SearchBar';
import styled from 'styled-components';
import { fetchTrendingMovies } from '../services/movieApi';
import MovieCard from '../components/common/MovieCard';

const HomeWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  font-family: 'Arial', sans-serif;
  padding-bottom:100px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    margin: 3rem 0;
    @media (max-width: ${(props) => props.theme.screenSizes.tablet}) {
    text-align: center;
  }
`;



const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  
  /* Customize the scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    width: 10px; /* Customize the width of the scrollbar */
  }

  /* Customize the scrollbar thumb for WebKit browsers */
  &::-webkit-scrollbar-thumb {
    background-color: #333; /* Customize the thumb color */
    border-radius: 10px; /* Customize the thumb radius */
  }

  /* Customize the scrollbar track for WebKit browsers */
  &::-webkit-scrollbar-track {
    background-color: #222; /* Customize the track color */
    border-radius: 10px; /* Customize the track radius */
  }
`;


const List = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom:1rem;
    gap: 1rem;
  
`;
const HomePage = () => {

  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const trendingData = await fetchTrendingMovies();
      setTrendingMovies(trendingData);
    }

    fetchData();
  }, []);

  const customCardStyle = {
    height: '350px', // Adjust the height as needed
  };

  return (
    <HomeWrapper>
      <Title>Welcome to My Favorite Movies</Title>
      <SearchBar />

      <SectionTitle>Trending Now</SectionTitle>
      <SectionContainer>
        <List>
          {trendingMovies.map((movie) => (
            <MovieCard customStyle={customCardStyle} key={movie.id} movie={movie} />
          ))}
        </List>

      </SectionContainer>
    </HomeWrapper>
  );
}

export default HomePage;