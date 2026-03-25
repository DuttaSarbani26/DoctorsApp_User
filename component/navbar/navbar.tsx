"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
} from "@mui/material";

import Register from "../auth/register-modal";
import OtpModal from "../auth/otp-modal";
import LoginModal from "../auth/login-modal";
import useUserStore from "@/zusStand/store";
import { Cookies } from "react-cookie";
import { AxiosInstance } from "@/api/axios/axios";
import ResetPasswordModal from "../auth/resetPasswordModal";
import { endPoints } from "@/api/endPoints/endPoints";
import AppointmentHistoryModal from "../profile/history/appointmentHistoryModal";
import ProfileDetailsModal from "../profile/profileDetails/profileDetailsModal";

export default function Navbar() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openAppointmentHistory, setOpenAppointmentHistory] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [openProfile, setOpenProfile] = useState(false);

  const { logout } = useUserStore();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const profileMenuOpen = Boolean(anchorEl);

  const checkAuthStatus = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    setIsLoggedIn(!!token && loggedIn === "true");

    if (userData && token) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    const handleStorageChange = () => checkAuthStatus();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [openLogin, openRegister, openForgot]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await AxiosInstance.post(endPoints.user.logOut);
    } catch (error) {}

    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
    cookies.remove("token");
    cookies.remove("refreshToken");

    logout();

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setUser(null);
    setIsLoggedIn(false);
    setAnchorEl(null);

    window.dispatchEvent(new Event("storage"));
    window.location.href = "/";
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About US", href: "/about" },
    { name: "All Doctors", href: "/doctors" },
    { name: "Diagnostics", href: "/nearbyDiagnostics" },
  ];

  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <>
      <Box position="fixed" top={0} left={0} width="100%" zIndex={1100}>
        {/* TOP BAR */}
        <Box
          sx={{
            width: "100%",
            background: "#020617",
            color: "#648aba",
            fontSize: "11px",
          }}
        >
          <Box
            sx={{
              maxWidth: "1600px",
              mx: "auto",
              px: 5,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display="flex" gap={4}>
              <Typography>🚑 Emergency Line: (002) 01061245741</Typography>
              <Typography>📍 Location: Kolkata, India</Typography>
              <Typography>🕒 Mon - Fri: 8:00 am - 7:00 pm</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1.5}>
              <IconButton size="small" sx={{ color: "#791a1a" }}>
                <i className="fab fa-facebook-f" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#fff" }}>
                <i className="fab fa-twitter" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#fff" }}>
                <i className="fab fa-youtube" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* NAVBAR */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: "transparent",
            boxShadow: "none",
            borderBottom: "1px solid #334155",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              maxWidth: "1600px",
              width: "100%",
              mx: "auto",
              px: 5,
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            {/* LOGO */}
            <Box display="flex" alignItems="center" gap={3}>
              <Image
                src="/flower-icon.png"
                alt="Logo"
                width={56}
                height={56}
                style={{ borderRadius: "12px" }}
              />

              <Box>
                <Typography fontWeight={900} fontSize="22px" color="#0f172a">
                  Soulbless
                </Typography>
                <Typography fontSize="13px" fontWeight={600} color="#1d3455">
                  GENERAL HOSPITAL
                </Typography>
              </Box>
            </Box>

            {/* NAV ITEMS */}
            <Box display="flex" gap={6} alignItems="center">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{
                      textDecoration: "none",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                      position: "relative",
                    }}
                  >
                    {item.name}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-8px",
                          left: 0,
                          right: 0,
                          height: "3px",
                          background:
                            "linear-gradient(90deg, #6366f1, #22c55e)",
                          borderRadius: "2px",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </Box>

            {/* RIGHT */}
            <Box display="flex" alignItems="center" gap={4}>
              {!isLoggedIn ? (
                <Button
                  variant="contained"
                  onClick={() => setOpenRegister(true)}
                  sx={{
                    borderRadius: "12px",
                    px: 5,
                    py: 1.4,
                    fontSize: "17px",
                    fontWeight: 700,
                    textTransform: "none",
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: "0 6px 18px rgba(30, 64, 175, 0.35)",
                  }}
                >
                  Create account
                </Button>
              ) : (
                <>
                  <IconButton onClick={handleProfileMenuOpen}>
                    <Avatar
                      sx={{
                        width: 44,
                        height: 44,
                        background: "linear-gradient(135deg, #6366f1, #22c55e)",
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                    >
                      {user?.email?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={profileMenuOpen}
                    onClose={handleProfileMenuClose}
                  >
                    <MenuItem onClick={() => setOpenProfile(true)}>
                      👤 My Profile
                    </MenuItem>
                    <MenuItem onClick={() => setOpenAppointmentHistory(true)}>
                      📅 My Appointments
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: "#ef4444" }}>
                      🚪 Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* OFFSET */}
      <Box sx={{ height: 140 }} />

      {/* MODALS */}
      <Register
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        onSuccess={(id) => {
          setUserId(id);
          setOpenRegister(false);
          setOpenOtp(true);
        }}
        onSwitchToLogin={() => {
          setOpenRegister(false);
          setOpenLogin(true);
        }}
      />
      <OtpModal
        open={openOtp}
        onClose={() => setOpenOtp(false)}
        userId={userId}
        onSuccess={() => {
          setOpenOtp(false);
          setOpenLogin(true);
        }}
      />
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        setOpenForgot={setOpenForgot}
      />
      <AppointmentHistoryModal
        open={openAppointmentHistory}
        handleClose={() => setOpenAppointmentHistory(false)}
        userId={user?._id || ""}
      />
      <ProfileDetailsModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />
      <ResetPasswordModal
        open={openForgot}
        handleClose={() => setOpenForgot(false)}
      />
    </>
  );
}
