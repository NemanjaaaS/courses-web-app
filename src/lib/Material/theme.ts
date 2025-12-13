import { createTheme } from '@mui/material/styles';

import typography from './typography';
import { darkPalette, lightPalette } from './palette';

const components = {};

const options = {
  spacing: 8,
  typography,
  components,
};
export const lightTheme = createTheme({
  palette: lightPalette,
  ...options,
});

export const darkTheme = createTheme({
  palette: darkPalette,
  ...options,
});
