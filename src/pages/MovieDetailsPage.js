import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMovieDetails, fetchMovieCast } from '../services/movieApi';
import { getYearFromDate } from '../utils/dateUtils';
import { Link } from 'react-router-dom';
import { setBreadcrumbs } from '../redux/slices/breadcrumbsSlice';
import { useDispatch } from 'react-redux';
import ActorCard from '../components/common/ActorCard';

const DetailContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieDetailsContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  height:500px
`;

const MovieBackdropContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  z-index: 1;
  filter: blur(3px);
  opacity: 0.3;
`;

const MoviePosterImage = styled.img`
  width: 100%;
  border-radius: 10px;
  max-width: 300px;
  z-index: 2;
  `;

const MovieInfoContainer = styled.div`
   margin: 0 2rem;
`;

const MovieTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const MovieDescription = styled.p`
  font-size: 16px;
`;

const CastContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  overflow: auto;
  /* Customize the scrollbar */

  /* Customize the scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    width: 10px; /* Customize the width of the scrollbar */
  }

  /* Customize the scrollbar thumb for WebKit browsers */
  &::-webkit-scrollbar-thumb {
    background-color: #333; /* Customize the thumb color */
    border-radius: 10px; /* Customize the thumb radius */
  }

  /* Customize the scrollbar track for WebKit browsers */
  &::-webkit-scrollbar-track {
    background-color: #222; /* Customize the track color */
    border-radius: 10px; /* Customize the track radius */
  }
`;


const CastHeader = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const TopBilledCastList = styled.div`

    display: flex;
    flex-direction: row;
    overflow: auto;
    justify-content: center;
`;

const MovieDetailsContainerBottom = styled.div`
    width: 100%;
    padding: 3rem;
    // display: flex;
    flex-direction: column  ;
    align-items: center;
    height: 100%;
`;

function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchDetailsAndCast = async () => {
            try {
                const details = await fetchMovieDetails(id);
                const movieCast = await fetchMovieCast(id);
                setMovie(details);
                setCast(movieCast);
                dispatch(
                    setBreadcrumbs([
                        { label: 'Search', path: '/' },
                        { label: details.title, path: `movie/${details.id}` },
                    ])
                );
            } catch (error) {
                console.error('Error fetching movie details and cast:', error.message);
            }
        };

        fetchDetailsAndCast();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <DetailContainer>
            <MovieDetailsContainer>
                <MovieBackdropContainer src={movie.backdropPath} />

                <MoviePosterImage src={movie.posterPath} alt={movie.title} />

                <MovieInfoContainer>
                    <MovieTitle>{`${movie.title} (${getYearFromDate(movie.releaseDate)})`}</MovieTitle>
                    <h2>Overview</h2>
                    <MovieDescription>{movie.description}</MovieDescription>
                </MovieInfoContainer>
            </MovieDetailsContainer>
            <MovieDetailsContainerBottom>
                <CastContainer>
                    <CastHeader>Top Billed Cast</CastHeader>
                    <TopBilledCastList>

                        {cast.slice(0, 10).map((actor) => (
                            <Link
                                to={`/actor/${actor.id}`}
                                key={actor.id}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <ActorCard actor={actor} />
                            </Link>
                        ))}
                    </TopBilledCastList>
                </CastContainer>
            </MovieDetailsContainerBottom>
        </DetailContainer>
    );
}

export default MovieDetailPage;