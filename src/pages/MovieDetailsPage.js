import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchMovieDetails, fetchMovieCast } from "../services/movieApi";
import { Link } from "react-router-dom";
import { setBreadcrumbs } from '../redux/slices/breadcrumbsSlice';
import { useDispatch } from 'react-redux';

const DetailWrapper = styled.div`
    padding: 20px;
`;

const MoviePoster = styled.img`
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
`;

const CastWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`;

const ActorCard = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ActorImage = styled.img`
    width: 100%;
    max-width: 100px;
    margin-bottom: 10px;
`;



function MovieDetailPage() {
    const { id } = useParams(); // Fetching movie id from URL
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);  // This will store the selected actor's details


    const dispatch = useDispatch();
    useEffect(() => {
        const fetchDetailsAndCast = async () => {
            try {
                const details = await fetchMovieDetails(id);
                const movieCast = await fetchMovieCast(id);
                console.log(details)
                setMovie(details);
                setCast(movieCast);
                dispatch(setBreadcrumbs([
                    { label: 'Search', path: '/' },
                    { label: details.title, path: `movie/${details.id}` }
                ]));
            } catch (error) {
                console.error("Error fetching movie details and cast:", error.message);
            }
        };

        fetchDetailsAndCast();
    }, [id]);




    if (!movie) return <p>Loading...</p>;

    return (
        <DetailWrapper>
            <MoviePoster src={movie.posterPath} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>

            <h3>Cast:</h3>
            <CastWrapper>
                {cast.map(actor => (
                    <Link to={`/actor/${actor.id}`} key={actor.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ActorCard>
                            <ActorImage src={actor.profilePath} alt={actor.name} />
                            <p>{actor.name}</p>
                            <p><small>as {actor.character}</small></p>
                        </ActorCard>
                    </Link>
                ))}
            </CastWrapper>
        </DetailWrapper>
    );
}

export default MovieDetailPage;