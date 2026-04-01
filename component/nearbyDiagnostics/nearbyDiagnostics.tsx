"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  TextField,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import { getNearbyDiagnostics } from "@/api/functions/areaMap.api";
import L from "leaflet";


const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});


const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

type Coords = {
  lat: number;
  lng: number;
};

export default function NearbyDiagnostics() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [distance, setDistance] = useState(5000);
  const [search, setSearch] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  const handleSearch = async () => {
    if (!search) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${search}`,
    );
    const data = await res.json();

    if (data.length > 0) {
      setCoords({
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      });
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["nearbyDiagnostics", coords, distance],
    queryFn: () =>
      getNearbyDiagnostics({
        lat: coords!.lat,
        lng: coords!.lng,
        distance,
      }),
    enabled: !!coords,
  });

  const centers = data?.data || [];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, background: "#f8fafc", minHeight: "100vh" }}>
      {/* 🔷 HEADER */}
      <Typography variant="h5" textAlign="center" mb={2} fontWeight="bold" sx={{ fontSize: { xs: "18px", md: "24px" } }}>
        Nearby Diagnostics Centers
      </Typography>

      {/* 🔍 SEARCH */}
      <Box display="flex" justifyContent="center" gap={1} mb={2} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Enter location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", sm: 250, md: 300 }, minWidth: "200px" }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ whiteSpace: "nowrap" }}>
          Search
        </Button>
      </Box>

      {/* 📏 DISTANCE */}
      <Box display="flex" justifyContent="center" gap={1} mb={3} flexWrap="wrap">
        {[5000, 10000, 20000].map((d) => (
          <Button
            key={d}
            variant={distance === d ? "contained" : "outlined"}
            onClick={() => setDistance(d)}
            sx={{ borderRadius: 5, fontSize: { xs: "12px", md: "14px" } }}
          >
            {d / 1000} KM
          </Button>
        ))}
      </Box>

      {isLoading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}

      {coords && (
        <Box
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} sx={{ minHeight: { xs: "auto", md: "520px" } }}>
          
            <Box sx={{ flex: 2, width: { xs: "100%", md: "auto" } }}>
              <Box sx={{ height: { xs: "300px", md: "520px" }, width: "100%" }}>
                <MapContainer
                  center={[coords.lat, coords.lng]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  {centers.map((c: any) => (
                    <Marker
                      key={c._id}
                      position={[
                        c.location.coordinates[1],
                        c.location.coordinates[0],
                      ]}
                      icon={redIcon}
                    >
                      <Popup>
                        <b>{c.name}</b>
                        <br />
                        {(c.distance / 1000).toFixed(2)} km away
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </Box>
            </Box>

           
            <Box
              sx={{
                flex: 1,
                maxHeight: { xs: "300px", md: "520px" },
                overflowY: "auto",
                p: { xs: 1.5, md: 2 },
                background: "#f8fafc",
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Stack spacing={{ xs: 1.5, md: 2 }}>
                {centers.map((center: any) => (
                  <Card
                    key={center._id}
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      transition: "0.2s",
                      "&:hover": {
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                      <Typography fontWeight="bold" fontSize={{ xs: "13px", md: "15px" }}>{center.name}</Typography>

                      <Typography variant="caption" color="green" sx={{ fontSize: { xs: "11px", md: "12px" } }}>
                        {(center.distance / 1000).toFixed(2)} km
                      </Typography>

                      <Divider sx={{ my: 1 }} />

                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<DirectionsIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                        }}
                        onClick={() => {
                          const lat = center.location.coordinates[1];
                          const lng = center.location.coordinates[0];
                          window.open(
                            `https://www.google.com/maps?q=${lat},${lng}`,
                          );
                        }}
                      >
                        Directions
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
