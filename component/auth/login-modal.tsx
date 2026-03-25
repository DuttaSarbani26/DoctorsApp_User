import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff, Close, Apple } from "@mui/icons-material";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLoginMutation } from "@/customHooks/query/auth.query.hooks";

/* 🔵 Google SVG */
const GoogleIcon = () => (
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    width={18}
  />
);

type Props = {
  open: boolean;
  onClose: () => void;
  setOpenForgot: (open: boolean) => void;
};

const LoginModal: React.FC<Props> = ({ open, onClose, setOpenForgot }) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [openReset, setOpenReset] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: loginUser, isPending: loggingIn } = useLoginMutation();

  const onSubmit = (data: any) => {
    loginUser(data, {
      onSuccess: (res) => {
        if (res?.status) {
          onClose();
          router.push("/");
        }
      },
    });
  };

  return (
    <>
      {/* 🌈 LIGHT BACKGROUND */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1200,
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
          }}
        />
      )}

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          component: motion.div,
          initial: { opacity: 0, y: 40, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.3 },
          sx: {
            borderRadius: "24px",
            p: 4,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogContent sx={{ position: "relative", p: 0 }}>
          {/* ❌ CLOSE */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "#666",
            }}
          >
            <Close />
          </IconButton>

          {/* HEADER */}
          <Typography
            fontWeight={700}
            fontSize={24}
            mb={3}
            color="#111"
          >
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <TextField
              {...register("email", {
                required: "Email is required",
              })}
              label="Email address"
              variant="standard"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message as string}
              sx={inputStyle}
            />

            {/* PASSWORD */}
            <TextField
              {...register("password", {
                required: "Password is required",
              })}
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="standard"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message as string}
              sx={inputStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* FORGOT PASSWORD */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Typography
                sx={{
                  cursor: "pointer",
                  color: "#1fb6c9",
                  fontSize: "14px",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => setOpenForgot(true)}
              >
                Forgot Password?
              </Typography>
            </Box>

            {/* BUTTON */}
            <Button fullWidth type="submit" sx={primaryBtn}>
              {loggingIn ? "Logging in..." : "Submit"}
            </Button>

            {/* DIVIDER */}
            <Divider sx={dividerStyle}>OR</Divider>

            {/* SOCIAL */}
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                startIcon={<GoogleIcon />}
                sx={socialBtn}
              >
                Google
              </Button>

              <Button
                fullWidth
                startIcon={<Apple />}
                sx={socialBtn}
              >
                Apple
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginModal;

/* ================= UI ONLY ================= */

const inputStyle = {
  "& .MuiInputBase-root": {
    color: "#111",
  },
  "& .MuiInput-underline:before": {
    borderBottom: "1px solid #ccc",
  },
  "& .MuiInput-underline:hover:before": {
    borderBottom: "1px solid #1fb6c9",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "2px solid #1fb6c9",
  },
  "& .MuiFormHelperText-root": {
    color: "#e53935",
  },
};

const primaryBtn = {
  mt: 3,
  py: 1.2,
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 500,
  background: "#1fb6c9",
  color: "#fff",
  "&:hover": {
    background: "#17a2b8",
  },
};

const socialBtn = {
  borderRadius: "10px",
  py: 1.2,
  textTransform: "none",
  background: "#fff",
  border: "1px solid #ddd",
  color: "#444",
  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
};

const dividerStyle = {
  my: 3,
  color: "#999",
};