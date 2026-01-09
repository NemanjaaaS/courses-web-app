import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../lib/Material/theme';
import { Provider } from 'react-redux';
import { store } from './api/store';
import { ToastContainer } from 'react-toastify';

type AppProviderProps = {
  readonly children?: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <ToastContainer />
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
