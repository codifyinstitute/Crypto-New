import { createSlice } from '@reduxjs/toolkit'
var country = localStorage.getItem("Country");

export const countrySlice = createSlice({
    name: 'country',
    initialState: {
        value: country
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