import React, { useState } from "react";
import styled from "styled-components";



function SearchBar(props) {
    return (
        <div>
            <input
                type="text"
                placeholder="Search for movies..."
                onChange={(e) => props.onSearchChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;