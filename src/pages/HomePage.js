import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Query:', query);
    navigate(`/search/${query}`);
  };

  return (
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
    </HomeWrapper>
  );
}

export default HomePage;