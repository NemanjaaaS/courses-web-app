import type { PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import {
  grey,
  red,
  green,
  blue,
  yellow,
  transparentRed,
  transparentGreen,
  transparentYellow,
  black,
  white,
  purple,
  violate,
  orange,
  amber,
  extensionBlue,
  extensionGreen,
  extensionRed,
  slate,
  extensionWhite,
  extensionGrey,
  neutral,
  customDark,
} from './colors';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    sidebar?: { primary: string; secondary: string };
    sidebarItem?: {
      textActive: string;
      text: string;
      background: string;
      backgroundHover: string;
      hover: string;
      disabled: string;
    };

    grid?: PaletteColorOptions;
    dialog?: DialogColorOptions;
    neutral?: PaletteColorOptions;
    chip?: {
      red: ChipPaletteColorOptions;
      grey: ChipPaletteColorOptions;
      yellow: ChipPaletteColorOptions;
      amber: ChipPaletteColorOptions;
      orange: ChipPaletteColorOptions;
      blue: ChipPaletteColorOptions;
      green: ChipPaletteColorOptions;
      white: ChipPaletteColorOptions;
      redWhite: ChipPaletteColorOptions;
      blueWhite: ChipPaletteColorOptions;
      count: ChipPaletteColorOptions;
      closeButton: ChipPaletteColorOptions;
    };
    paper: {
      background: string;
      border: string;
      backgroundDarker: string;
      lightBorder: string;
    };
    link: { color: string };
    assignedTo?: ChipPaletteColorOptions;
    labelText?: string;
    quickView?: { background: string };
    transparent?: {
      white: {
        light: string;
        lighter: string;
        main: string;
      };

      main?: string;
      success: PaletteColorOptions;
      warning: PaletteColorOptions;
      error: PaletteColorOptions;
    };
    gradients?: {
      primary: PaletteColorOptions;
    };
    blackText?: CustomTextPalette;
    whiteText?: CustomTextPalette;
    background?: Partial<TypeBackground>;
    border?: CustomTextPalette;
    button?: {
      border: PaletteColorOptions;
      color: PaletteColorOptions;
    };
    checkbox_box?: {
      border: PaletteColorOptions;
      background: PaletteColorOptions;
    };
  }
  interface ChipPaletteColorOptions {
    color: string;
    background: string;
    border?: string;
  }
  interface DialogColorOptions {
    title: string;
    content: string;
    footer: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
    state?: string;
  }
  interface Palette {
    neutral: PaletteColor;
    gradients: {
      primary: PaletteColor;
    };
    transparent: {
      white: {
        light: string;
        lighter: string;
        main: string;
      };
      main: string;
      success: PaletteColor;
      warning: PaletteColor;
      error: PaletteColor;
    };
    blackText: CustomTextPalette;
    whiteText: CustomTextPalette;
    border: CustomTextPalette;
  }

  interface TypeBackground {
    hover: string;
    sidebar: string;
    grid: string;
    footer: string;
    main?: string;
    default: string;
    light: string;
    lighter: string;
    dark: string;
    darker: string;
    fileInput: string;
    fileInputHover: string;
    blur: string;
  }

  interface PaletteColor {
    lighter: string;
    darker: string;
    state: string;
  }
  interface CustomTextPalette {
    default: string;
    light: string;
    lighter: string;
    dark: string;
    darker: string;
  }
}

