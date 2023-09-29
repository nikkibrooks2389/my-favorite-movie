import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ActorWrapper = styled.div`
  padding: 20px;
  background-color: #eaeaea;
`;

function ActorDetailPage() {
    const { movieId, actorId } = useParams();

    return (
        <ActorWrapper>
            <h1>Actor Details for ID: {actorId}</h1>
            {/* Display actor details */}
        </ActorWrapper>
    );
}

export default ActorDetailPage;