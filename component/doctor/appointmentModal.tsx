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
          borderRadius: { xs: "12px", md: "18px" },
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          mx: { xs: 2, sm: 0 },
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 0, sm: 0 }, position: "relative" }}>
        
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: { xs: 8, md: 12 },
            top: { xs: 8, md: 12 },
            backgroundColor: "#f3f4f6",
            zIndex: 10,
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
              p: { xs: 3, md: 4 },
              background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
              display: { xs: "none", md: "block" },
            }}
          >
            {doctor && (
              <Box mb={2}>
                <Typography fontWeight={700} fontSize={{ xs: "16px", md: 20 }} color="#111d39">
                  {doctor.name}
                </Typography>

                <Typography fontSize={{ xs: "12px", md: 14 }} color="#6b7280" mt={0.5}>
                  {doctor?.department?.name ||
                    doctor?.specialty ||
                    doctor?.role ||
                    ""}
                </Typography>

                <Typography
                  fontSize={{ xs: "12px", md: 14 }}
                  color="#2563eb"
                  mt={1}
                  fontWeight={600}
                >
                  ₹{doctor.fees || 500} per visit
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1.2} color="#374151" fontSize={{ xs: "12px", md: "14px" }}>
              <Typography>🗓 15 years of experience</Typography>
              <Typography>🎓 MD from Harvard Medical School</Typography>
              <Typography>📍 Soulbless General Hospital</Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography fontWeight={600} mb={1} color="#183266" fontSize={{ xs: "12px", md: "14px" }}>
              About
            </Typography>

            <Typography color="#4b5563" fontSize={{ xs: "12px", md: 14 }} lineHeight={1.6}>
              Quite good in knowledge and skills needed to diagnose and treat a
              variety of diseases or injuries, as well as other physical or
              mental conditions. with over 15 years of experience.
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 4 },
              backgroundColor: "#ffffff",
            }}
          >
            {/* Doctor Info on Mobile */}
            {doctor && (
              <Box mb={3} sx={{ display: { xs: "block", md: "none" } }}>
                <Typography fontWeight={700} fontSize={18} color="#111d39">
                  {doctor.name}
                </Typography>

                <Typography fontSize={12} color="#6b7280" mt={0.5}>
                  {doctor?.department?.name ||
                    doctor?.specialty ||
                    doctor?.role ||
                    ""}
                </Typography>

                <Typography
                  fontSize={12}
                  color="#2563eb"
                  mt={1}
                  fontWeight={600}
                >
                  ₹{doctor.fees || 500} per visit
                </Typography>
              </Box>
            )}

            <Typography fontWeight={700} fontSize={{ xs: "18px", md: 25 }} mb={{ xs: 2, md: 3 }} color="#183266">
              Book Appointment
            </Typography>

            <Stack spacing={{ xs: 2, md: 3 }}>
              <TextField
                label="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                size="small"
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
                size="small"
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
                  size="small"
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
                fullWidth
                sx={{
                  mt: 1,
                  md: { mt: 2 },
                  height: { xs: 44, md: 48 },
                  borderRadius: "12px",
                  background: "linear-gradient(142deg, #4f46e5, #22c55e)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: { xs: "14px", md: "16px" },
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
                fullWidth
                sx={{
                  textTransform: "none",
                  color: "#6b7280",
                  fontWeight: 500,
                  fontSize: { xs: "14px", md: "16px" },
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
