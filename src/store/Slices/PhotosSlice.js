import { createSlice } from '@reduxjs/toolkit'

export const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        photos: []
    },
    reducers: {
        setPhotos: (state, action) => {
            state.photos = action.payload;
        },
        setLikes: (state, action) => {
            let photos = []
            for (let i = 0; i < action.payload.photos.length; i++) {
                if (i === action.payload.index) {
                    photos.push(action.payload.newContent)
                } else {
                    photos.push(action.payload.photos[i])
                }
            }
            state.photos = photos
        },
        setComments: (state, action) => {
            let photos = []
            for (let i = 0; i < action.payload.photos; i++) {
                if (action.payload.index === i) {
                    photos.push(action.payload.newContent)
                } else {
                    photos.push(action.payload.photos[i])
                }
            }
            state.photos = photos
        }
    }
})



export const { setPhotos, setLikes, setComments } = photosSlice.actions;

export default photosSlice.reducer;