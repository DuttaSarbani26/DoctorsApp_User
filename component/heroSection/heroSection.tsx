"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

export default function HeroSection() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        marginLeft: "calc(-50vw + 50%)",
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: "flex",
        minHeight: "100vh",
        alignItems: "flex-start",
        pt: { xs: 6, md: 25 },
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1600px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 12, md: 20 },
          px: { xs: 3, md: 8 },
          zIndex: 2,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          sx={{ maxWidth: 540 }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              lineHeight: 1.15,
              mb: 4,
              fontSize: { xs: "2.4rem", md: "4.5rem" },
              letterSpacing: "-0.5px",

              background: "linear-gradient(90deg,#6366f1,#22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Book Appointment <br /> With Trusted Doctors
          </Typography>

          <Typography
            sx={{
              color: theme.palette.text.secondary,
              mb: 5,
              fontSize: { xs: "15px", md: "18px" },
              lineHeight: 1.6,
              maxWidth: 480,
            }}
          >
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </Typography>

          
        </Box>
        
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          sx={{ position: "relative" }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
            alt="doctor"
            sx={{
              width: { xs: "100%", md: 780 },
              borderRadius: "28px",
              objectFit: "cover",
              boxShadow:
                mode === "light"
                  ? "0 25px 60px rgba(0,0,0,0.15)"
                  : "0 25px 60px rgba(0,0,0,0.6)",
            }}
          />

      
          <Avatar
            src="https://i.pravatar.cc/100?img=1"
            sx={{
              position: "absolute",
              top: 30,
              left: -30,
              width: 60,
              height: 60,
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              border:
                mode === "light" ? "3px solid white" : "3px solid #1e293b",
            }}
          />
          <Avatar
            src="https://i.pravatar.cc/100?img=2"
            sx={{
              position: "absolute",
              bottom: 30,
              right: -30,
              width: 60,
              height: 60,
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              border:
                mode === "light" ? "3px solid white" : "3px solid #1e293b",
            }}
          />
        </Box>
      </Box>

  
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25), transparent)",
          filter: "blur(120px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -120,
          left: -120,
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(34,197,94,0.2), transparent)",
          filter: "blur(120px)",
        }}
      />
    </Box>
  );
}
