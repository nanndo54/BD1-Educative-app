import { configureStore } from '@reduxjs/toolkit'

import appReducer from './slices/appSlice'

const combineReducers = {
  reducer: {
    app: appReducer
  }
}

export const store = configureStore(combineReducers)
