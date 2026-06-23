import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { AuthFormValues } from "../types/auth.type";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Mode = "login" | "register";

type Props = {
  form: UseFormReturn<AuthFormValues>;
  onSwitch: () => void;
  onSuccess: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const AuthDialog = ({ isOpen, onClose }: Props) => {
  const [mode, setMode] = useState<Mode>("login");

  const form = useForm<AuthFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSuccess = () => {
    form.reset();
    onClose();
    setMode("login");
  };

  const switchToRegister = () => {
    form.reset();
    setMode("register");
  };

  const switchToLogin = () => {
    form.reset();
    setMode("login");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "background.default",
          border: 1,
          borderColor: "divider",
        },
      }}
    >
      <div data-testid="auth-dialog">
        <DialogTitle>
          {mode === "login" ? "Login" : "Create Account"}
        </DialogTitle>

        <DialogContent>
          {mode === "login" ? (
            <LoginForm
              form={form}
              onSwitch={switchToRegister}
              onSuccess={handleSuccess}
            />
          ) : (
            <RegisterForm
              form={form}
              onSwitch={switchToLogin}
              onSuccess={handleSuccess}
            />
          )}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AuthDialog;
