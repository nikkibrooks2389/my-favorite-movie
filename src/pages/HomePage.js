import React, { useState, useEffect } from 'react';

import SearchBar from '../components/common/SearchBar';
import styled from 'styled-components';
import { fetchTrendingMovies } from '../services/movieApi';
import MovieCard from '../components/common/MovieCard';
import movieBackground1 from '../assets/movieBackground2.jpg';

const HomeWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom:100px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin-bottom: 2.5rem;
  font-family: 'Bebas Neue', sans-serif;
  @media (max-width: ${(props) => props.theme.screenSizes.mobile}) {
   font-size: 3.2rem;
  }
  
`;

const SectionTitle = styled.h2`
    font-size: 2.5rem;
    margin: 2rem 0;
    font-family: 'Bebas Neue', sans-serif;
    @media (max-width: ${(props) => props.theme.screenSizes.tablet}) {
    text-align: center;
  }
`;


const SectionWrapper = styled.div`
  margin: 3rem;
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

const MovieHeaderBackground = styled.img.attrs({
  src: movieBackground1
})`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  object-fit: cover; // Ensures the image covers the entire area without distortion
`;

const MovieHeaderWrapper = styled.div`
    position: relative;
    height: 400px;
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    border:none;
    @media (max-width: ${(props) => props.theme.screenSizes.tablet}) {
    height: 300px;
  }
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
    height: '350px',
  };

  return (
    <HomeWrapper>
      <MovieHeaderWrapper>
        <MovieHeaderBackground />

        <Title>My Favorite Movies</Title>
        <SearchBar />

      </MovieHeaderWrapper>
      <SectionWrapper>

        <SectionTitle>Trending Now</SectionTitle>
        <SectionContainer>
          <List>
            {trendingMovies.map((movie) => (
              <MovieCard customStyle={customCardStyle} key={movie.id} movie={movie} />
            ))}
          </List>

        </SectionContainer>
      </SectionWrapper>
    </HomeWrapper>
  );
}

export default HomePage;