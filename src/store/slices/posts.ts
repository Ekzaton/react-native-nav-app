import { documentDirectory, moveAsync } from 'expo-file-system';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import API from '../../helpers/API';
import { PostData, Post } from '../../types/common';

export const loadPosts = createAsyncThunk(
    'posts/loadPosts',
    async () => await API.getPosts()
);

export const addPost = createAsyncThunk(
    'posts/addPost',
    async (postData: PostData) => {
      const fileName = postData.img.split('/').pop();
      const newPath = documentDirectory && fileName ? documentDirectory + fileName : '';

      try {
        await moveAsync({
          from: postData.img,
          to: newPath
        });
      } catch (e) {
       console.log(e);
      }

      postData = { ...postData, img: newPath }
      const id = await API.createPost(postData);

      return { ...postData, id } as Post;
    }
);

export const toggleBooked = createAsyncThunk(
    'posts/toggleBooked',
    async (post: Post) => {
      await API.updatePost(post);

      return post.id;
    }
);

export const removePost = createAsyncThunk(
    'posts/removePost',
    async (id: number) => {
      await API.deletePost(id);

      return id;
    }
);

const initialState = {
  postsAll: [] as Post[],
  postsBooked: [] as Post[],
  loading: false
};

export const todo = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
        loadPosts.pending,
        (state: PostsState) => {
          state.loading = true;
        }
    )
    builder.addCase(
        loadPosts.fulfilled,
        (state: PostsState, action: PayloadAction<Post[]>) => {
          state.loading = false;
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
    builder.addCase(
        toggleBooked.fulfilled,
        (state: PostsState, action: PayloadAction<number>) => {
          state.postsAll = state.postsAll.map((post) => {
            if (post.id === action.payload) post.booked = !post.booked;

            return post;
          });
          state.postsBooked =  state.postsAll.filter((post) => post.booked);
        }
    )
    builder.addCase(
        removePost.fulfilled,
        (state: PostsState, action: PayloadAction<number>) => {
          state.postsAll = state.postsAll.filter((post) => post.id !== action.payload);
          state.postsBooked = state.postsBooked.filter((post) => post.id !== action.payload);
        }
    )
  }
});

type PostsState = typeof initialState;

export default todo.reducer;
