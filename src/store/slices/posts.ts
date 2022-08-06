import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import API from '../../helpers/API';
import { Post } from '../../types/common';

export const loadPosts = createAsyncThunk(
    'posts/loadPosts',
    async () => await API.getPosts()
)

const initialState = {
  postsAll: [] as Post[],
  postsBooked: [] as Post[],
};

export const todo = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleBooked: (state: PostsState, action: PayloadAction<string>) => {
      state.postsAll = state.postsAll.map((post) => {
        if (post.id === action.payload) post.booked = !post.booked;
        return post;
      });
      state.postsBooked =  state.postsAll.filter((post) => post.booked);
    },
    addPost: (state: PostsState, action: PayloadAction<Post>) => {
      state.postsAll = [{...action.payload}, ...state.postsAll];
    },
    removePost: (state: PostsState, action: PayloadAction<string>) => {
      state.postsAll = state.postsAll.filter((post) => post.id !== action.payload);
      state.postsBooked = state.postsBooked.filter((post) => post.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
        loadPosts.fulfilled,
        (state: PostsState, action: PayloadAction<Post[]>) => {
          state.postsAll = action.payload;
          state.postsBooked = action.payload.filter((post) => post.booked);
        })
  }
});

type PostsState = typeof initialState;

export const { toggleBooked, addPost, removePost } = todo.actions;
export default todo.reducer;
