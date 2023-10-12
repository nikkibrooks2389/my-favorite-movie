// src/components/MovieCard.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardWrapper = styled.div`
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
const MovieCard = ({ movie }) => {

  const truncateTitle = (title, limit = 60) => {
    return title.length > limit ? title.substring(0, limit) + "..." : title;
  }



  return (
    <StyledLink to={`/movie/${movie.id}`}>
      <CardWrapper>
        <MoviePoster src={movie.posterPath} alt={movie.title} />
        <ReleaseDate>{movie.releaseDate}</ReleaseDate>
        <MovieTitle>{truncateTitle(movie.title)}</MovieTitle>

      </CardWrapper>
    </StyledLink>
  );
}

export default MovieCard;