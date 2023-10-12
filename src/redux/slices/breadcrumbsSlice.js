// slices/breadcrumbsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const breadcrumbsSlice = createSlice({
    name: 'breadcrumbs',
    initialState: [],
    reducers: {
        setBreadcrumbs: (state, action) => {
            console.log(action.payload)
            return action.payload;
        },
        removeBreadcrumbsAfter: (state, action) => {
            const index = action.payload;
            return state.slice(0, index + 1);
        },
        resetBreadcrumbs: () => []
    }
});

export const { setBreadcrumbs, removeBreadcrumbsAfter, resetBreadcrumbs } = breadcrumbsSlice.actions;
export default breadcrumbsSlice.reducer;