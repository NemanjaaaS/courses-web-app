import { createTheme } from '@mui/material/styles';

import typography from './typography';
import { darkPalette, lightPalette } from './palette';

import { SelectField } from './SelectField';
import TextField from './textField';
import Button from './Button';
const components = { MuiTextField: TextField, MuiSelect: SelectField, MuiButton: Button };

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
