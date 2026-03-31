"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Alert,
  Stack,
  Chip,
  Divider,
  Pagination,
  Skeleton,
  Paper,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import useUserHistory from "@/customHooks/query/history.query.hooks";

interface Props {
  open: boolean;
  handleClose: () => void;
  userId: string;
}

const ITEMS_PER_PAGE = 6;

export default function AppointmentHistoryModal({ open, handleClose }: Props) {
  const { data, isLoading, isError, error } = useUserHistory();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const payload = data?.data ?? data;
  const history = Array.isArray(payload) ? payload : (payload?.data ?? []);

  const getStatusType = (status: string) => {
    const st = (status || "").toLowerCase();

    if (
      st.includes("reject") ||
      st.includes("cancel") ||
      st.includes("declin")
    ) {
      return "cancelled";
    }

    if (
      st.includes("pending") ||
      st.includes("confirm") ||
      st.includes("accept")
    ) {
      return "upcoming";
    }

    return "other";
  };

  const filteredData = history.filter((item: any) => {
    const type = getStatusType(item.status);

    if (filter === "upcoming") return type === "upcoming";
    if (filter === "cancelled") return type === "cancelled";

    return true;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const getCount = (type: string) => {
    return history.filter((item: any) => {
      return type === "all" ? true : getStatusType(item.status) === type;
    }).length;
  };

  const filters = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Cancelled", value: "cancelled" },
  ];

  if (isLoading) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Stack spacing={2}>
            {Array.from(new Array(6)).map((_, i) => (
              <Paper key={i} sx={{ p: 3, borderRadius: 3 }}>
                <Skeleton height={20} width="40%" />
                <Skeleton height={16} width="60%" sx={{ mt: 1 }} />
                <Skeleton height={16} width="80%" sx={{ mt: 1 }} />
              </Paper>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }

  if (isError) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Alert severity="error">
            {(error as any)?.message || "Failed to load history."}
          </Alert>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5,
          backdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.8)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Appointment History
        </Typography>

        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        {/* FILTER */}
        <Stack direction="row" spacing={1} mb={3}>
          {filters.map((item) => {
            const active = filter === item.value;
            const count = getCount(item.value);

            return (
              <Box
                key={item.value}
                onClick={() => {
                  setFilter(item.value);
                  setPage(1);
                }}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  transition: "0.25s",
                  bgcolor: active ? "#0d6e8a" : "#f1f5f9",
                  color: active ? "#fff" : "#334155",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    bgcolor: active ? "#0d6e8a" : "#e2e8f0",
                  },
                }}
              >
                {item.label}
                <Box
                  sx={{
                    px: 1,
                    borderRadius: 2,
                    fontSize: 11,
                    bgcolor: active ? "rgba(255,255,255,0.2)" : "#e2e8f0",
                  }}
                >
                  {count}
                </Box>
              </Box>
            );
          })}
        </Stack>

        {/* EMPTY */}
        {filteredData.length === 0 && (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              background: "#f8fafc",
            }}
          >
            <Typography fontWeight={600}>No appointments found</Typography>
            <Typography fontSize={14} color="#64748b">
              Try switching filters
            </Typography>
          </Paper>
        )}

        {/* LIST */}
        <Stack spacing={2}>
          {paginatedData.map((item: any) => {
            const doctor = item?.doctorId || {};
            const type = getStatusType(item.status);

            let chipColor: any = "default";
            if (type === "upcoming") chipColor = "success";
            if (type === "cancelled") chipColor = "error";

            return (
              <Paper
                key={item._id}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={600}>
                      {doctor.name || "Unknown Doctor"}
                    </Typography>

                    <Chip
                      label={item.status || "-"}
                      color={chipColor}
                      size="small"
                    />
                  </Stack>

                  <Typography fontSize={13} color="#475569">
                    {item.date} • {item.time}
                  </Typography>

                  <Typography fontSize={13} color="#64748b">
                    📍 {item?.address || "No address"}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography fontWeight={700} color="#0d6e8a">
                    ₹{doctor.fees ?? "-"}
                  </Typography>
                </Stack>
              </Paper>
            );
          })}
        </Stack>

        {/* PAGINATION */}
        {filteredData.length > ITEMS_PER_PAGE && (
          <Stack alignItems="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              shape="rounded"
            />
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
