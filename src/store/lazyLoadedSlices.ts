import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from '../app/pages/auth/user/userSlice';

export const rootReducer = combineSlices(userSlice);
