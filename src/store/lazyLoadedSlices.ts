import { combineReducers } from '@reduxjs/toolkit';
import { api } from '../app/api/api';
import { userSlice } from '../app/pages/auth/user/userSlice';

export const rootReducer = combineReducers({
  auth: userSlice.reducer,
  [api.reducerPath]: api.reducer,
});
