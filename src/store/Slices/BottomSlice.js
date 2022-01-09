import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isHomeActive: true,
    isTodoActive: false,
    isInstaActive: false
};

const bottomSlice = createSlice({
    name: 'bottom',
    initialState,
    reducers: {
        setIsHomeActive: (state, action) => {
            state.isHomeActive = action.payload;
        },
        setIsTodoActive: (state, action) => {
            state.isTodoActive = action.payload
        },
        setIsInstaActive: (state, action) => {
            state.isInstaActive = action.payload
        }
    },
});

export const { setIsHomeActive, setIsTodoActive, setIsInstaActive } = bottomSlice.actions;

export default bottomSlice.reducer;