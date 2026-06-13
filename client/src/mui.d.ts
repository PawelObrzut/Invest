declare module '@mui/material/styles' {
  interface Palette {
    white: {
      main: string;
    }
    blue: {
      800: string;
      600: string;
      500: string;
      400: string;
    };
    greyCustom: {
      500: string;
      100: string;
    };
    red: {
      500: string;
    }
  }

  interface PaletteOptions {
    white?: {
      main: string;
    }
    blue?: {
      800: string;
      600: string;
      500: string;
      400: string;
    };
    greyCustom?: {
      500: string;
      100: string;
    };
    red?: {
      500: string;
    }
  }
}

export {};