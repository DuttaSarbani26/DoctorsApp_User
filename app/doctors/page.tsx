
"use client";

import { Container } from "@mui/material";
import Navbar from "@/component/navbar/navbar";
import Footer from "@/component/footer/footer";
import DoctorListPage from "@/component/doctor/doctorList";

export default function DoctorsPage() {
  return (
    <>
      <Container>
        <Navbar />
      </Container>
      <DoctorListPage />
      <Container>
        <Footer />
      </Container>
    </>
  );
}