import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CrewCard from '../components/common/CrewCard';
import ActorCard from '../components/common/ActorCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const CastAndCrew = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const cast = location.state.cast;
    const crewMembers = location.state.crew;

    const CastAndCrewWrapper = styled.div`
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr; 
        gap: 4rem; 
        padding:2rem
    `;

    const CastWrapper = styled.div`
        display: flex;
        flex-direction: column;
    `;

    const CrewWrapper = styled.div`
        display: flex;
        flex-direction: column;
    `;

    const ActorList = styled.div`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 10px;
    `;

    const CrewList = styled.div`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 10px;
    `;

    const StyledLink = styled(Link)`
    text-decoration: none; 
    color:${(props) => props.theme.colors.text};
    font-weight: bold; 
    font-size: 1.2rem;
    margin-top: 2rem; 
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Add custom margin to the right of the icon for spacing */
    .MuiSvgIcon-root {
        margin-left: 5px; /* Adjust this value as needed */
        vertical-align: middle;
        font-size: 1rem;
        padding-bottom: 2px;
    }
    `;
    const Heading = styled.h2`
        text-align: center;
        margin-bottom: 2rem;
`;

    const MainHeading = styled.h1`  
        text-align: center;
        font-size: 2rem;
        margin-bottom: 1rem;
`;
    return (
        <div>
            <MainHeading>Full Cast and Crew</MainHeading>
            <StyledLink to={`/movie/${movieId}`}>   <ArrowBackIosIcon /> Back to Movie Details  </StyledLink>
            <CastAndCrewWrapper>
                <CastWrapper>
                    <Heading>Cast</Heading>
                    <ActorList>
                        {cast.map((castMember) => (
                            <ActorCard key={castMember.id} actor={castMember} />
                        ))}
                    </ActorList>
                </CastWrapper>
                <CrewWrapper>
                    <Heading>Crew</Heading>
                    <CrewList>
                        {crewMembers.map((crewMember) => (
                            <CrewCard key={crewMember.id} crew={crewMember} />
                        ))}
                    </CrewList>
                </CrewWrapper>
            </CastAndCrewWrapper>
        </div>
    );
};

export default CastAndCrew;