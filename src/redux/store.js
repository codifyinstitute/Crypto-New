import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../features/country/countrySlice'


export const store = configureStore({
  reducer: {
    country: countryReducer
  },
})

//steps:
// create store
// wrap app component under Provider
// create Slice
// register reducer in store