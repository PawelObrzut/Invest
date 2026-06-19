import { Avatar, Badge, Box, IconButton, Tooltip } from "@mui/material";
import { LogIn, LogOut, Settings } from "lucide-react";
import type { User } from "../types/auth.type";

type Props = {
  user: User | null;
  logout: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

const UserWidget = ({ user, logout, setIsModalOpen }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "fixed",
        top: 6,
        right: 8,
        border: 2,
        borderRadius: 2,
        borderColor: "divider",
        p: 1,
        bgcolor: "surface.main",
      }}
    >
      {user ? (
        <>
          <Tooltip title="Account settings" placement="left-start">
            <IconButton>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <Avatar
                    sx={{
                      width: 18,
                      height: 18,
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </Avatar>
                }
              >
                <Settings />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout" placement="left-start">
            <IconButton onClick={logout}>
              <LogOut />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Settings" placement="left-start">
            <span>
              <IconButton disabled>
                <Settings />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Login" placement="left-start">
            <IconButton onClick={() => setIsModalOpen(true)}>
              <LogIn />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default UserWidget;
