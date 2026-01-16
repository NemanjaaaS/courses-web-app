import type { Components, Theme } from '@mui/material';

const TextField: Components<Omit<Theme, 'components'>>['MuiTextField'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '& .MuiOutlinedInput-root': {
        border: `${theme.palette.border.default}`,
        borderRadius: '8px !important',
        color: theme.palette.blackText.light,

        '&.Mui-disabled': {
          backgroundColor: theme.palette.grey[200], // Gray background for disabled input
          color: theme.palette.blackText.default, // Gray text for disabled input
        },
        '&.Mui-focused .MuiOutlinedInput-input': {
          color: theme.palette.blackText.dark, // Text color when input is focused
        },
      },
      '& .MuiInputLabel-root': {
        color: theme.palette.blackText.lighter, // Label color when not focused
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.primary.main, // Label color when focused
      },
      '& .MuiInputLabel-root.Mui-disabled': {
        color: theme.palette.blackText.light, // Gray label for disabled input
      },
    }),
  },
};
export default TextField;
