import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieList from '../components/common/MovieList';
import { fetchMovies } from '../services/movieApi';
import styled from 'styled-components';
import SearchBar from '../components/common/SearchBar';
import NoResultsComponent from '../components/common/NoResults';


const SearchResultsPageWrapper = styled.div`

  text-align: center;

`;


const SearchResultsPage = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noResultsFound, setNoResultsFound] = useState(false);


    useEffect(() => {
        const fetchAllMovies = async () => {

            setLoading(true);
            setError(null);

            try {
                const results = await fetchMovies(query);

                if (results.length === 0) {
                    setNoResultsFound(true);
                } else {
                    setNoResultsFound(false);
                    setMovies(results);
                }

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
            <SearchBar defaultQuery={query} />

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