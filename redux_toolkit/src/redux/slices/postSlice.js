import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    page: 1,
    limit: 30,
    hasMore: true
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    appendData: (state, action) => {
      state.data = [...state.data, ...action.payload]
    },
    incrementPage: (state) => {
      state.page += 1
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload
    },
    setError: (state, action) => {
      state.isError = action.payload
    }
  }
})

export const { setLoading, setError, appendData, incrementPage, setHasMore } = postSlice.actions

export default postSlice.reducer