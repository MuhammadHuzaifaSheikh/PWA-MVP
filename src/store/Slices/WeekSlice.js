import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    week: 1,
    day: 1,
    suggestedTodoWeek: null,
    myTodoWeek: null,

};

const weekSlice = createSlice({
    name: 'week',
    initialState,
    reducers: {
        setWeek: (state, action) => {
            console.log(action.payload)
            state.week = action.payload;
            state.suggestedTodoWeek = action.payload;
            state.myTodoWeek = action.payload;
        },
        setDay: (state, action) => {
            state.day = action.payload
            state.week = Math.ceil(action.payload / 7)
            state.suggestedTodoWeek = Math.ceil(action.payload / 7);
            state.myTodoWeek = Math.ceil(action.payload / 7);
        },
        setSuggestedWeek: (state, action) => {
            console.log(action.payload)
            state.suggestedTodoWeek = action.payload;
        },
        setMyTodoWeek: (state, action) => {
            console.log(action.payload)
            state.myTodoWeek = action.payload;
        },

    },
});

export const { setWeek, setDay, setSuggestedWeek, setMyTodoWeek } = weekSlice.actions;

export default weekSlice.reducer;