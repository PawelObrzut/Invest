import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../utils/formValidation";

import useAuth from "../hooks/useAuth";
import type { UseFormReturn } from "react-hook-form";
import type { AuthFormValues } from "../types/auth.type";

type Props = {
  form: UseFormReturn<AuthFormValues>;
  onSwitch: () => void;
  onSuccess?: () => void;
};

const RegisterForm = ({ form, onSwitch, onSuccess }: Props) => {
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: AuthFormValues) => {
    try {
      await registerUser(data.name, data.email, data.password);
      onSuccess?.();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          size="small"
          disabled={isLoading}
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name", {
            required: "Name is required",
          })}
          slotProps={{
            htmlInput: {
              "data-testid": "register-name",
            },
          }}
        />
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
              "data-testid": "register-email",
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
              "data-testid": "register-password",
            },
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          size="small"
          disabled={isLoading}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              validatePasswordMatch(password, value).error || true,
          })}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    tabIndex={-1}
                    disabled={isLoading}
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
            htmlInput: {
              "data-testid": "register-confirm-password",
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
          data-testid="register-submit"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        <Button
          fullWidth
          variant="text"
          onClick={onSwitch}
          disabled={isLoading}
          data-testid="register-switch-to-login"
        >
          Already have an account? Login
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
