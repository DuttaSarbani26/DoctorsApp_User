"use client";

import React from "react";
import { Box, Typography, Container, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
// import { useThemeMode } from "@/providers/themeProvider";

export default function AboutUsSection() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        py: { xs: 8, md: 10 },
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg">
        {/* 🔹 TOP SECTION (TEXT + IMAGE like Hero) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 6, md: 10 },
          }}
        >
          {/* TEXT */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            sx={{ maxWidth: 520 }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.3rem", md: "3rem" },
                mb: 2,
                lineHeight: 1.2,
                background: "linear-gradient(90deg,#6366f1,#22c55e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              About Our Hospital
            </Typography>

            <Typography
              sx={{
                color: mode === "light" ? "#64748b" : "#94a3b8",
                fontSize: { xs: "15px", md: "17px" },
                lineHeight: 1.8,
              }}
            >
              Soulbless General Hospital Ltd. is a trusted healthcare
              institution in Kolkata, dedicated to delivering advanced medical
              care with compassion. We combine modern technology with
              experienced doctors to ensure the best outcomes for every patient.
            </Typography>
            <Typography
              sx={{
                color: mode === "light" ? "#64748b" : "#94a3b8",
                fontSize: { xs: "15px", md: "17px" },
                lineHeight: 1.8,
              }}
            >
              Our mission is to provide accessible, safe, and high-quality
              healthcare services while maintaining a patient-first approach at
              every step of the journey.
            </Typography>
          </Box>

          {/* IMAGE (YOUR IMAGE HERE) */}
          <Box
            component={motion.img}
            src="/aboutUs.jpg" // 👉 put image in public folder
            alt="hospital"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            sx={{
              width: { xs: "100%", md: 500 },
              borderRadius: "20px",
              objectFit: "cover",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            }}
          />
        </Box>

        {/* 🔥 CARDS IN SINGLE LINE (LIKE HERO STYLE) */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          mt={8}
          justifyContent="space-between"
        >
          {[
            { value: "50+", label: "Expert Doctors" },
            { value: "10k+", label: "Happy Patients" },
            { value: "24/7", label: "Emergency Care" },
            { value: "15+", label: "Departments" },
          ].map((item, i) => (
            <Box
              key={i}
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: "16px",
                textAlign: "center",

                backdropFilter: "blur(10px)",

                background:
                  mode === "light"
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(15,23,42,0.6)",

                border:
                  mode === "light"
                    ? "1px solid rgba(99,102,241,0.15)"
                    : "1px solid rgba(99,102,241,0.25)",

                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow:
                    mode === "light"
                      ? "0 10px 30px rgba(99,102,241,0.15)"
                      : "0 10px 30px rgba(0,0,0,0.5)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: 800,
                  background: "linear-gradient(90deg,#6366f1,#22c55e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.value}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: mode === "light" ? "#475569" : "#cbd5f5",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}





