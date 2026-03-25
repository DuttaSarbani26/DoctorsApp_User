"use client";

import Footer from "@/component/footer/footer";
import Navbar from "@/component/navbar/navbar";
import NearbyDiagnostics from "@/component/nearbyDiagnostics/nearbyDiagnostics";
import { Container } from "@mui/material";

export default function NearbyDiagnosticsPage() {
    return (
    <>
      <Container>
        <Navbar />
      </Container>
      <NearbyDiagnostics />
      <Container>
        <Footer />
      </Container>
    </>
  );
}