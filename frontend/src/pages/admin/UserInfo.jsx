import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Avatar,
  Stack,
  Divider,
  CircularProgress,
  IconButton,
} from "@mui/material";

import {
  ArrowBack,
  CloudUpload,
  Person,
  Save,
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  BadgeOutlined,
} from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../redux/userSlice";
import axios from "axios";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const userId = params.id || params.userId;

  const [updateUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    zipCode: "",
    role: "user",
    profilePic: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Handle input changes
  // -----------------------------
  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------
  // Handle profile image
  // -----------------------------
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // -----------------------------
  // Fetch user details
  // -----------------------------
  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/get-user/${userId}`,
      );

      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("MESSAGE:", error.message);

      toast.error("Failed to load user details");
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  // -----------------------------
  // Submit updated user
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();

      formData.append("firstName", updateUser?.firstName || "");
      formData.append("lastName", updateUser?.lastName || "");
      formData.append("email", updateUser?.email || "");
      formData.append("phoneNo", updateUser?.phoneNo || "");
      formData.append("address", updateUser?.address || "");
      formData.append("city", updateUser?.city || "");
      formData.append("zipCode", updateUser?.zipCode || "");
      formData.append("role", updateUser?.role || "user");

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `http://localhost:5000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message || "Profile updated successfully!");

        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 3, md: 5 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1050,
          mx: "auto",
        }}
      >
        {/* ================= BACK BUTTON ================= */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 2.5,
            color: "#475569",
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: 2,
            px: 1.5,

            "&:hover": {
              backgroundColor: "#e2e8f0",
            },
          }}
        >
          Back to Users
        </Button>

        {/* ================= MAIN CARD ================= */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            backgroundColor: "#fff",
            boxShadow: "0 10px 40px rgba(15, 23, 42, 0.06)",
          }}
        >
          {/* ================= HEADER ================= */}
          <Box
            sx={{
              position: "relative",
              px: { xs: 3, md: 5 },
              py: { xs: 3.5, md: 4 },
              background: "linear-gradient(135deg, #111827 0%, #334155 100%)",
              color: "#fff",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                right: -80,
                top: -100,
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Person sx={{ fontSize: 30 }} />
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    fontSize: {
                      xs: "1.4rem",
                      md: "1.65rem",
                    },
                  }}
                >
                  Update User Profile
                </Typography>

                <Typography
                  sx={{
                    mt: 0.7,
                    color: "rgba(255,255,255,0.72)",
                    fontSize: {
                      xs: "0.95rem",
                      md: "1rem",
                    },
                    lineHeight: 1.5,
                  }}
                >
                  Manage personal information, contact details and account
                  settings
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* ================= CONTENT ================= */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 4, md: 5 },
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* ================= PROFILE ================= */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: {
                    xs: "center",
                    sm: "flex-start",
                  },
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: 3,
                  mb: 5,
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: 3,
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={preview || updateUser?.profilePic || undefined}
                    alt="Profile"
                    sx={{
                      width: 125,
                      height: 125,
                      border: "5px solid #fff",
                      boxShadow: "0 8px 25px rgba(15,23,42,0.12)",
                      backgroundColor: "#e2e8f0",
                    }}
                  >
                    {!preview && !updateUser?.profilePic && (
                      <Person
                        sx={{
                          fontSize: 58,
                          color: "#94a3b8",
                        }}
                      />
                    )}
                  </Avatar>

                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      right: -3,
                      bottom: -3,
                      width: 44,
                      height: 44,
                      backgroundColor: "#111827",
                      color: "#fff",
                      border: "3px solid #fff",

                      "&:hover": {
                        backgroundColor: "#334155",
                      },
                    }}
                  >
                    <CloudUpload fontSize="small" />

                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    textAlign: {
                      xs: "center",
                      sm: "left",
                    },
                    pt: { sm: 1 },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  >
                    Profile Picture
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.7,
                      maxWidth: 450,
                      fontSize: "0.98rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Upload a clear profile picture. Supported formats are JPG,
                    PNG and JPEG.
                  </Typography>

                  <Button
                    component="label"
                    variant="outlined"
                    size="medium"
                    startIcon={<CloudUpload />}
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      px: 2,
                      py: 0.8,
                    }}
                  >
                    Choose Image
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Box>
              </Box>

              {/* ================= PERSONAL INFORMATION ================= */}
              <Box sx={{ mb: 5 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{ mb: 2.8 }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#eef2ff",
                      color: "#4f46e5",
                    }}
                  >
                    <Person fontSize="small" />
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    >
                      Personal Information
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{
                        mt: 0.3,
                        fontSize: "0.95rem",
                      }}
                    >
                      Update the user's basic information
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "1fr 1fr",
                    },
                    gap: 2.5,
                  }}
                >
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={updateUser?.firstName || ""}
                    onChange={handleChange}
                    placeholder="John"
                  />

                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={updateUser?.lastName || ""}
                    onChange={handleChange}
                    placeholder="Doe"
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={updateUser?.email || ""}
                    disabled
                    helperText="Email cannot be changed"
                    InputProps={{
                      startAdornment: (
                        <EmailOutlined
                          sx={{
                            mr: 1,
                            color: "#94a3b8",
                          }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "1rem",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "1rem",
                      },
                      "& .MuiFormHelperText-root": {
                        fontSize: "0.85rem",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNo"
                    value={updateUser?.phoneNo || ""}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    InputProps={{
                      startAdornment: (
                        <PhoneOutlined
                          sx={{
                            mr: 1,
                            color: "#94a3b8",
                          }}
                        />
                      ),
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ mb: 5 }} />

              {/* ================= ADDRESS ================= */}
              <Box sx={{ mb: 5 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{ mb: 2.8 }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#ecfdf5",
                      color: "#059669",
                    }}
                  >
                    <LocationOnOutlined fontSize="small" />
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    >
                      Address Information
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{
                        mt: 0.3,
                        fontSize: "0.95rem",
                      }}
                    >
                      Add or update the user's location
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "1fr 1fr",
                    },
                    gap: 2.5,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={updateUser?.address || ""}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    sx={{
                      gridColumn: {
                        xs: "auto",
                        md: "1 / -1",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={updateUser?.city || ""}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />

                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="zipCode"
                    value={updateUser?.zipCode || ""}
                    onChange={handleChange}
                    placeholder="Enter zip code"
                  />
                </Box>
              </Box>

              <Divider sx={{ mb: 5 }} />

              {/* ================= ROLE ================= */}
              <Box sx={{ mb: 5 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{ mb: 2.8 }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff7ed",
                      color: "#ea580c",
                    }}
                  >
                    <BadgeOutlined fontSize="small" />
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    >
                      Account Role
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{
                        mt: 0.3,
                        fontSize: "0.95rem",
                      }}
                    >
                      Select the access level for this user
                    </Typography>
                  </Box>
                </Stack>

                <FormControl>
                  <FormLabel
                    sx={{
                      display: "none",
                    }}
                  >
                    User Role
                  </FormLabel>

                  <RadioGroup
                    row
                    name="role"
                    value={updateUser?.role || "user"}
                    onChange={handleChange}
                    sx={{
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography
                            fontWeight={600}
                            sx={{
                              fontSize: "1rem",
                            }}
                          >
                            User
                          </Typography>

                          <Typography
                            color="text.secondary"
                            sx={{
                              fontSize: "0.9rem",
                              mt: 0.2,
                            }}
                          >
                            Standard access
                          </Typography>
                        </Box>
                      }
                      sx={{
                        m: 0,
                        px: 2,
                        py: 1.2,
                        minWidth: 190,
                        border: "1px solid #e2e8f0",
                        borderRadius: 2.5,
                        backgroundColor:
                          updateUser?.role === "user" ? "#f8fafc" : "#fff",
                      }}
                    />

                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography
                            fontWeight={600}
                            sx={{
                              fontSize: "1rem",
                            }}
                          >
                            Admin
                          </Typography>

                          <Typography
                            color="text.secondary"
                            sx={{
                              fontSize: "0.9rem",
                              mt: 0.2,
                            }}
                          >
                            Full access
                          </Typography>
                        </Box>
                      }
                      sx={{
                        m: 0,
                        px: 2,
                        py: 1.2,
                        minWidth: 190,
                        border: "1px solid #e2e8f0",
                        borderRadius: 2.5,
                        backgroundColor:
                          updateUser?.role === "admin" ? "#f8fafc" : "#fff",
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* ================= ACTIONS ================= */}
              <Box
                sx={{
                  pt: 3,
                  borderTop: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={19} color="inherit" />
                    ) : (
                      <Save />
                    )
                  }
                  sx={{
                    minWidth: 200,
                    py: 1.5,
                    px: 3,
                    borderRadius: 2.5,
                    backgroundColor: "#111827",
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "none",

                    "&:hover": {
                      backgroundColor: "#334155",
                      boxShadow: "0 8px 20px rgba(15,23,42,0.15)",
                    },

                    "&:disabled": {
                      backgroundColor: "#94a3b8",
                      color: "#fff",
                    },
                  }}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserInfo;
