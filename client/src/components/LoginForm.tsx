import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/formValidation";
import useAuth from "../hooks/useAuth";

type Props = {
  onSwitch: () => void;
  onSuccess?: () => void;
};

const LoginForm = ({ onSwitch, onSuccess }: Props) => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    setErrors({
      email: emailValidation.error || "",
      password: passwordValidation.error || "",
    });

    return emailValidation.isValid && passwordValidation.isValid;
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "email") {
      const validation = validateEmail(formData.email);
      setErrors((prev) => ({ ...prev, email: validation.error || "" }));
    } else if (field === "password") {
      const validation = validatePassword(formData.password);
      setErrors((prev) => ({ ...prev, password: validation.error || "" }));
    }
  };

  const handleChange = (field: "email" | "password", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      if (field === "email") {
        const validation = validateEmail(value);
        setErrors((prev) => ({ ...prev, email: validation.error || "" }));
      } else if (field === "password") {
        const validation = validatePassword(value);
        setErrors((prev) => ({ ...prev, password: validation.error || "" }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
      onSuccess?.();
    } catch (error) {
      console.error("Login failed:", error);
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
              "data-testid": "login-email",
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
