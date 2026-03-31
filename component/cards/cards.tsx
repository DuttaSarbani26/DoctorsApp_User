"use client";

import { Box, Typography } from "@mui/material";

export default function Cards() {
  return (
    <>
    
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: -40,
          p: 2,
          borderRadius: "16px",
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.2)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <Typography fontWeight={700}>1520+</Typography>
        <Typography fontSize={12}>Active Patients</Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: -40,
          p: 2,
          borderRadius: "16px",
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.2)",
        }}
      >
        <Typography fontSize={12}>✔ Expert Doctors</Typography>
        <Typography fontSize={12}>✔ 24/7 Support</Typography>
      </Box>
    </>
  );
}