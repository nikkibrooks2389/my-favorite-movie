// src/components/MovieCard.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const CardWrapper = styled.div`
position: relative;
  border: 1px solid #ccc;
  width: 300px;
  height: 575px;  // Set a fixed height for the card.
  overflow: hidden;  // Ensure content doesn't overflow the card.
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    max-width: 250px;  // Adjust to your preferred width
    height: 500px;  // Set a fixed height for the card.
  }
`;

const ReleaseDate = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin: 5px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;  // Remove the underline from the link
  color: inherit;  // Inherit the text color
  display: block;  // Make the link block-level
height: 100%;
  &:hover {
    // Add any hover effects if needed
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  max-width: 300px;
  // margin-bottom: 20px;
  @media (max-width: 768px) {
    max-width: 250px;  // Adjust to your preferred width
  }
`;

const MovieTitle = styled.h3`

  max-width: 300px; // Limiting the width to ensure overflow occurs.
  padding: 0 5px;  // Give some padding to the sides.
  text-decoration: none;
  @media (max-width: 768px) {
    max-width: 250px;  // Adjust to your preferred width
  }
  

`;



const ActionButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.5); /* Transparent white */
  border: none;
  cursor: pointer;
  border-radius: 50%; /* Make it a circle */
  padding: 10px; /* Adjust padding as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8); /* Lighter white on hover */
  }
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const ActionMenuItem = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MovieCard = ({ movie }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const truncateTitle = (title, limit = 60) => {
    return title.length > limit ? title.substring(0, limit) + "..." : title;
  }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <CardWrapper>
      <StyledLink to={`/movie/${movie.id}`}>
        <MoviePoster src={movie.posterPath} alt={movie.title} />
        <ReleaseDate>{movie.releaseDate}</ReleaseDate>
        <MovieTitle>{truncateTitle(movie.title)}</MovieTitle>
      </StyledLink>

      <ActionButton onClick={toggleMenu}>

        <MoreVertIcon style={{ transform: 'rotate(90deg)' }} />

      </ActionButton>
      <ActionMenu isOpen={isMenuOpen}>
        <ActionMenuItem>Add to Watchlist</ActionMenuItem>
        <ActionMenuItem>Remove from Watchlist</ActionMenuItem>
      </ActionMenu>

    </CardWrapper>
  );
}

export default MovieCard;