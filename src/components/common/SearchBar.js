import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export const SearchWrapper = styled.div`
  padding: 20px;
  text-align: center;
  /* Add custom styles for the page search bar */
`;

export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  /* Add custom styles for the page search bar */
`;

export const StyledInput = styled.input`
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
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.secondaryLight};
    margin-left: -1px;
    height: 56px;
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

    &:hover {
      background-color: #5865f2; /* Change to your desired hover color */
      transform: scale(1.05); /* Add a scaling effect on hover */
    }

    .MuiSvgIcon-root { /* Style the search icon */
      color: #fff; /* Make the icon white */
    }
  }
`;
const SearchBar = ({ defaultQuery = '' }) => {
  const [query, setQuery] = useState(defaultQuery);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search/${query}`);
    }
  };


  return (
    <SearchForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="Search for a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <StyledButton type="submit" disabled={query.trim() === ''}>
        <SearchIcon />
      </StyledButton>
    </SearchForm>
  );
};

export default SearchBar;