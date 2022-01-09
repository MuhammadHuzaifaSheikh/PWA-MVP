import { createSlice } from '@reduxjs/toolkit'

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    dd: '',
    mm: '',
    yyyy: '',
  },
  reducers: {
    setDate: (state, action) => {
      state.dd = action.payload;
    },
    setMonth: (state, action) => {
      state.mm = action.payload;
    },
    setYear: (state, action) => {
      state.yyyy = action.payload;
    }
  }
})



export const { setDate, setMonth, setYear } = dateSlice.actions;
export const selectDate = (state) => (state.date)

export default dateSlice.reducer;