import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchActorDetails, fetchKnownMovies } from '../services/movieApi';


const ActorPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    @media (max-width: ${(props) => props.theme.screenSizes.tablet}) {
        text-align: center;
    }

`;

const ActorImage = styled.img`

    width: 300px;
    height: 400px;
    border-radius: 10px;
    margin-bottom: 1rem;
`;

const ActorTopSection = styled.div`
    display: flex;
    flex-direction: row;
    
    @media (max-width: ${(props) => props.theme.screenSizes.tablet}) {
        flex-direction: column; // Change to row layout on tablet screens
        align-items: center;
    }
`;

const ActorInformation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: top;
    margin-left: 2rem;
`;

const ActorName = styled.h1`
    font-size: 2.2rem;
    margin: unset;
 
`;

const ActorBio = styled.p`
    font-size: 1.2rem;
`;

const KnownForSection = styled.div`
    display: flex;
    flex-direction: column;  
    margin: 3rem 2rem;
`;

const KnownForList = styled.div`

    gap: 20px;
    // margin-top: 1rem;
    display: flex;
    flex-direction: row;
    margin: 2rem 0;
    overflow: auto;
 
  
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

const KnownForItem = styled.li`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;


    .movie-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px; /* Adjust the maximum width as needed */
        font-size: 1rem;
        margin-top: 0.5rem;
`;

const KnownForMovieLink = styled(Link)`
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MoviePoster = styled.img`
    width: 150px;
    height: 225px;
    border-radius: 5px;
    margin-bottom: 0.5rem;
`;



const KnownForHeader = styled.h2`
    font-size: 1.5rem;
 
    margin:unset
`;

const ReadMoreButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
`;


function ActorDetailPage() {
    const { actorId } = useParams();
    const [actor, setActor] = useState(null);
    const [knownMovies, setKnownMovies] = useState([]);
    const [showAllMovies, setShowAllMovies] = useState(false);
    const [showFullBio, setShowFullBio] = useState(false);

    useEffect(() => {
        const fetchActorAndKnownMovies = async () => {
            try {
                const actorDetails = await fetchActorDetails(actorId);
                setActor(actorDetails);

                // Fetch the known movies using the actor's name
                const knownMoviesData = await fetchKnownMovies(actorDetails.name);
                setKnownMovies(knownMoviesData);
            } catch (error) {
                console.error('Error fetching actor details:', error.message);
            }
        };

        fetchActorAndKnownMovies();
    }, [actorId]);

    if (!actor) return <p>Loading...</p>;
    console.log(actor)
    return (
        <ActorPageWrapper>
            <ActorTopSection>
                <ActorImage src={actor.profilePath} alt={actor.name} />
                <ActorInformation>
                    <ActorName>{actor.name}</ActorName>
                    {actor.bio ? (
                        <ActorBio>
                            <h3>Biography</h3>
                            {showFullBio ? actor.bio : actor.bio.slice(0, 500)}
                            {actor.bio.length > 500 && (
                                <ReadMoreButton onClick={() => setShowFullBio(!showFullBio)}>
                                    {showFullBio ? 'Read Less' : '...Read More'}
                                </ReadMoreButton>
                            )}
                        </ActorBio>
                    ) : (
                        <p>No biography available.</p>
                    )}
                </ActorInformation>
            </ActorTopSection>

            {knownMovies.length > 0 &&
                <KnownForSection>

                    <KnownForHeader>Known For</KnownForHeader>


                    <KnownForList>
                        {showAllMovies
                            ? knownMovies.map((movie) => (
                                <KnownForItem key={movie.id}>
                                    <KnownForMovieLink to={`/movie/${movie.id}`}>
                                        <MoviePoster src={movie.posterPath} alt={movie.title} />
                                        <span className="movie-title">{movie.title}</span>
                                    </KnownForMovieLink>
                                </KnownForItem>
                            ))
                            : knownMovies.slice(0, 15).map((movie) => (
                                <KnownForItem key={movie.id}>
                                    <KnownForMovieLink to={`/movie/${movie.id}`}>
                                        <MoviePoster src={movie.posterPath} alt={movie.title} />
                                        <span className="movie-title">{movie.title}</span>
                                    </KnownForMovieLink>
                                </KnownForItem>
                            ))}
                    </KnownForList>

                </KnownForSection>
            }
        </ActorPageWrapper>
    );
}

export default ActorDetailPage;