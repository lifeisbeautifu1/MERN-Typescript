import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../interfaces';

interface initialStateType {
  posts: IPost[];
  selectedPost: IPost | null;
}

const initialState: initialStateType = {
  posts: [],
  selectedPost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    initPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    updatePost: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post;
      });
    },
    setSelectedPost: (state, action: PayloadAction<IPost>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { initPosts, addPost, deletePost, updatePost, setSelectedPost } =
  postsSlice.actions;

export const postsReducer = postsSlice.reducer;
