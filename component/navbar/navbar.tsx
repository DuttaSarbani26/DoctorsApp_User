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
import MenuIcon from "@mui/icons-material/Menu";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <Box
          sx={{
            width: "100%",
            background: "#020617",
            color: "#648aba",
            fontSize: { xs: "9px", sm: "11px" },
            py: { xs: 1, sm: 1.5 },
            px: { xs: 2, sm: 5 },
            display: { xs: "none", sm: "block" },
          }}
        >
          <Box
            sx={{
              maxWidth: "1600px",
              mx: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: { xs: 1, md: 4 },
              flexWrap: "wrap",
            }}
          >
            <Box display="flex" gap={{ xs: 1, md: 4 }} fontSize={{ xs: "9px", md: "11px" }}>
              <Typography sx={{ display: { xs: "none", md: "block" } }}>🚑 Emergency: (002) 01061245741</Typography>
              <Typography sx={{ display: { xs: "none", sm: "block" } }}>📍 Kolkata</Typography>
              <Typography sx={{ display: { xs: "none", md: "block" } }}>🕒 Mon-Fri: 8:00-7:00 pm</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <IconButton size="small" sx={{ color: "#791a1a", p: 0.5 }}>
                <i className="fab fa-facebook-f" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#fff", p: 0.5 }}>
                <i className="fab fa-twitter" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#fff", p: 0.5 }}>
                <i className="fab fa-youtube" />
              </IconButton>
            </Box>
          </Box>
        </Box>

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
              px: { xs: 2, sm: 3, md: 5 },
              py: { xs: 1.5, md: 2 },
              display: "flex",
              justifyContent: "space-between",
              gap: { xs: 2, md: 20 },
            }}
          >
            <Box display="flex" alignItems="center" gap={{ xs: 1.5, md: 3 }}>
              <Image
                src="/flower-icon.png"
                alt="Logo"
                width={56}
                height={56}
                style={{ borderRadius: "12px", width: "40px", height: "40px" }}
              />

              <Box>
                <Typography fontWeight={900} fontSize={{ xs: "14px", md: "22px" }} color="#0f172a">
                  Soulbless
                </Typography>
                <Typography fontSize={{ xs: "10px", md: "13px" }} fontWeight={600} color="#1d3455">
                  GENERAL HOSPITAL
                </Typography>
              </Box>
            </Box>

            <Box display={{ xs: "none", md: "flex" }} gap={6} alignItems="center" flex={1} justifyContent="center">
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

            <Box display="flex" alignItems="center" gap={{ xs: 1, md: 4 }}>
              {!isLoggedIn ? (
                <Button
                  variant="contained"
                  onClick={() => setOpenRegister(true)}
                  sx={{
                    borderRadius: "12px",
                    px: { xs: 2, md: 5 },
                    py: { xs: 1, md: 1.4 },
                    fontSize: { xs: "12px", md: "17px" },
                    fontWeight: 700,
                    textTransform: "none",
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: "0 6px 18px rgba(30, 64, 175, 0.35)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Create account
                </Button>
              ) : (
                <>
                  <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0.5 }}>
                    <Avatar
                      sx={{
                        width: { xs: 36, md: 44 },
                        height: { xs: 36, md: 44 },
                        background: "linear-gradient(135deg, #6366f1, #22c55e)",
                        fontSize: { xs: "14px", md: "18px" },
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

              <IconButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                sx={{ display: { xs: "flex", md: "none" }, p: 0.5 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>

          {mobileMenuOpen && (
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                px: 2,
                py: 2,
                background: theme.palette.background.paper,
                borderTop: "1px solid #334155",
                gap: 1,
              }}
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                      padding: "10px 8px",
                      borderRadius: "8px",
                      background: isActive ? theme.palette.action.hover : "transparent",
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </Box>
          )}
        </AppBar>
      </Box>

      <Box sx={{ height: { xs: 140, sm: 160 } }} />

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
