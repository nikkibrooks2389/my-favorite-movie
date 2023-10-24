// src/components/MovieCard.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { addToWatchlist, removeFromWatchlist, selectIsInWatchlist } from '../../redux/slices/watchListSlice';
import { fetchMovieDetails } from '../../services/movieApi';

const CardWrapper = styled.div`
  position: relative;
  border: 1px solid #ccc;
  width: 300px;
  height: ${({ customStyle }) => !customStyle?.height && '525px'};
  overflow: hidden;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    max-width: 250px; 
    height: 500px;  
  }
`;

const ReleaseDate = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin: 5px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none; 
  color: inherit;
  display: block; 
  height: 100%;
 
`;

const MoviePoster = styled.img`
  width: 100%;
  max-width: 300px;
 height: ${({ customStyle }) => customStyle?.height || '400px'};
  @media (max-width: 768px) {
    max-width: 250px;  // Adjust to your preferred width
  }
`;

const MovieTitle = styled.h3`

  max-width: 300px; // Limiting the width to ensure overflow occurs.
  padding: px 5px;  // Give some padding to the sides.
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
  transition: background-color 0.3s ease-in-out;
  background-color: ${(props) => props.theme.colors.secondary};

  &:hover {
    background-color: ${(props) => props.theme.colors.secondaryLight};
  }
`;

const MovieCard = ({ movie, customStyle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const isInWatchlist = useSelector((state) => selectIsInWatchlist(state, movie.id));
  const dispatch = useDispatch();


  const truncateTitle = (title, limit = 60) => {
    return title.length > limit ? title.substring(0, limit) + "..." : title;
  }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleWatchlist = async () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ id: movie.id }));
      setIsMenuOpen(false);
    } else {
      // Fetch the movie data and add it to the watchlist
      try {
        const details = await fetchMovieDetails(movie.id);
        dispatch(addToWatchlist(details));
        setIsMenuOpen(false);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    }
  };
  return (
    <CardWrapper customStyle={customStyle} >
      <StyledLink to={`/movie/${movie.id}`}>
        <MoviePoster customStyle={customStyle} src={movie.posterPath} alt={movie.title} />
        {
          <ReleaseDate>{movie.releaseDate}</ReleaseDate>
        }
        <MovieTitle>{truncateTitle(movie.title)}</MovieTitle>
      </StyledLink>

      <ActionButton onClick={toggleMenu}>

        <MoreVertIcon style={{ transform: 'rotate(90deg)' }} />

      </ActionButton>

      <ActionMenu isOpen={isMenuOpen}>
        {isInWatchlist ? (
          <ActionMenuItem onClick={handleToggleWatchlist}>
            Remove from Watchlist
          </ActionMenuItem>
        ) : (
          <ActionMenuItem onClick={handleToggleWatchlist}>
            Add to Watchlist
          </ActionMenuItem>
        )}
      </ActionMenu>


    </CardWrapper>
  );
}

export default MovieCard;