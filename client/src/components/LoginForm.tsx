import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import useAuth from "../hooks/useAuth";
import type { AuthFormValues } from "../types/auth.type";
import {
  validateEmail,
  validatePassword,
} from "../utils/formValidation";

type Props = {
  form: UseFormReturn<AuthFormValues>;
  onSwitch: () => void;
  onSuccess?: () => void;
};

const LoginForm = ({ form, onSwitch, onSuccess }: Props) => {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: AuthFormValues) => {
    try {
      await login(data.email, data.password);
      onSuccess?.();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          label="Email"
          type="email"
          size="small"
          disabled={isLoading}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            validate: (value) => validateEmail(value).error || true,
          })}
          slotProps={{
            htmlInput: {
              "data-testid": "login-email",
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          size="small"
          disabled={isLoading}
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            validate: (value) => validatePassword(value).error || true,
          })}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    tabIndex={-1}
                    disabled={isLoading}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            },
            htmlInput: {
              "data-testid": "login-password",
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
          data-testid="login-submit"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <Button
          fullWidth
          variant="text"
          onClick={onSwitch}
          disabled={isLoading}
          data-testid="login-switch-to-register"
        >
          Don't have an account? Create one
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;