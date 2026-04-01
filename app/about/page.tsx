"use client";

import { Container, Box } from "@mui/material";
import Navbar from "@/component/navbar/navbar";
import AboutUsSection from "@/component/aboutUsSection/aboutUsSection";
import Footer from "@/component/footer/footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 8 } }}>
        <AboutUsSection />
      </Container>
      <Footer />
    </>
  );
}
