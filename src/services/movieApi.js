// src/api/movies.js

const API_KEY = "d9fbd89a6404c8651bda8422b72df43b"; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch movies based on search query, or fetch popular movies if no query is provided

export async function fetchMovies(query, genre, sortBy) {
    console.log(genre)

    // Base URL for discovery
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1`;

    // If there's a search query, switch to the search endpoint
    if (query) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`;
    }

    // Append genre filter
    if (genre && !query) {
        url += `&with_genres=${genre}`;
    }

    // Append sorting option
    if (sortBy && !query) {
        url += `&sort_by=${sortBy}`;
    }
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        console.log("Fetched Movies:", data.results);
        const movies = data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'your_default_image_url',
        }));

        return movies;
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        throw error;
    }
}

// Fetch details of a specific movie by its ID
export async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);

        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }

        const movie = await response.json();
        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        };
    } catch (error) {
        console.error("Error fetching movie details:", error.message);
        throw error;
    }
}