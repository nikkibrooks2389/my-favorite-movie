// src/components/MovieCard.js
import styled from 'styled-components';

const CardWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MoviePoster = styled.img`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
`;
const MovieCard = ({ movie }) => {
    return (
        <CardWrapper>
            <MoviePoster src={movie.posterPath} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
        </CardWrapper>
    );
}

export default MovieCard;