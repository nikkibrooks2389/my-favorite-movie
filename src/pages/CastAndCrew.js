import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CrewCard from '../components/common/CrewCard';
import ActorCard from '../components/common/ActorCard';

const CastAndCrew = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const cast = location.state.cast;
    const crewMembers = location.state.crew;

    const CastAndCrewWrapper = styled.div`
        display: flex;
        flex-direction: row;
        // align-items: center;
    `;

    const CastWrapper = styled.div`
        display: flex;
        flex-direction: column;
        // align-items: center;
    `;

    const CrewWrapper = styled.div`
        display: flex;
        flex-direction: column;
        // align-items: center;


    `;
    return (
        <div>
            <h2>Full Cast and Crew</h2>
            <Link to={`/movie/${movieId}`}>Back to Movie Details</Link>
            <CastAndCrewWrapper>
                <CastWrapper>
                    <h3>Cast</h3>
                    {cast.map((castMember) => (
                        <ActorCard actor={castMember} />
                    ))}
                </CastWrapper>
                <CrewWrapper>
                    <h3>Crew</h3>

                    {crewMembers.map((crewMember) => (
                        <CrewCard crew={crewMember} />
                    ))}
                </CrewWrapper>

            </CastAndCrewWrapper>
        </div>
    );
};

export default CastAndCrew;