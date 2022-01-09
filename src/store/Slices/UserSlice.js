import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        emailAddress: '',
        username: '',
        userId: '',
        pregnancy_dueDate: '',
        user_todos: [],
        fullName: '',
        pregnancy_babyName: '',
        pregnancy_babyGender: ''
    },
    reducers: {
        setUserName: (state, action) => {
            state.username = action.payload;
        },
        setEmailAddress: (state, action) => {
            state.emailAddress = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setFullName: (state, action) => {
            state.fullName = action.payload;
        },
        setPregnancyDueDate: (state, action) => {
            state.pregnancy_dueDate = action.payload
        },
        setUserTodoss: (state, action) => {
            state.user_todos = action.payload
        },
        setBabyName: (state, action) => {
            state.pregnancy_babyName = action.payload
        },
        setBabyGender: (state, action) => {
            state.pregnancy_babyGender = action.payload
        },
        setAddToMyTask: (state, action) => {
            state.addToMyTasks = action.payload;
        }
    }
})



export const { setUserId, setUserName, setEmailAddress, setAddToMyTask, setPregnancyDueDate, setFullName, setUserTodoss, setBabyName, setBabyGender } = userSlice.actions;
export const selectUser = (state) => (state.user)

export default userSlice.reducer;