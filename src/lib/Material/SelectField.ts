import type { Components, Theme } from '@mui/material';

export const SelectField: Components<Omit<Theme, 'components'>>['MuiSelect'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: '8px !important',
      color: theme.palette.blackText.light,

      '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.blackText.default,
        '& .MuiSelect-icon': {
          color: theme.palette.blackText.light,
        },
      },

      // When focused, make the selected text red
      '&.Mui-focused .MuiSelect-select': {
        color: theme.palette.blackText.dark,
      },
    }),
  },
};
