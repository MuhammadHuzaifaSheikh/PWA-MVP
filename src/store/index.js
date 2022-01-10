import { configureStore } from '@reduxjs/toolkit'

import dateReducer from './Slices/DateSlice'
import userReducer from './Slices/UserSlice'
import blogReducer from './Slices/BlogSlice'
import suggestedReducer from './Slices/SuggestedSlice'
import photosReducer from './Slices/PhotosSlice'
import BottomSlice from './Slices/BottomSlice'
import WeekReducer from './Slices/WeekSlice'
import BabyReducer from './Slices/BabySlice'


const store = configureStore({
    reducer: {
        date: dateReducer,
        user: userReducer,
        blog: blogReducer,
        suggestedTodos: suggestedReducer,
        photos: photosReducer,
        bottom: BottomSlice,
        week: WeekReducer,
        baby: BabyReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;