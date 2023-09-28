import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// Components
import { MovieList, MovieDetails } from './components/Movie';
import { FavoritesList } from './components/Favorites';
import RandomMovieSelector from './components/RandomMovieSelector';

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
      <AppContainer>
        <AppHeader>
          <h1>My Favorite Movie</h1>
        </AppHeader>

        <main>
          <Switch>
            <Route exact path="/">
              <MovieList />
            </Route>

            <Route path="/movie/:movieId">
              <MovieDetails />
            </Route>

            <Route path="/favorites">
              <FavoritesList movies={favorites} />
            </Route>

            <Route path="/random">
              <RandomMovieSelector />
            </Route>

            <Route>
              <div>404: Page Not Found</div>
            </Route>
          </Switch>
        </main>
      </AppContainer>
    </Router>
  );
}

export default App;