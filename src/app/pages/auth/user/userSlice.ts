import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setBearerToken, unsetBearerToken } from '../../../api/axiosInstance';
import { api } from '../../../api/api';
import { InitialUserModel } from './UserModal';
import type { RootState } from '../../../api/store';
import type { UserData } from '../types/User';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from 'jwt-decode';

export const TOKEN_STORAGE_KEY = 'jwt_access_token';

// Check if the access token is valid
const isTokenValid = (accessToken: string) => {
  if (!accessToken) return false;
  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);
    const expirationTime = decoded?.exp ?? 0;
    const currentTime = Date.now() / 1000;
    return expirationTime > currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

// ================= THUNKS =================

export const loginThunk = createAsyncThunk<
  { user: UserData; token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const result = await dispatch(api.endpoints.login.initiate(credentials)).unwrap();

    // set token to axios interceptor + localStorage
    await setBearerToken(result.authenticationToken);
    localStorage.setItem(TOKEN_STORAGE_KEY, result.authenticationToken);

    // Fetch user details after setting token
    const userDetails = await dispatch(api.endpoints.getUserInfo.initiate()).unwrap();

    dispatch(
      login({
        user: userDetails,
        token: result.authenticationToken,
      })
    );

    return {
      user: userDetails,
      token: result.authenticationToken,
    };
  } catch {
    return rejectWithValue('Login failed');
  }
});

export const initializeAuth = createAsyncThunk<{ user: UserData; token: string } | null, void, { rejectValue: string }>(
  'auth/initializeAuth',
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token || !isTokenValid(token)) {
      await unsetBearerToken();
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }

    await setBearerToken(token);

    try {
      // Validate token by fetching user info
      const userDetails = await dispatch(api.endpoints.getUserInfo.initiate()).unwrap(); // Assuming getUserInfo endpoint

      dispatch(
        login({
          user: userDetails,
          token,
        })
      );

      return {
        user: userDetails,
        token,
      };
    } catch {
      await unsetBearerToken();
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return rejectWithValue('Invalid token');
    }
  }
);

// ================= STATE =================

type State = {
  user: UserData;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  user: InitialUserModel(),
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
      state.user = InitialUserModel();
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
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login error';
      })
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Initialization error';
      });
  },
});

export const { login, logout } = userSlice.actions;

// ================= SELECTORS =================

export const selectAuthState = (state: RootState) => state.reducer.auth;
export const selectUser = (state: RootState) => state.reducer.auth.user;
export const selectToken = (state: RootState) => state.reducer.auth.token;

// export default userSlice.reducer;
// function InitialUserModel(): User {
//   throw new Error('Function not implemented.');
// }
