"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SlotPicker from "./slotPicker";

export default function AppointmentModal({
  open,
  onClose,
  onSubmit,
  defaultName = "",
  defaultDate = "",
  defaultTime = "",
  doctorId,
  doctor,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { date: string; time: string; name: string }) => void;
  defaultName?: string;
  defaultDate?: string;
  defaultTime?: string;
  doctorId?: string | null;
  doctor?: any | null;
}) {
  const [date, setDate] = useState<string>(defaultDate || "");
  const [time, setTime] = useState<string>(defaultTime || "");
  const [name, setName] = useState<string>(defaultName);
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (open) {
      setName(defaultName || "");
      setDate(defaultDate || "");
      setTime(defaultTime || "");
    }
  }, [open, defaultName, defaultDate, defaultTime]);

  const handleSubmit = async () => {
    if (!date || !time || !name) return;
    setSubmitting(true);
    try {
      await onSubmit({ date, time, name });
      onClose(); 
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "18px",
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: "relative" }}>
        
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            backgroundColor: "#f3f4f6",
            "&:hover": {
              backgroundColor: "#e5e7eb",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          
          <Box
            sx={{
              flex: 1,
              p: 4,
              background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
            }}
          >
            {doctor && (
              <Box mb={2}>
                <Typography fontWeight={700} fontSize={20} color="#111d39">
                  {doctor.name}
                </Typography>

                <Typography fontSize={14} color="#6b7280" mt={0.5}>
                  {doctor?.department?.name ||
                    doctor?.specialty ||
                    doctor?.role ||
                    ""}
                </Typography>

                <Typography
                  fontSize={14}
                  color="#2563eb"
                  mt={1}
                  fontWeight={600}
                >
                  ₹{doctor.fees || 500} per visit
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1.2} color="#374151">
              <Typography>🗓 15 years of experience</Typography>
              <Typography>🎓 MD from Harvard Medical School</Typography>
              <Typography>📍 Soulbless General Hospital</Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography fontWeight={600} mb={1} color="#183266">
              About
            </Typography>

            <Typography color="#4b5563" fontSize={14} lineHeight={1.6}>
              Quite good in knowledge and skills needed to diagnose and treat a
              variety of diseases or injuries, as well as other physical or
              mental conditions. with over 15 years of experience.
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 4,
              backgroundColor: "#ffffff",
            }}
          >
            <Typography fontWeight={700} fontSize={25} mb={3} color="#183266">
              Book Appointment...
            </Typography>

            <Stack spacing={3}>
              <TextField
                label="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "#f9fafb",
                  },
                }}
              />

              <TextField
                type="date"
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "#f9fafb",
                  },
                }}
              />

              {doctorId && date ? (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <SlotPicker
                    doctorId={doctorId}
                    date={date}
                    value={time}
                    onChange={(t: string) => setTime(t)}
                  />
                </Box>
              ) : (
                <TextField
                  type="time"
                  label="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "#f9fafb",
                    },
                  }}
                />
              )}

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!date || !time || !name || submitting}
                sx={{
                  mt: 2,
                  height: 48,
                  borderRadius: "12px",
                  background: "linear-gradient(142deg, #4f46e5, #22c55e)",
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 6px 16px rgba(79,70,229,0.25)",

                  "&:hover": {
                    background: "linear-gradient(135deg, #1d4ed8, #4338ca)",
                  },

                  "&.Mui-disabled": {
                    backgroundColor: "#e5e7eb",
                    color: "#9ca3af",
                  },
                }}
              >
                {submitting ? "Booking..." : "Book Appointment"}
              </Button>

              <Button
                onClick={onClose}
                sx={{
                  textTransform: "none",
                  color: "#6b7280",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                  },
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
