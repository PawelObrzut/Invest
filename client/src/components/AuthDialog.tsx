import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Mode = "login" | "register";

type Props = {
  isOpen: boolean,
  onClose: () => void,
}

const AuthDialog = ({ isOpen, onClose }: Props) => {
  const [mode, setMode] = useState<Mode>("login");

  const handleSuccess = () => {
    onClose();
    setMode("login");
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      fullWidth 
      maxWidth="xs"
      >
      <DialogTitle>
        {mode === "login" ? "Login" : "Create Account"}
      </DialogTitle>

      <DialogContent>
        {mode === 'login' ? (
          <LoginForm 
            onSwitch={() => setMode("register")}
            onSuccess={handleSuccess}
          />
        ) : (
          <RegisterForm 
            onSwitch={() => setMode("login")}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog;
