
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { resetBreadcrumbs } from '../redux/slices/breadcrumbsSlice';

// import Search from '../components/common/Search';
import MovieList from '../components/common/MovieList';
import { fetchMovies } from "../services/movieApi";

import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

// const StyledInput = styled(Input)`
//   color: red;
//   border: 1px solid green;

//   &:hover {
//     border-color: blue;
//   }
// `;

const HomeWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;



const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 4px 0 0 4px;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    border-radius: 0 4px 4px 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-left: -1px;
    height: 56px;  // Matches the height of the TextField
    transition: all 0.3s;

    &:hover {
      background-color: #5865f2;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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


    useEffect(() => {
        dispatch(resetBreadcrumbs());
    }, [dispatch]);

    return (
        <div>

            <HomeWrapper>
                <h2>My Favorite Movies</h2>

                <SearchForm onSubmit={handleSubmit}>
                    <StyledTextField
                        id="outlined-search"
                        label="Search"
                        type="search"
                        variant="outlined"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
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