declare module "@mui/material/styles" {
  interface Palette {
    mode: string;

    primary: {
      main: string;
    };

    background: {
      main: string;
      light: string;
    };

    surface: {
      main: string;
      light: string;
    };
  }

  interface PaletteOptions {
    surface?: {
      main?: string;
      light?: string;
    };
  }
}

export {};
