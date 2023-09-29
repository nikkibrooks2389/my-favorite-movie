
import React, { useState, useEffect } from 'react';

import Search from '../components/common/Search';
import MovieList from '../components/common/MovieList';
import { fetchMovies } from "../services/movieApi";

import styled from "styled-components";


const HomeWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [genre, setGenre] = useState(null);
    const [sortBy, setSortBy] = useState('popularity.desc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const results = await fetchMovies(query, genre, sortBy);
            setMovies(results);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle the search query change
    const handleSearchChange = (searchQuery) => {
        setQuery(searchQuery);
    };

    // Handle genre change
    const handleGenreChange = (type, value) => {

        setGenre(value);
    };

    // Handle sort by change
    const handleSortChange = (value) => {
        setSortBy(value);
    };

    // Fetch movies whenever the query, genre, or sortBy changes
    useEffect(() => {

        fetchAllMovies();
    }, [query, genre, sortBy]);


    return (
        <div>

            <HomeWrapper>
                <h2>Welcome to the Movie App</h2>
                <Search
                    onSearch={handleSearchChange}
                    onGenreChange={handleGenreChange}
                    onSortChange={handleSortChange}
                />
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