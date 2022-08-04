import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { IUser } from '../../interfaces';

interface initialStateType {
  user: IUser | null;
}

let user = null;

if (localStorage.getItem('userInfo')) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
  // @ts-ignore
  if (jwtDecode(userInfo.token).exp * 1000 < Date.now()) {
    user = null;
  } else {
    user = userInfo;
  }
}

const initialState: initialStateType = {
  user,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { logout, login } = userSlice.actions;

export const userReducer = userSlice.reducer;
