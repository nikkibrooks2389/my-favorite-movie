import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './components/Layout';
// Components
import MovieSearch from './components/Movie/MovieSearch';
import MovieDetails from './components/Movie/MovieDetails';
// import  FavoritesList } from './components/Favorites';
// import RandomMovieSelector from './components/RandomMovieSelector';

// Styled Components
const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 20px;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  padding: 20px 0;
  text-align: center;
  color: white;
`;

function App() {
  const favorites = useSelector(state => state.favorites);

  return (


    <Router>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="/" element={<MovieSearch />} />
          <Route path="movieDetails" element={<MovieDetails />} />

          {/* <Route path="Favorites" element={<Projects />} /> */}

        </Route>
      </Routes>
    </Router>

  );
}

export default App;