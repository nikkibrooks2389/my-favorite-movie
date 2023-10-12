// src/pages/ActorDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchActorDetails } from "../services/movieApi";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { setBreadcrumbs } from '../redux/slices/breadcrumbsSlice';
const ActorWrapper = styled.div`
    margin-top: 20px;
    display: flex;
`;

const ActorImage = styled.img`
    width: 100px;
    height: 150px;
    margin-right: 20px;
`;

function ActorDetailPage() {
    const { actorId } = useParams();
    const [actor, setActor] = useState(null);


    const dispatch = useDispatch();
    const currentBreadcrumbs = useSelector(state => state.breadcrumbs);
    useEffect(() => {
        const fetchActor = async () => {
            try {
                const actorDetails = await fetchActorDetails(actorId);
                setActor(actorDetails);
                dispatch(setBreadcrumbs([
                    ...currentBreadcrumbs,
                    { label: actorDetails.name, path: `actor/${actorDetails.id}` }
                ]));
            } catch (error) {
                console.error("Error fetching actor details:", error.message);
            }
        };

        fetchActor();
    }, [actorId]);

    if (!actor) return <p>Loading...</p>;

    return (
        <ActorWrapper>
            <ActorImage src={actor.profilePath} alt={actor.name} />
            <div>
                <h3>{actor.name}</h3>
                <p>{actor.bio}</p>
            </div>
        </ActorWrapper>
    );
}

export default ActorDetailPage;