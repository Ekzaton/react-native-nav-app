import { documentDirectory, moveAsync } from 'expo-file-system';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import API from '../../helpers/API';
import { NewPost, Post } from '../../types/common';

export const loadPosts = createAsyncThunk(
    'posts/loadPosts',
    async () => await API.getPosts()
)

export const addPost = createAsyncThunk(
    'posts/addPost',
    async (post: NewPost) => {
      const fileName = post.img.split('/').pop();
      const newPath = documentDirectory && fileName ? documentDirectory + fileName : '';

      try {
        await moveAsync({
          from: post.img,
          to: newPath
        });
      } catch (e) {
       console.log(e);
      }

      const newPost = { ...post, img: newPath }
      const id = await API.createPost(newPost);

      return { ...newPost, id } as Post;
    }
)

const initialState = {
  postsAll: [] as Post[],
  postsBooked: [] as Post[],
};

export const todo = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleBooked: (state: PostsState, action: PayloadAction<number>) => {
      state.postsAll = state.postsAll.map((post) => {
        if (post.id === action.payload) post.booked = !post.booked;
        return post;
      });
      state.postsBooked =  state.postsAll.filter((post) => post.booked);
    },
    removePost: (state: PostsState, action: PayloadAction<number>) => {
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
        }
    )
    builder.addCase(
        addPost.fulfilled,
        (state: PostsState, action: PayloadAction<Post>) => {
          state.postsAll = [action.payload, ...state.postsAll];
        }
    )
  }
});

type PostsState = typeof initialState;

export const { toggleBooked, removePost } = todo.actions;
export default todo.reducer;
