import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    suggestedTodos: [],
};

const SuggestedSlice = createSlice({
    name: "SuggestedSlice",
    initialState,
    reducers: {
        setSuggestedTodos: (state, action) => {
            state.suggestedTodos = action.payload;
        }
    },
});

export const { setSuggestedTodos } = SuggestedSlice.actions;
export default SuggestedSlice.reducer;