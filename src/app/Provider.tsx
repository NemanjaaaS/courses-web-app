import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../lib/Material/theme';
import { Provider } from 'react-redux';
import { store } from './api/store';

type AppProviderProps = {
  readonly children?: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
