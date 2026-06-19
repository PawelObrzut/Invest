import React from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  LayoutDashboard,
  ChartPie,
  BriefcaseBusiness,
  SquareChevronRight,
  SquareChevronLeft,
  DollarSign,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Markets",
    path: "/markets",
    icon: ChartPie,
  },
  {
    label: "Portfolio",
    path: "/portfolio",
    icon: BriefcaseBusiness,
  },
];

type SidebarProps = {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const theme = useTheme();

  return (
    <Box
      component="aside"
      sx={{
        width: isExpanded ? 260 : 72,
        height: "100vh",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        transition: "width 0.3s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 72,
          px: 2,
          pt: 5,
          pb: 3,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <DollarSign 
          color={theme.palette.primary.main} 
          size={40}
          className="shrink-0 relative -top-2"
          />

        {isExpanded && (
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              nVesT+
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                position: "relative",
                top: -6,
              }}
            >
              Be a Trader.
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ flex: 1, px: 1, py: 2 }}>
        <Stack spacing={0.5}>
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    color: isActive ? "primary.main" : "text.primary",
                    backgroundColor: isActive
                      ? "action.selected"
                      : "transparent",
                    borderLeft: isActive
                      ? "4px solid"
                      : "0",
                    borderColor: isActive
                      ? "primary.main"
                      : "transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} />
                  </Box>

                  {isExpanded && (
                    <Typography variant="body1">
                      {label}
                    </Typography>
                  )}
                </Box>
              )}
            </NavLink>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",
          p: 1.5,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {isExpanded ? (
            <SquareChevronLeft />
          ) : (
            <SquareChevronRight />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
