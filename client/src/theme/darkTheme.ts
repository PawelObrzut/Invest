import { alpha } from "@mui/material";
import { appTheme } from "./appTheme";
import { colors } from "./colors";

export const darkTheme = appTheme({
  mode: "dark",

  primary: {
    main: colors.dark.primary,
  },

  background: {
    default: colors.dark.background,
    paper: colors.dark.surface,
  },

  surface: {
    main: colors.dark.surface,
    light: alpha(colors.dark.surface, 0.6),
  },

  text: {
    primary: colors.dark.text,
    secondary: colors.dark.textSecondary,
  },

  divider: colors.dark.divider,

  error: {
    main: colors.dark.error,
  },
});
