import type { TypographyVariantsOptions } from '@mui/material';

export const fontFamily = {
  monaSans: ['Mona Sans', 'sans-serif'].join(','),
  workSans: ['Work Sans', 'sans-serif'].join(','),
};

const typography: TypographyVariantsOptions = {
  fontFamily: fontFamily.monaSans,
  h1: {
    fontSize: '3rem',
    fontWeight: 700,
  },
  h2: {
    fontSize: '2.25rem',
    fontWeight: 700,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 700,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  h5: {
    fontSize: '1.3rem',
    fontWeight: 700,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 700,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  button: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  // Custom
  overtitle: {
    fontSize: '0.65rem',
    fontWeight: 'light',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sideTab: {
    fontSize: '1.05rem',
    fontWeight: 500,
    lineHeight: 2.5,
  },
};

// Extend Material UI's theme
declare module '@mui/material/styles' {
  interface TypographyVariants {
    overtitle: React.CSSProperties;
    sideTab: React.CSSProperties;
  }

  // Allow configuration using `TypographyOptions`
  interface TypographyVariantsOptions {
    overtitle?: React.CSSProperties;
    sideTab?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    overtitle: true;
    sideTab: true;
  }
}

export default typography;
