import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setBearerToken, unsetBearerToken } from './axiosInstance';
import type { User } from '../../lib/mockData';
import { api } from './api';
import type { RootState } from './store';

export const TOKEN_STORAGE_KEY = 'jwt_access_token';

// ================= THUNKS =================

export const loginThunk = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const result = await dispatch(api.endpoints.login.initiate(credentials)).unwrap();

    // set token to axios interceptor + localStorage
    await setBearerToken(result.token);

    dispatch(
      login({
        user: result.user,
        token: result.token,
        isAuthenticated: true,
      })
    );

    return result;
  } catch {
    return rejectWithValue('Login failed');
  }
});

export const initializeAuth = createAsyncThunk<{ user: User; token: string } | null>('auth/initializeAuth', async () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!token) {
    await unsetBearerToken();
    return null;
  }

  await setBearerToken(token);

  // ako želiš kasnije → fetch profile
  return {
    // user: InitialUserModel(),
    token,
  };
});

// ================= STATE =================

type State = {
  user: User;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  //   user: InitialUserModel(),
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ================= SLICE =================

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      //   state.user = InitialUserModel();
      state.token = null;
      state.isAuthenticated = false;
      unsetBearerToken();
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login error';
      });
  },
});

export const { login, logout } = userSlice.actions;

// ================= SELECTORS =================

export const selectAuthState = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

// export default userSlice.reducer;
// function InitialUserModel(): User {
//   throw new Error('Function not implemented.');
// }
