import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DATA } from '../../data';
import { Post } from '../../types/common';

const postsAll = DATA;
const postsBooked = DATA.filter((post) => post.booked);

const initialState = {
  postsAll: postsAll as Post[],
  postsBooked: postsBooked as Post[],
};

export const todo = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadPosts: (state: PostState, action: PayloadAction<Post[]>) => {
      state.postsAll = action.payload;
      state.postsBooked =  action.payload.filter((post) => post.booked);
    },
    toggleBooked: (state: PostState, action: PayloadAction<string>) => {
      state.postsAll = state.postsAll.map((post) => {
        if (post.id === action.payload) post.booked = !post.booked;
        return post;
      });
      state.postsBooked =  state.postsAll.filter((post) => post.booked);
    },
    addPost: (state: PostState, action: PayloadAction<Post>) => {
      state.postsAll = [{...action.payload}, ...state.postsAll];
    },
    removePost: (state: PostState, action: PayloadAction<string>) => {
      state.postsAll = state.postsAll.filter((post) => post.id !== action.payload);
      state.postsBooked = state.postsBooked.filter((post) => post.id !== action.payload);
    }
  }
});

type PostState = typeof initialState;

export const { loadPosts, toggleBooked, addPost, removePost } = todo.actions;
export default todo.reducer;
