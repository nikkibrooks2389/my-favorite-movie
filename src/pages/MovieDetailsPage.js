import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const MovieWrapper = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
`;

function MovieDetailPage() {
    const { id } = useParams();

    return (
        <MovieWrapper>
            <h1>Movie Details for ID: {id}</h1>
            {/* Display movie details and list of actors here */}
        </MovieWrapper>
    );
}

export default MovieDetailPage;