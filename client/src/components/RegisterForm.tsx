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

type Props = {
  onSwitch: () => void;
  onSuccess?: () => void;
};

const RegisterForm = ({ onSwitch, onSuccess }: Props) => {
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const nameError = !formData.name.trim() ? "Name is required" : "";
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validatePasswordMatch(
      formData.password,
      formData.confirmPassword,
    );

    setErrors({
      name: nameError,
      email: emailValidation.error || "",
      password: passwordValidation.error || "",
      confirmPassword: confirmPasswordValidation.error || "",
    });

    return (
      !nameError &&
      emailValidation.isValid &&
      passwordValidation.isValid &&
      confirmPasswordValidation.isValid
    );
  };

  const handleBlur = (
    field: "name" | "email" | "password" | "confirmPassword",
  ) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "name") {
      const error = !formData.name.trim() ? "Name is required" : "";
      setErrors((prev) => ({ ...prev, name: error }));
    } else if (field === "email") {
      const validation = validateEmail(formData.email);
      setErrors((prev) => ({ ...prev, email: validation.error || "" }));
    } else if (field === "password") {
      const validation = validatePassword(formData.password);
      setErrors((prev) => ({ ...prev, password: validation.error || "" }));
    } else if (field === "confirmPassword") {
      const validation = validatePasswordMatch(
        formData.password,
        formData.confirmPassword,
      );
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validation.error || "",
      }));
    }
  };

  const handleChange = (
    field: "name" | "email" | "password" | "confirmPassword",
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      if (field === "name") {
        const error = !value.trim() ? "Name is required" : "";
        setErrors((prev) => ({ ...prev, name: error }));
      } else if (field === "email") {
        const validation = validateEmail(value);
        setErrors((prev) => ({ ...prev, email: validation.error || "" }));
      } else if (field === "password") {
        const validation = validatePassword(value);
        setErrors((prev) => ({ ...prev, password: validation.error || "" }));
      } else if (field === "confirmPassword") {
        const validation = validatePasswordMatch(value, formData.password);
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validation.error || "",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register(formData.name, formData.email, formData.password);
      onSuccess?.();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          error={touched.name && !!errors.name}
          helperText={touched.name && errors.name}
          disabled={isLoading}
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
          variant="outlined"
          size="small"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          disabled={isLoading}
          slotProps={{
            htmlInput: {
              "data-testid": "register-email",
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          size="small"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          disabled={isLoading}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={-1}
                    disabled={isLoading}
                    sx={{ color: "primary.main" }}
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
          variant="outlined"
          size="small"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          onBlur={() => handleBlur("confirmPassword")}
          error={touched.confirmPassword && !!errors.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
          disabled={isLoading}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={-1}
                    disabled={isLoading}
                    sx={{ color: "primary.main" }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
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
