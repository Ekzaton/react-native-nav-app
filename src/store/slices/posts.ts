import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../../types/common';

const initialState = {
  postsAll: [] as Post[],
  postsBooked: [] as Post[],
};

export const todo = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadPosts: (state: PostsState, action: PayloadAction<Post[]>) => {
      state.postsAll = action.payload;
      state.postsBooked =  action.payload.filter((post) => post.booked);
    },
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
  }
});

type PostsState = typeof initialState;

export const { loadPosts, toggleBooked, addPost, removePost } = todo.actions;
export default todo.reducer;
