"use client";

import { Container, Box } from "@mui/material";

import HeroSection from "@/component/heroSection/heroSection";
import Navbar from "@/component/navbar/navbar";
import Footer from "@/component/footer/footer";
import AboutUsSection from "@/component/aboutUsSection/aboutUsSection";
import DoctorList from "@/component/doctor/doctorList";
import NearbyDiagnostics from "@/component/nearbyDiagnostics/nearbyDiagnostics";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <AboutUsSection />
      </Container>
      <DoctorList />
      <NearbyDiagnostics />
        <Footer />
    </>
  );
}