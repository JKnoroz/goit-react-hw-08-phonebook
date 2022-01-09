import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    clearCredentials: state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
  },
});

export const { setCredentials, setUser, clearCredentials } = slice.actions;

export default slice.reducer;
