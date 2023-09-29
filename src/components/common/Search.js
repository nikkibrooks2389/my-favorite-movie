import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
// import GenreFilter from "./GenreFilter";
// import SortBy from "./SortBy";

const SearchWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Search({ onSearch, onGenreChange, onSortChange }) {
  return (
    <SearchWrapper>
      <SearchBar onSearchChange={onSearch} />
      {/* <GenreFilter onGenreChange={onGenreChange} />
      <SortBy onSortChange={onSortChange} /> */}
    </SearchWrapper>
  );
}

export default Search;