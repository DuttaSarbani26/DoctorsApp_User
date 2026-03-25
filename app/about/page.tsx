"use client";

import { Container } from "@mui/material";
import Navbar from "@/component/navbar/navbar";
import AboutUsSection from "@/component/aboutUsSection/aboutUsSection";
import Footer from "@/component/footer/footer";

export default function AboutPage() {
  return (
    <>
      <Container>
        <Navbar />
        <AboutUsSection />
      </Container>
      <Footer />
    </>
  );
}
