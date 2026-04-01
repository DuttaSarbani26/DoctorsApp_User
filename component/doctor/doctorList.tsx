"use client";

import { useRef, useState, useMemo } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  useTheme,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DoctorCard from "../cards/doctorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { useDoctorsQuery } from "@/customHooks/query/doctor.query.hooks";

export default function DoctorsList() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const prevRef = useRef<any>(null);
  const nextRef = useRef<any>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [showAllDepartments, setShowAllDepartments] = useState(false);

  const { data, isLoading } = useDoctorsQuery(searchTerm);

  const getDepartmentName = (doctor: any): string => {
    if (!doctor) return "";
    if (typeof doctor.department === "string") return doctor.department;
    if (doctor.department?.name) return doctor.department.name;
    if (doctor.department?.department_name)
      return doctor.department.department_name;
    return doctor.specialization ?? "";
  };

  const departments = useMemo(() => {
    if (!data?.data) return [];
    const deptSet = new Set<string>();
    data.data.forEach((doctor: any) => {
      const deptName = getDepartmentName(doctor).trim();
      if (deptName) {
        deptSet.add(deptName);
      }
    });
    return Array.from(deptSet).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filteredDoctors = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((doctor: any) => {
      const deptName = getDepartmentName(doctor).toLowerCase();
      const matchesSearch =
        !searchTerm ||
        doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deptName.includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(getDepartmentName(doctor));

      return matchesSearch && matchesDepartment;
    });
  }, [data, searchTerm, selectedDepartments]);

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department],
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartments([]);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        py: { xs: 6, md: 10 },
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: "28px", md: "42px" },
            }}
          >
            Meet Our Expert Doctors
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "16px" }}
          >
            Browse our team of experienced healthcare professionals
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 6,
            p: { xs: 2, md: 4 },
            borderRadius: "20px",
            background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow:
              mode === "dark"
                ? "0 8px 30px rgba(0,0,0,0.5)"
                : "0 8px 30px rgba(0,0,0,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={3}
            gap={2}
            flexWrap="wrap"
          >
            <Typography
              variant="h6"
              fontWeight={600}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ fontSize: { xs: "14px", md: "16px" } }}
            >
              <FontAwesomeIcon icon={faFilter} />
              Filter Doctors
            </Typography>

            {(searchTerm || selectedDepartments.length > 0) && (
              <Chip
                label="Clear All"
                onClick={clearFilters}
                size="small"
                color="secondary"
                variant="outlined"
                sx={{ cursor: "pointer" }}
              />
            )}
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search doctor or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                background: theme.palette.background.paper,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
                "&.Mui-focused": {
                  boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ color: theme.palette.text.secondary, fontSize: "14px" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {(searchTerm || selectedDepartments.length > 0) && (
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: { xs: "12px", md: "14px" } }}>
                Active Filters
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {searchTerm && (
                  <Chip
                    label={`"${searchTerm}"`}
                    size="small"
                    onDelete={() => setSearchTerm("")}
                    color="primary"
                  />
                )}
                {selectedDepartments.map((dept) => (
                  <Chip
                    key={dept}
                    label={dept}
                    size="small"
                    onDelete={() => handleDepartmentChange(dept)}
                    color="secondary"
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box mt={2}>
            <Typography
              variant="body2"
              fontWeight={500}
              mb={1.5}
              color="text.secondary"
              sx={{ fontSize: { xs: "12px", md: "14px" } }}
            >
              Browse by Department
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={1}>
              {(showAllDepartments
                ? departments
                : departments.slice(0, 8)
              ).map((dept) => {
                const selected = selectedDepartments.includes(dept);
                return (
                  <Chip
                    key={dept}
                    label={dept}
                    onClick={() => handleDepartmentChange(dept)}
                    clickable
                    size="small"
                    sx={{
                      px: 1,
                      fontSize: { xs: "11px", md: "13px" },
                      borderRadius: "999px",
                      fontWeight: 500,
                      background: selected
                        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                        : theme.palette.background.paper,
                      color: selected
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.primary,
                      border: selected
                        ? "none"
                        : `1px solid ${theme.palette.divider}`,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                        background: selected
                          ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                          : theme.palette.action.hover,
                      },
                    }}
                  />
                );
              })}
            </Box>

            {departments.length > 8 && (
              <Box mt={2} textAlign="center">
                <Chip
                  label={showAllDepartments ? "View Less" : "View More"}
                  onClick={() => setShowAllDepartments((prev) => !prev)}
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{
                    cursor: "pointer",
                    fontWeight: 500,
                    borderRadius: "999px",
                    px: 2,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>

        <Box mb={4} textAlign="center">
          <Typography variant="h6" color="text.secondary">
            {isLoading
              ? "Searching doctors..."
              : `${filteredDoctors.length} Doctor${filteredDoctors.length !== 1 ? "s" : ""} Found`}
          </Typography>
        </Box>

        {isLoading ? (
          <Box textAlign="center" py={8}>
            <CircularProgress />
          </Box>
        ) : filteredDoctors.length > 0 ? (
          <Box position="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1.2}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              onBeforeInit={(swiper) => {
                if (
                  swiper.params.navigation &&
                  typeof swiper.params.navigation !== "boolean"
                ) {
                  (swiper.params.navigation as any).prevEl = prevRef.current;
                  (swiper.params.navigation as any).nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }}
            >
              {filteredDoctors.map((doctor: any) => (
                <SwiperSlide key={doctor._id}>
                  <DoctorCard doctor={doctor} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Box
              ref={prevRef}
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  borderColor: theme.palette.primary.main,
                },
                ml: -2,
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ fontSize: "18px" }}
              />
            </Box>

            <Box
              ref={nextRef}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  borderColor: theme.palette.primary.main,
                },
                mr: -2,
              }}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ fontSize: "18px" }}
              />
            </Box>
          </Box>
        ) : (
          <Box textAlign="center" py={8}>
            <Typography color="text.secondary" variant="h5">
              No doctors found matching your criteria.
            </Typography>
            <Typography color="text.secondary" variant="body1" mt={1}>
              Try adjusting your search or filters.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
