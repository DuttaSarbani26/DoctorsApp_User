import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      sx={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        background:
          mode === "light"
            ? "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)"
            : theme.palette.background.paper,
        color: theme.palette.text.primary,
        mt: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid
          container
          rowSpacing={6}
          columnSpacing={{ xs: 6, md: 14 }}
          justifyContent="space-between"
        >
          <Grid xs={12} md={4}>
            <Typography
              variant="h2"
              fontWeight={700}
              gutterBottom
              sx={{
                fontSize: "1.4rem",
                color: mode === "light" ? "#1e293b" : "#e2e8f0",
              }}
            >
              Soulbless General Hospital Ltd.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: mode === "light" ? "#475569" : "#cbd5f5",
              }}
            >
              <strong>Registered Address</strong>
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: mode === "light" ? "#475569" : "#cbd5f5" }}
            >
              8/5, Alipore Road, Kolkata – 700 027
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: mode === "light" ? "#475569" : "#cbd5f5",
              }}
            >
              <strong>Phone :</strong>{" "}
              <span style={{ color: "#ef4444" }}>033 4033 7000</span> (24x7)
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: mode === "light" ? "#475569" : "#cbd5f5" }}
            >
              <strong>Email :</strong> enquiry@soulblesshospital.in
            </Typography>

            <Box sx={{ mt: 3 }}>
              {[FacebookIcon, InstagramIcon, YouTubeIcon, LinkedInIcon].map(
                (Icon, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      color: mode === "light" ? "#64748b" : "#cbd5f5",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#6366f1",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                ),
              )}
            </Box>
          </Grid>

          <Grid xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              sx={{
                fontSize: "1.3rem",
                color: mode === "light" ? "#1e293b" : "#e2e8f0",
              }}
            >
              Helpline Numbers
            </Typography>

            {[
              ["Emergency No", "033 40659801"],
              [
                "Doctor Appointments",
                "033 40256332 - 33 / +91 7606675554 - 55",
              ],
              ["24 x 7 Helpline No", "033 90337000 / 033 35803600"],
              ["Home Care No", "+91 7596350880"],
            ].map(([label, value]) => (
              <Typography
                key={label}
                variant="body2"
                sx={{
                  mb: 1,
                  color: mode === "light" ? "#475569" : "#cbd5f5",
                }}
              >
                {label} : <span style={{ color: "#ef4444" }}>{value}</span>
              </Typography>
            ))}
          </Grid>

          <Grid xs={12} md={3}>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              sx={{
                fontSize: "1.3rem",
                color: mode === "light" ? "#1e293b" : "#e2e8f0",
              }}
            >
              Quick Links
            </Typography>

            {[
              "Find a Doctor",
              "International Patient",
              "Centers of Excellence",
              "Health Packages",
              "Events",
              "Enquiry",
              "Newsletter",
              "Disclaimer",
            ].map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{
                  mb: 0.8,
                }}
              >
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    color: mode === "light" ? "#475569" : "#cbd5f5",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      color: "#6366f1",
                      pl: 0.5,
                    },
                  }}
                >
                  {item}
                </Link>
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          background:
            "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #22c55e 100%)",
          color: "#fff",
          textAlign: "center",
          py: 2.5,
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Copyright ©2026 Soulbless General Hospital Ltd. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
