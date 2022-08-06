import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import postsReducer from './slices/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxThunk)
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default store;
