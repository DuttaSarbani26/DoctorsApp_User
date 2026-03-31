"use client";

import { Container } from "@mui/material";

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
      <Container>
        <HeroSection />
        <AboutUsSection />
      </Container>
      <DoctorList />
      <NearbyDiagnostics />
        <Footer />
    </>
  );
}