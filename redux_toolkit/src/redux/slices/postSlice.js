import { createSlice } from '@reduxjs/toolkit'
import { getPost } from '../../api/api';

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    isLoading: false,
    message: "",
    page: 1,
    limit: 30,
    hasMore: true
  },
  reducers: {
    info: (state) => {
      state.isLoading = true;
    },
    success: (state, action) => {
      state.isLoading = false
      state.data = [...state.data, ...action.payload]
      state.message = ""
    },
    failure: (state, action) => {
      state.isLoading = false
      state.message = action.payload
    },
    reset: (state) => {
      state.isLoading = false
      state.message = ""
      state.data = []
      state.page = 1
      state.hasMore = true
    },
    incrementPage: (state) => {
      state.page += 1
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload
    }
  }
})

export const fetchPosts = (limit, page) => async (dispatch) => {
  try {
    dispatch(postActions.info())
    const res = await getPost(limit, page)
    dispatch(postActions.success(res.data))

    if (res.data.length < limit) {
      dispatch(postActions.setHasMore(false))
    } else {
      dispatch(postActions.incrementPage())
    }

  } catch (error) {
    dispatch(postActions.failure(error.message))
  }
}

export default postSlice.reducer
export const postActions = postSlice.actions