import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../lib/Material/theme';

type AppProviderProps = {
  readonly children?: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
