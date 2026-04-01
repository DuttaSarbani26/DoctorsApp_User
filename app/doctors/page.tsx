
"use client";

import { Container, Box } from "@mui/material";
import Navbar from "@/component/navbar/navbar";
import Footer from "@/component/footer/footer";
import DoctorListPage from "@/component/doctor/doctorList";

export default function DoctorsPage() {
  return (
    <>
      <Navbar />
      <DoctorListPage />
      <Footer />
    </>
  );
}