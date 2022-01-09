import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = [...action.payload];
        }
    },
});

export const { setBlogs } = blogSlice.actions;
export const selectBlogs = (state) => (state.blogs)

export default blogSlice.reducer;