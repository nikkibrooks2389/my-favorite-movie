import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieList from '../components/common/MovieList';
import { fetchMovies } from '../services/movieApi';
import styled from 'styled-components';
import NoResultsComponent from '../components/common/NoResults';
const SearchResultsPageWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const SearchResultsPage = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noResultsFound, setNoResultsFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const results = await fetchMovies(query);
                if (results.length === 0) {
                    setNoResultsFound(true);
                }
                setMovies(results);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMovies();
    }, [query]);

    return (
        <SearchResultsPageWrapper>

            <h2>Search Results for: {query}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p> Sorry, an error has occurred. Please try again later.</p>
            ) : noResultsFound ? (
                <NoResultsComponent />
            ) : (
                <MovieList movies={movies} />
            )}
        </SearchResultsPageWrapper>
    );
};

export default SearchResultsPage;