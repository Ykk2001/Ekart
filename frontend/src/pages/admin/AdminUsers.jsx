import {
  InputAdornment,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Stack,
  Button,
  Chip,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/user/all-user",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data?.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filterUsers = users.filter((user) => {
    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.toLowerCase();
    const email = (user?.email || "").toLowerCase();
    const search = searchTerm.toLowerCase().trim();
    return fullName.includes(search) || email.includes(search);
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const searchInputAdornment = (
    <InputAdornment position="start">
      <SearchIcon sx={{ color: "text.disabled", fontSize: 24 }} />
    </InputAdornment>
  );

  return (
    <Box
      sx={{
        px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
        py: { xs: 4, md: 6 },
        maxWidth: "1500px",
        mx: "auto",
      }}
    >
      {/* Top Header & Search Bar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2.5,
          mb: 4.5,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.8 }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "text.primary",
              }}
            >
              User Management
            </Typography>
            <Chip
              label={`${users.length} Users`}
              size="medium"
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                bgcolor: "grey.100",
                color: "text.secondary",
                border: "1px solid",
                borderColor: "grey.200",
                py: 0.5,
              }}
            />
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.05rem" }}>
            View, search, and manage registered user accounts
          </Typography>
        </Box>

        {/* Search Input */}
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          InputProps={{
            startAdornment: searchInputAdornment,
          }}
          slotProps={{
            input: {
              startAdornment: searchInputAdornment,
            },
          }}
          sx={{
            width: { xs: "100%", sm: 360 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              backgroundColor: "#fff",
              fontSize: "1rem",
              height: 48,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              transition: "all 0.2s ease-in-out",
              "& fieldset": {
                borderColor: "grey.300",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.15)",
              },
            },
          }}
        />
      </Box>

      {/* Grid of Users */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3.5,
        }}
      >
        {filterUsers.map((user, index) => {
          const fullName =
            `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Anonymous User";

          return (
            <Fade in key={user?._id || index} timeout={300}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor: "grey.200",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 14px 28px -10px rgba(0, 0, 0, 0.09)",
                    borderColor: "primary.light",
                  },
                }}
              >
                <CardContent sx={{ p: 3.5, "&:last-child": { pb: 3.5 } }}>
                  {/* User Details */}
                  <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 3 }}>
                    <Avatar
                      src={user?.profilePic}
                      alt={fullName}
                      sx={{
                        width: 68,
                        height: 68,
                        bgcolor: "primary.main",
                        color: "#fff",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        border: "3px solid #fff",
                        boxShadow: "0 4px 14px rgba(25, 118, 210, 0.25)",
                      }}
                    >
                      {user?.firstName?.[0]?.toUpperCase() || <PersonOutlineRoundedIcon sx={{ fontSize: 32 }} />}
                    </Avatar>

                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1.2rem",
                          lineHeight: 1.3,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          color: "text.primary",
                        }}
                      >
                        {fullName}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          fontSize: "0.95rem",
                          mt: 0.5,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user?.email || "No email available"}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Actions */}
                  <Stack direction="row" spacing={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<EditRoundedIcon sx={{ fontSize: 20 }} />}
                      onClick={() => navigate(`/dashboard/users/${user?._id}`)}
                      sx={{
                        py: 1.2,
                        fontSize: "0.95rem",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "grey.300",
                        color: "text.primary",
                        "&:hover": {
                          borderColor: "grey.500",
                          backgroundColor: "grey.50",
                        },
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      fullWidth
                      disableElevation
                      variant="contained"
                      startIcon={<VisibilityRoundedIcon sx={{ fontSize: 20 }} />}
                      onClick={() => navigate(`/dashboard/users/orders/${user?._id}`)}
                      sx={{
                        py: 1.2,
                        fontSize: "0.95rem",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Orders
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Fade>
          );
        })}
      </Box>

      {/* Empty State */}
      {filterUsers.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 12,
            px: 2,
            borderRadius: 4,
            border: "1px dashed",
            borderColor: "grey.300",
            mt: 2,
          }}
        >
          <SearchIcon sx={{ fontSize: 56, color: "text.disabled", mb: 2 }} />
          <Typography variant="h5" fontWeight={600} color="text.primary">
            No users found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.8 }}>
            No accounts match "{searchTerm}". Try a different keyword.
          </Typography>
        </Box>
      )}
    </Box>
  );
}