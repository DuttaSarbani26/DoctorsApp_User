"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUserProfile } from "@/customHooks/query/profile.query.hooks";

interface ProfileDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileDetailsModal({
  open,
  onClose,
}: ProfileDetailsModalProps) {
  const { data, isLoading, isError } = useUserProfile();

  const user = data?.data || data;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: 1,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 700,
        }}
      >
        My Profile
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {isLoading ? (
          <Box textAlign="center" py={4}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error" textAlign="center">
            Failed to load profile
          </Typography>
        ) : (
          <Box textAlign="center">
            {/* Avatar */}
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                fontSize: 32,
                fontWeight: 700,
                background: "linear-gradient(135deg, #6366f1, #22c55e)",
              }}
            >
              {user?.first_name?.[0]?.toUpperCase() || "U"}
            </Avatar>

            {/* Name */}
            <Typography mt={2} fontSize="20px" fontWeight={700}>
              {user?.first_name} {user?.last_name}
            </Typography>

            {/* Email */}
            <Typography color="text.secondary" fontSize="14px">
              {user?.email}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Details */}
            <Box textAlign="left" px={1}>
              <Typography fontSize="14px" mb={1}>
                📍 <strong>Address:</strong> {user?.address || "N/A"}
              </Typography>

              <Typography fontSize="14px" mb={1}>
                🆔 <strong>User ID:</strong> {user?._id}
              </Typography>

              <Typography fontSize="14px">
                ✅ <strong>Status:</strong>{" "}
                {user?.is_verified ? "Verified" : "Not Verified"}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}