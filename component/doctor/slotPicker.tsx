"use client";

import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useDoctorSlotsQuery } from "@/customHooks/query/doctor.query.hooks";


export default function SlotPicker({ doctorId, date, value, onChange }: { doctorId: string; date: string; value: string; onChange: (t: string) => void; }) {
  const q = useDoctorSlotsQuery(doctorId, date as any);
  const loading = q.isLoading;
  const slots = q.data?.data || q.data || [];

  if (loading) return <Typography>Loading slots...</Typography>;

  if (!Array.isArray(slots) || slots.length === 0) return <Typography>No available slots for selected date.</Typography>;

  return (
    <Box>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {slots.map((s: any, idx: number) => {
          const time = s.time || s.slot || s;
          return (
            <Button key={idx} variant={value === time ? "contained" : "outlined"} size="small" onClick={() => onChange(time)} sx={{ textTransform: "none", borderRadius: 1, py: 0.5 }}>
              {time}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}