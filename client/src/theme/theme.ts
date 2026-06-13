import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#60d1ac',
    },
    white: {
      main: '#ffffff',
    },
    blue: {
      800: '#0c1627',
      600: '#132034',
      500: '#1f2f44',
      400: '#304361',
    },
    greyCustom: {
      500: '#adb8c1',
      100: '#e2e8ed',
    },
    red: {
      500: '#ef4444',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: `${theme.palette.blue[600]}`,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },

          '& .MuiOutlinedInput-input': {
            color: `${theme.palette.primary.main}`,
          },

          '& .MuiOutlinedInput-input::placeholder': {
            color: `${theme.palette.primary.main}`,
            opacity: 1,
          },

          '& label': {
            color: `${theme.palette.primary.main}`,
          },

          '& label.Mui-focused': {
            color: theme.palette.primary.main,
          },

          '& .MuiFormHelperText-root': {
            color: `${theme.palette.primary.main}`,
          },

          '& .MuiFormHelperText-root.Mui-error': {
            color: `${theme.palette.red[500]}`,
          },
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: `${theme.palette.white.main}`,

          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }),

        outlined: ({ theme }) => ({
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,

          '&:hover': {
            borderColor: theme.palette.primary.dark,
            color: theme.palette.primary.dark,
          },
        }),
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: '#0f172a',
          color: '#e5e7eb',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 8,
        }),
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          borderBottom: `1px solid ${theme.palette.primary.main}`,
          fontWeight: 600,
          paddingBottom: theme.spacing(2),
        }),
      },
    },
  },
});
