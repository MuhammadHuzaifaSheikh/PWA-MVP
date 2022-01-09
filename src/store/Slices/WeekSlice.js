import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    week: 1
};

const weekSlice = createSlice({
    name: 'week',
    initialState,
    reducers: {
        setWeek: (state, action) => {
            state.week = action.payload;
        }
    },
});

export const { setWeek } = weekSlice.actions;

export default weekSlice.reducer;