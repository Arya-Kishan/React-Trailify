import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState : {
        url : {},
        genres : {},
        category : {},
        popular: {}
    },
    reducers: {
        getImagesUrl : (state,action) =>{
            state.url = action.payload;
        },
        getCategory : (state,action) =>{
            state.category = action.payload;
        },
        getPopular : (state,action) =>{
            state.popular = action.payload;
        }
    },
});

export const { getImagesUrl, getCategory, getPopular } = homeSlice.actions;

export default homeSlice.reducer;