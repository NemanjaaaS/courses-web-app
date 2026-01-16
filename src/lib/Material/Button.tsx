import type { Components, Theme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    light: true;
    error: true;
    errorLight: true;
  }
}

const Button: Components<Omit<Theme, 'components'>>['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: () => ({
      borderRadius: '8px !important',
      textTransform: 'initial',
      letterSpacing: 0.5,
      fontWeight: 500,
      paddingLeft: 16,
      paddingRight: 16,
    }),
    outlined: ({ theme }) => ({
      borderWidth: 1,
      '&:hover': {
        borderWidth: 1,
        backgroundColor: theme.palette.action.hover,
      },
    }),
  },
  variants: [
    {
      props: { variant: 'outlined' },
      style: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderColor: theme.palette.grey[500],
        backgroundColor: 'transparent',
        '&:hover': {
          borderColor: theme.palette.grey[700],
          backgroundColor: theme.palette.grey[100],
        },
      }),
    },
    {
      props: { variant: 'contained', color: 'light' },
      style: ({ theme }) => ({
        background: theme.palette.primary.lighter,
        color: theme.palette.primary.darker,
      }),
    },
    {
      props: { variant: 'contained', color: 'error' },
      style: ({ theme }) => ({
        background: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
          background: theme.palette.error.dark,
        },
      }),
    },
    {
      props: { variant: 'outlined', color: 'error' },
      style: ({ theme }) => ({
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        '&:hover': {
          background: theme.palette.error.lighter,
        },
      }),
    },
    {
      props: { variant: 'contained', color: 'errorLight' },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.error.lighter,
        color: theme.palette.error.darker,
        '&:hover': {
          backgroundColor: theme.palette.error.light,
        },
      }),
    },
  ],
};

export default Button;
