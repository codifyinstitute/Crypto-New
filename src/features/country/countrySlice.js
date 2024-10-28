import { createSlice } from '@reduxjs/toolkit'

export const countrySlice = createSlice({
    name: 'country',
    initialState: {
        value: "India"
    },
    reducers: {
        changeCountry: (state, action) => {
            state.value = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { changeCountry } = countrySlice.actions

export default countrySlice.reducer