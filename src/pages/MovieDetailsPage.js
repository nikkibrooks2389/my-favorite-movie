import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMovieDetails, fetchMovieCast } from '../services/movieApi';
import { getYearFromDate, formatDate } from '../utils/dateUtils';
import CustomCircularProgress from '../components/common/CustomCircularProgress';
import { Link } from 'react-router-dom';
import ActorCard from '../components/common/ActorCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist, selectIsInWatchlist } from '../redux/slices/watchListSlice';

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
   z-index: 2;
`;

const MovieTitle = styled.h2`
  font-size: 2.5rem;
  margin:1rem 0 1rem 0;
`;

const MovieDescription = styled.p`
  font-size: 1rem;
  margin-top: 2rem;
`;

const CastContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
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
    padding-bottom:1rem
`;

const MovieDetailsContainerBottom = styled.div`
    width: 100%;
    padding: 3rem;
    flex-direction: column  ;
    align-items: center;
    height: 100%;
`;

const StyledLink = styled(Link)`
text-decoration: none; 
color:${(props) => props.theme.colors.text};
font-weight: bold; 
font-size: 1.5rem;
margin-top: 10px; 
text-align: center;


/* Add custom margin to the right of the icon for spacing */
.MuiSvgIcon-root {
    margin-left: 5px; /* Adjust this value as needed */
    vertical-align: middle;
    font-size: 1.8rem;
    padding-bottom: 2px;
}
`;

const MovieDetails = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 1rem;
    align-items: center;
    `;


const WatchlistButton = styled.button`
    background-color: ${(props) => (props.isInWatchlist ? 'red' : 'green')}; // Customize the background color
    color: white; // Text color
    padding: 10px 20px; // Adjust the padding as needed
    font-size: 16px; // Font size
    border: none; // Remove the border
    cursor: pointer; // Add a pointer cursor
    transition: background-color 0.3s ease-in-out; // Add a smooth background color transition
  
    &:hover {
      background-color: ${(props) => (props.isInWatchlist ? 'darkred' : 'darkgreen')}; // Customize the hover background color
    }
  `;

const UserScoreWrapper = styled.div`
display: flex;
align-items: center;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    font-weight: bold;
  
    `

function MovieDetailPage() {
    const dispatch = useDispatch();
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);

    const isInWatchlist = useSelector((state) => selectIsInWatchlist(state, movieId));

    console.log(isInWatchlist)

    const handleToggleWatchlist = async () => {
        if (isInWatchlist) {
            console.log("Removing movie with ID:", movieId);
            dispatch(removeFromWatchlist({ id: movieId }));
        } else {
            // Fetch the movie data and add it to the watchlist
            try {
                const details = await fetchMovieDetails(movieId);
                dispatch(addToWatchlist(details));
            } catch (error) {
                console.error('Error fetching movie details:', error.message);
            }
        }
    };

    const formatMovieDetails = () => {
        let releaseDate = formatDate(movie.releaseDate)
        let movieGenres = movie?.genres.map(movie => " " + movie.name)
        let movieRuntime = movie?.runtime
        return `${releaseDate} • ${movieGenres} • ${movieRuntime}`;
    }


    useEffect(() => {
        const fetchDetailsAndCast = async () => {
            try {
                const details = await fetchMovieDetails(movieId);
                const movieCastCrew = await fetchMovieCast(movieId);
                setMovie(details);
                setCast(movieCastCrew.cast);
                setCrew(movieCastCrew.crew)

            } catch (error) {
                console.error('Error fetching movie details and cast:', error.message);
            }
        };

        fetchDetailsAndCast();
    }, [movieId]);




    if (!movie) return <p>Loading...</p>;

    return (
        <DetailContainer>
            <MovieDetailsContainer>
                <MovieBackdropContainer src={movie.backdropPath} />

                <MoviePosterImage src={movie.posterPath} alt={movie.title} />

                <MovieInfoContainer>
                    <MovieTitle>{`${movie.title} (${getYearFromDate(movie.releaseDate)})`}</MovieTitle>
                    <MovieDetails> {formatMovieDetails()}</MovieDetails >
                    <UserScoreWrapper>
                        <CustomCircularProgress percent={Math.round(movie.userScore)} size={60} />
                        <div style={{ marginLeft: "1rem" }}>

                            <span >
                                User
                            </span>
                            <br />
                            <span>Score</span>
                        </div>
                    </UserScoreWrapper>

                    <WatchlistButton isInWatchlist={isInWatchlist} onClick={handleToggleWatchlist}>
                        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    </WatchlistButton>
                    <MovieDescription>  <h2>Overview</h2> {movie.description}</MovieDescription>

                </MovieInfoContainer>
            </MovieDetailsContainer>
            <MovieDetailsContainerBottom>
                <CastHeader>Top Billed Cast</CastHeader>
                <CastContainer>
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

                <StyledLink state={{ cast, crew }} to={`/movie/${movie.id}/cast-crew`}>View Full Cast and Crew  <ArrowForwardIcon /> </StyledLink>
            </MovieDetailsContainerBottom>
        </DetailContainer >
    );
}

export default MovieDetailPage;