export const lightPalette: PaletteOptions = {
  mode: 'light',
  neutral: {
    lighter: grey[100],
    light: grey[200],
    main: grey[300],
    dark: grey[400],
    darker: grey[600],
  },
  primary: {
    lighter: blue[100],
    light: blue[300],
    main: blue[500],
    dark: blue[700],
    darker: blue[900],
  },
  secondary: {
    lighter: grey[100],
    light: grey[300],
    main: grey[500],
    dark: grey[800],
    darker: blue[500],
  },
  sidebar: {
    primary: blue[900],
    secondary: blue[600],
  },
  sidebarItem: {
    text: grey[200],
    textActive: grey[100],
    background: blue[700],
    backgroundHover: blue[600],
    disabled: grey[500],
    hover: grey[300],
  },
  paper: {
    background: slate[50],
    border: grey[300],
    backgroundDarker: white[50],
    lightBorder: slate[200],
  },
  grid: {
    main: '#FFFFFF',
    lighter: '#5C6789FF',
  },
  dialog: {
    title: '#FFFFFF',
    content: '#FFFFFF',
    footer: grey[100],
  },
  info: {
    main: blue[700],
    dark: blue[800],
    darker: blue[900],
    light: blue[300],
    lighter: blue[50],
  },
  background: {
    lighter: white[50],
    light: white[50],
    default: '#F1F5F9',
    main: white[50],
    hover: '#EFF6FF',
    dark: '#F1F5F9',
    darker: white[600],
    fileInput: extensionWhite[400],
    fileInputHover: blue[100],
    blur: '#9CA3AF',
  },
  success: {
    main: green[500],
    dark: green[700],
    light: green[300],
    lighter: green[100],
  },
  warning: {
    main: yellow[500],
    light: yellow[300],
    lighter: yellow[100],
  },

  error: {
    darker: red[800],
    dark: red[700],
    main: red[500],
    light: red[200],
    lighter: red[100],
  },
  blackText: {
    default: '#333333',
    light: grey[500],
    lighter: '#999999',
    dark: '#1a1a1a',
    darker: '#000000',
  },
  border: {
    lighter: '#C4C4C4',
    light: '#B9B9B9FF',
    default: '#A3A3A3FF',
    dark: '#3F3F3FFF',
    darker: '#000000',
  },
  whiteText: {
    default: '#FFFFFF',
    light: '#F5F5F5',
    lighter: '#E0E0E0',
    dark: '#CCCCCC',
    darker: '#B3B3B3',
  },
  text: {
    primary: black[500],
    secondary: grey[300],
    disabled: neutral[400],
  },
  gradients: {
    primary: {
      main: purple[500],
      state: violate[700],
    },
  },
  transparent: {
    main: 'rgba(0,0,0,0)',
    white: {
      lighter: 'rgba(255,255,255,0.2)',
      light: 'rgba(255,255,255,0.5)',
      main: 'rgba(255,255,255,0.8)',
    },

    success: {
      main: transparentGreen[500],
    },
    warning: {
      main: transparentYellow[500],
    },
    error: {
      main: transparentRed[500],
    },
  },
  chip: {
    red: { background: red[100], color: red[800] },
    grey: { background: grey[100], color: grey[800] },
    yellow: { background: yellow[100], color: yellow[800] },
    amber: { background: amber[100], color: amber[800] },
    orange: { background: orange[100], color: orange[800] },
    blue: { background: extensionBlue[400], color: extensionBlue[600] },
    green: { background: green[200], color: green[800] },
    count: { background: extensionBlue[400], color: extensionBlue[600] },
    white: { background: white[50], color: grey[800], border: grey[200] },
    redWhite: { background: white[50], color: red[500], border: red[500] },
    blueWhite: { background: white[50], color: blue[500], border: extensionBlue[300] },
    closeButton: { background: extensionBlue[500], color: extensionBlue[600] },
  },
  assignedTo: { background: extensionBlue[400], color: extensionBlue[600] },
  button: {
    border: { main: slate[200], light: slate[100] },
    color: { main: grey[800], light: grey[500] },
  },
  labelText: grey[500],
  checkbox_box: {
    border: { main: slate[200] },
    background: { main: slate[50] },
  },
  quickView: { background: white[50] },
  link: { color: blue[500] },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  neutral: {
    lighter: grey[700],
    light: grey[600],
    main: grey[500],
    dark: grey[300],
    darker: grey[200],
  },
  grey: {
    100: '#222',
    200: '#333',
  },
  primary: {
    lighter: blue[900],
    light: blue[700],
    main: blue[500],
    dark: blue[300],
    darker: blue[100],
  },

  border: {
    default: '#333333',
    light: '#8E8E8EFF',
    lighter: '#4F5458',
    dark: '#1a1a1a',
    darker: '#000000',
  },
  secondary: {
    lighter: grey[800],
    light: grey[600],
    main: grey[500],
    dark: grey[400],
    darker: blue[300],
  },
  sidebar: {
    secondary: black[200],
    primary: customDark[50],
  },
  sidebarItem: {
    text: grey[400],
    textActive: grey[100],
    background: '#1f2937', // customDark[800],
    backgroundHover: customDark[200],
    disabled: neutral[500],
    hover: grey[200],
  },
  paper: {
    border: '#FFFFFF0D',
    background: '#10171C',
    backgroundDarker: '#1E262B',
    lightBorder: '#FFFFFF0D',
  },
  grid: {
    main: '#131D24',
    lighter: '#5C6789FF',
  },
  dialog: {
    title: extensionGrey[900],
    content: extensionGrey[900],
    footer: extensionGrey[400],
  },
  info: {
    main: blue[300],
    dark: blue[200],
    darker: blue[100],
    light: blue[700],
    lighter: blue[900],
  },
  background: {
    lighter: customDark[200],
    light: customDark[200],
    default: customDark[50],
    main: customDark[50],
    paper: customDark[300],
    dark: customDark[50],
    darker: customDark[50],
    hover: customDark[300],
    fileInput: extensionWhite[600],
    fileInputHover: '#152345',
    blur: '#0E1418',
  },
  success: {
    main: green[300],
    dark: green[100],
    light: green[500],
    lighter: green[700],
  },
  warning: {
    dark: yellow[500],
    main: yellow[300],
    light: yellow[100],
    lighter: yellow[50],
  },
  error: {
    darker: red[200],
    dark: red[300],
    main: red[500],
    light: red[700],
    lighter: red[900],
  },
  blackText: {
    default: '#CCCCCC',
    light: '#E0E0E0',
    lighter: '#F5F5F5',
    dark: '#999999',
    darker: '#666666',
  },
  whiteText: {
    default: '#FFFFFF',
    light: '#B3B3B3',
    lighter: '#999999',
    dark: '#F5F5F5',
    darker: '#E0E0E0',
  },
  text: {
    primary: grey[100], // Light text on dark backgrounds
    secondary: grey[300],
    disabled: grey[600],
  },
  gradients: {
    primary: {
      main: purple[700],
      state: purple[900], // Slightly darker for emphasis
    },
  },
  transparent: {
    main: 'rgba(0,0,0,0)',
    white: {
      lighter: 'rgba(0,0,0,0.2)',
      light: 'rgba(0,0,0,0.5)',
      main: 'rgba(0,0,0,0.8)',
    },

    success: {
      main: transparentGreen[500],
    },
    warning: {
      main: transparentYellow[500],
    },
    error: {
      main: transparentRed[500],
    },
  },
  chip: {
    red: { background: extensionRed[500], color: red[500] },
    grey: { background: extensionGrey[700], color: white[50] },
    yellow: { background: yellow[800], color: yellow[500] },
    amber: { background: amber[800], color: amber[500] },
    orange: { background: orange[800], color: orange[500] },
    blue: { background: extensionBlue[500], color: extensionBlue[800] },
    green: { background: extensionGreen[500], color: green[400] },
    white: { background: grey[800], color: grey[200], border: extensionGrey[300] },
    redWhite: { background: red[500], color: white[50], border: red[500] },
    blueWhite: { background: blue[500], color: white[50], border: white[50] },
    count: { background: extensionBlue[400], color: extensionBlue[600] },
    closeButton: { background: extensionBlue[500], color: extensionBlue[600] },
  },
  assignedTo: { background: extensionBlue[500], color: extensionBlue[800] },
  button: {
    border: { main: extensionGrey[800] },
    color: { main: grey[400], light: grey[500] },
  },
  labelText: extensionGrey[500],
  checkbox_box: {
    border: { main: white[50] },
    background: { main: white[50] },
  },
  quickView: { background: extensionGrey[900] },
  link: {
    color: grey[200],
  },
};
