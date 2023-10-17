import React from 'react';
import styled from 'styled-components';
const Card = styled.div`
  width: 200px;
  height: 300px; /* Set a fixed height for the card */
//   padding: 10px;
  margin: 10px;
  background-color: #333;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  overflow: hidden; /* Hide overflow content */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActorImage = styled.img`
  width: 100%;
  height: 70%; /* Adjust the height of the image within the card */
  object-fit: cover;
  border-radius: 5px 5px 0 0; /* Rounded corners only at the top */
`;

const ActorInfo = styled.div`
  flex-grow: 1; /* Allow the info section to grow within the fixed height */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ActorName = styled.h3`
  font-size: 16px;
  margin: 5px 0;
  color: #fff;
`;

const CharacterName = styled.p`
  font-size: 14px;
  color: #bbb;
  margin: 5px 0;
`;

function ActorCard({ actor }) {
    return (
        <Card>
            <ActorImage src={actor.profilePath} alt={actor.name} />
            <ActorInfo>
                <ActorName>{actor.name}</ActorName>
                <CharacterName>as {actor.character}</CharacterName>
            </ActorInfo>
        </Card>
    );
}

export default ActorCard;