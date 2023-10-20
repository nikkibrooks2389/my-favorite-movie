
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';


import MovieList from '../components/common/MovieList';
import { fetchMovies } from "../services/movieApi";

import styled from "styled-components";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


const HomeWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  border-radius: 4px 0 0 4px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border: 2px solid ${(props) => props.theme.colors.secondary};
  padding: 10px;
  width: 200px;
  transition: border-color 0.3s ease-in-out;
  font-size: 16px;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    border-color: ${(props) => props.theme.colors.secondaryLight};
    box-shadow: 0 0 8px ${(props) => props.theme.colors.primary};
  }
`;

const StyledButton = styled(Button)`
  && {
    border-radius: 0 4px 4px 0;
    background-color: ${(props) => props.theme.colors.secondaryLight};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-left: -1px;
    height: 56px;
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #5865f2;
    }
    
  }
`;



const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const fetchAllMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchMovies(query, genre, sortBy);
      console.log(results)
      setMovies(results);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form behavior
    fetchAllMovies();
  };


  return (
    <div>

      <HomeWrapper>
        <h2>My Favorite Movies</h2>

        <SearchForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <StyledButton type="submit" variant="contained" color="primary">
            <SearchIcon />
          </StyledButton>
        </SearchForm>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <MovieList movies={movies} />
        )}
      </HomeWrapper>

    </div>
  );
}

export default HomePage;