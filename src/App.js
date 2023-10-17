import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import { darkTheme } from './styles/theme';
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailsPage";
import ActorDetailPage from "./pages/ActorDetailsPage";
import WatchListPage from "./pages/WatchListPage";
import Layout from "./components/Layout";

import Breadcrumbs from "./components/common/Breadcrumbs";


const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="movie/:id" element={<MovieDetailPage />} />
            <Route path="actor/:actorId" element={<ActorDetailPage />} />
            <Route path="watchlist" element={<WatchListPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;