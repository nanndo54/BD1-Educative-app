import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: '',
  entity: '',
  headers: [],
  data: [],
  selectedIndex: -1
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload
    },
    setEntity: (state, action) => {
      state.entity = action.payload
    },
    setHeaders: (state, action) => {
      state.headers = action.payload
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    selectIndex: (state, action) => {
      state.selectedIndex = action.payload
    },
    appendData: (state, action) => {
      state.data.push(action.payload)
    },
    updateData: (state, action) => {
      state.data[state.selectedIndex] = action.payload
    },
    deleteData: (state, action) => {
      state.data.splice(state.selectedIndex, 1)
    }
  }
})

export const {
  setMode,
  setEntity,
  setHeaders,
  setData,
  selectIndex,
  appendData,
  updateData,
  deleteData
} = appSlice.actions

export default appSlice.reducer
