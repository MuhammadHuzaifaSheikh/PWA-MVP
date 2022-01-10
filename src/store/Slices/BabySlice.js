import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    baby: {}
};

const babySlice = createSlice({
    name: 'baby',
    initialState,
    reducers: {
        setBaby: (state, action) => {
            state.baby = action.payload;
        }
    },
});

export const { setBaby } = babySlice.actions;

export default babySlice.reducer;