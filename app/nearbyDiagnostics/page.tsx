"use client";

import Footer from "@/component/footer/footer";
import Navbar from "@/component/navbar/navbar";
import NearbyDiagnostics from "@/component/nearbyDiagnostics/nearbyDiagnostics";
import { Box } from "@mui/material";

export default function NearbyDiagnosticsPage() {
    return (
    <>
      <Navbar />
      <NearbyDiagnostics />
      <Footer />
    </>
  );
}