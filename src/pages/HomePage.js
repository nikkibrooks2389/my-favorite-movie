import React, { useState } from 'react';
import styled from "styled-components";
import SearchBar from '../components/common/SearchBar';

const HomeWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;


const HomePage = () => {
  return (
    <HomeWrapper>
      <h2>My Favorite Movies</h2>
      <SearchBar />
    </HomeWrapper>
  );
}

export default HomePage;