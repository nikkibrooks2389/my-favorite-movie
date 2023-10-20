// src/api/movies.js
import { formatDate } from '../utils/dateUtils';
import movieplaceholder from '../assets/movie-placeholder.png';
import personPlaceholder from '../assets/person-placeholder.png';
import { convertMinutesToHoursAndMinutes } from '../utils/timeUtils';

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
            releaseDate: formatDate(movie.release_date),
            posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movieplaceholder,
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
        console.log(movie)
        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: movie.release_date,
            genres: movie.genres,
            tagline: movie.tagline,
            userScore: movie.vote_average * 10,
            runtime: convertMinutesToHoursAndMinutes(movie.runtime),
            posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            backdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : '',
        };
    } catch (error) {
        console.error("Error fetching movie details:", error.message);
        throw error;
    }
}

// Fetch cast of a specific movie by its ID
export async function fetchMovieCast(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);

        if (!response.ok) {
            throw new Error('Failed to fetch movie cast');
        }

        const data = await response.json();
        console.log("CAST", data)
        const cast = data.cast.map(actor => ({
            id: actor.id,
            name: actor.name,
            character: actor.character,
            profilePath: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : personPlaceholder,
        }));
        const crew = data.crew.map(crew => ({
            id: crew.id,
            name: crew.name,
            job: crew.job,
            profilePath: crew.profile_path ? `https://image.tmdb.org/t/p/w500${crew.profile_path}` : personPlaceholder,
        }));

        return { cast: cast, crew: crew };
    } catch (error) {
        console.error("Error fetching movie cast:", error.message);
        throw error;
    }
}

export async function fetchActorDetails(actorId) {
    try {
        const response = await fetch(`${BASE_URL}/person/${actorId}?api_key=${API_KEY}&language=en-US`);
        if (!response.ok) {
            throw new Error('Failed to fetch actor details');
        }
        const actor = await response.json();
        return {
            id: actor.id,
            name: actor.name,
            bio: actor.biography,
            profilePath: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
        };
    } catch (error) {
        console.error("Error fetching actor details:", error.message);
        throw error;
    }
}

export async function fetchKnownMovies(actorName) {
    try {
        const response = await fetch(
            `${BASE_URL}/search/person?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
                actorName
            )}&page=1`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch known movies');
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const actorId = data.results[0].id;
            const actorMoviesResponse = await fetch(
                `${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}&language=en-US`
            );

            if (!actorMoviesResponse.ok) {
                throw new Error('Failed to fetch actor movies');
            }

            const actorMoviesData = await actorMoviesResponse.json();
            console.log('Fetched Known Movies:', actorMoviesData.cast);

            const knownMovies = actorMoviesData.cast.map((movie) => ({
                id: movie.id,
                title: movie.title,
                posterPath: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : movieplaceholder,
            }));

            return knownMovies;
        }

        return [];
    } catch (error) {
        console.error('Error fetching known movies:', error.message);
        throw error;
    }
}