"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";

import { Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useVerifyOtpMutation } from "@/customHooks/query/auth.query.hooks";

type Props = {
  open: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: () => void;
};

const OtpModal: React.FC<Props> = ({ open, onClose, userId, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { mutate, isPending } = useVerifyOtpMutation();

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const otpArr = otp.split("");
    otpArr[index] = value;
    const newOtp = otpArr.join("");
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    if (otp.length !== 6) {
      alert("Enter 6 digit OTP");
      return;
    }

    mutate(
      { userId, otp },
      {
        onSuccess: (res) => {
          if (res.status) {
            setOtp("");
            onClose();
            onSuccess();
          }
        },
      }
    );
  };

  return (
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
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        },
      }}
    >
      <DialogContent sx={{ position: "relative", p: 0 }}>
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

        <Typography
          fontWeight={700}
          fontSize={24}
          mb={2}
          color="#111"
          textAlign="center"
        >
          Verify OTP 🔐
        </Typography>

        <Typography
          textAlign="center"
          sx={{ color: "#666", mb: 3 }}
        >
          Enter the 6-digit code sent to your email
        </Typography>

        <Stack direction="row" spacing={1} justifyContent="center" mb={3}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <TextField
              key={i}
              inputRef={(el) => (inputRefs.current[i] = el)}
              value={otp[i] || ""}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                },
              }}
              sx={{
                width: 50,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  background: "#f9f9f9",
                },
              }}
            />
          ))}
        </Stack>

        <Button
          fullWidth
          onClick={handleSubmit}
          disabled={isPending}
          sx={{
            py: 1.5,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            background: "#1fb6c9",
            color: "#fff",
            "&:hover": {
              background: "#17a2b8",
            },
          }}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
