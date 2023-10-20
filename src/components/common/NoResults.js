import React from 'react';
import styled from 'styled-components';
import NoResultsIcon from '@mui/icons-material/SentimentDissatisfied'; // Import the Material-UI icon


const NoResultsWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  padding: 20px;
  text-align: center;
`;

const StyledSearchIcon = styled(NoResultsIcon)`
height:4rem;
width:4rem;
  color:${(props) => props.theme.colors.secondaryText};
  
`;

const NoResultsMessage = styled.p`
  font-size: 2rem;
  color:${(props) => props.theme.colors.secondaryText};
`;

const NoResultsComponent = () => {
    return (
        <NoResultsWrapper>
            <StyledSearchIcon fontSize="large" /> {/* Use the Material-UI icon */}
            <NoResultsMessage>No Results Found</NoResultsMessage>
        </NoResultsWrapper>
    );
};

export default NoResultsComponent;