"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  useTheme,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import AppointmentModal from "../doctor/appointmentModal";
import { Cookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useBookAppointmentMutation } from "@/customHooks/query/doctor.query.hooks";

export default function DoctorCard({ doctor }: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Get user from localStorage
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const { mutateAsync } = useBookAppointmentMutation();

  const handleAppointmentSubmit = async (payload: {
    date: string;
    time: string;
    name: string;
  }) => {
    try {
      const appointmentPayload = {
        doctorId: doctor._id || doctor.id,
        userId: user?.id,
        name: payload.name,
        date: payload.date,
        time: payload.time,
      };
      await mutateAsync(appointmentPayload);
      alert("Appointment booked!");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Could not book appointment.");
      throw error;
    }
  };

  const feeLabel = doctor.fees ?? doctor.fee ?? doctor.consultationFee ?? "N/A";

  const availableSlot =
    doctor.availableSlot ||
    doctor.availableSlots ||
    doctor.slots ||
    doctor.availability ||
    [];

  const availableSlotText = Array.isArray(availableSlot)
    ? availableSlot.length > 0
      ? availableSlot.join(", ")
      : "No slots available"
    : availableSlot || "No slots available";

  // ⭐ static rating
  const rating = 4.5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<StarIcon key={i} sx={{ color: "#facc15" }} />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<StarHalfIcon key={i} sx={{ color: "#facc15" }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: "#facc15" }} />);
      }
    }
    return stars;
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: "18px",
          overflow: "hidden",
          transition: "all 0.25s ease",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 12px 35px rgba(15, 23, 42, 0.08)"
              : "0 12px 35px rgba(0, 0, 0, 0.45)",
          border: `1px solid ${
            theme.palette.mode === "light" ? "#e3e8f0" : "#2f3748"
          }`,
          background: theme.palette.background.paper,
          minHeight: 220,
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow:
              theme.palette.mode === "light"
                ? "0 16px 45px rgba(15, 23, 42, 0.18)"
                : "0 16px 45px rgba(0, 0, 0, 0.55)",
          },
        }}
      >
        <CardContent
          sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.25 }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            color={theme.palette.text.primary}
          >
            {doctor.name || "Dr. Name"}
          </Typography>

          <Chip
            label={doctor.department?.name || "Department not set"}
            size="small"
            sx={{
              alignSelf: "flex-start",
              borderRadius: "8px",
              fontWeight: 600,
              color: theme.palette.primary.main,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(99, 102, 241, 0.12)"
                  : "rgba(99, 102, 241, 0.2)",
            }}
          />

          {/* ⭐ Rating with Icons */}
          <Box display="flex" alignItems="center" gap={0.5}>
            {renderStars()}
            <Typography variant="body2" ml={1}>
              ({rating})
            </Typography>
          </Box>

          {/* 💼 Static Experience */}
          <Typography variant="body2" color={theme.palette.text.secondary}>
            <strong>Experience:</strong> 15 years
          </Typography>

          <Typography variant="body2" color={theme.palette.text.secondary}>
            <strong>Fees:</strong>{" "}
            {typeof feeLabel === "number" ? `₹${feeLabel}` : feeLabel}
          </Typography>

          <Typography variant="body2" color={theme.palette.text.secondary}>
            <strong>Available:</strong> {availableSlotText}
          </Typography>

          <Box sx={{ mt: 1.5 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                const cookies = new Cookies();
                const token = cookies.get("token");
                if (!token) {
                  router.push("/auth/signIn");
                  return;
                }
                setOpen(true);
              }}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                fontWeight: 600,
                background: "linear-gradient(142deg, #4f46e5, #22c55e)",
              }}
            >
              Book Appointment
            </Button>
          </Box>
        </CardContent>
      </Card>

      <AppointmentModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAppointmentSubmit}
        doctorId={doctor._id || doctor.id}
        doctor={doctor}
        defaultName={user?.name || ""}
      />
    </>
  );
}
