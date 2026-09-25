import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import MyOrder from "./MyOrder";

export default function Profile() {
  const { User } = useSelector((store) => store.user);
  console.log("from store ", User);

  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();

  const [updateUser, setUpdateUser] = useState({
    firstName: User?.firstName,
    lastName: User?.lastName,
    email: User?.email,
    phoneNo: User?.phoneNo,
    address: User?.address,
    city: User?.city,
    zipCode: User?.zipCode,
    profilePic: User?.profilePic,
    role: User?.role,
  });

  console.log("userProfile", userId);

  const [tab, setTab] = useState(0);
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();

      formData.append("firstName", updateUser.firstName || "");
      formData.append("lastName", updateUser.lastName || "");
      formData.append("phoneNo", updateUser.phoneNo || "");
      formData.append("address", updateUser.address || "");
      formData.append("city", updateUser.city || "");
      formData.append("zipCode", updateUser.zipCode || "");

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `http://localhost:5000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log("UPDATE ERROR:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  }

  console.log("Update user ", updateUser);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 5 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1100px",
        mx: "auto",
        width: "100%",
      }}
    >
      <Tabs
        onChange={(e, value) => setTab(value)}
        value={tab}
        sx={{
          backgroundColor: "#f4f4f5",
          borderRadius: 3,
          p: 0.5,
          mb: 4,
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        <Tab
          label="Profile"
          sx={{
            bgcolor: tab === 0 ? "#ffffff" : "transparent",
            color: tab === 0 ? "text.primary" : "text.secondary",
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            boxShadow: tab === 0 ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
            transition: "all 0.2s ease",
          }}
        />
        <Tab
          label="Orders"
          sx={{
            bgcolor: tab === 1 ? "#ffffff" : "transparent",
            color: tab === 1 ? "text.primary" : "text.secondary",
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            boxShadow: tab === 1 ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
            transition: "all 0.2s ease",
          }}
        />
      </Tabs>

      {tab === 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
          }}
        >
          {/* Avatar section */}
          <Box sx={{ textAlign: "center", width: { xs: "100%", md: 240 } }}>
            <Avatar
              src={updateUser.profilePic}
              sx={{
                width: 140,
                height: 140,
                mx: "auto",
                mb: 2,
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                border: "3px solid #fff",
              }}
            />
            <input
              type="file"
              accept="image/*"
              id="upload-image"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="upload-image">
              <Button
                variant="outlined"
                component="span"
                sx={{ textTransform: "none", borderRadius: 2, fontWeight: 600 }}
              >
                Change Picture
              </Button>
            </label>
          </Box>

          {/* Form Card */}
          <Card
            sx={{
              flex: 1,
              maxWidth: 600,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "grey.200",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent
              sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <Typography variant="h6" fontWeight={700}>
                Personal Details
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <TextField
                  label="First Name"
                  fullWidth
                  name="firstName"
                  value={updateUser?.firstName || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={updateUser?.lastName || ""}
                  fullWidth
                  onChange={handleChange}
                />
              </Box>

              <TextField
                label="Email"
                name="email"
                disabled
                fullWidth
                value={updateUser?.email || ""}
              />

              <TextField
                label="Phone Number"
                name="phoneNo"
                fullWidth
                value={updateUser?.phoneNo || ""}
                onChange={handleChange}
              />

              <TextField
                label="Address"
                name="address"
                fullWidth
                value={updateUser?.address || ""}
                onChange={handleChange}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <TextField
                  label="City"
                  name="city"
                  fullWidth
                  value={updateUser?.city || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="Zip Code"
                  name="zipCode"
                  fullWidth
                  value={updateUser?.zipCode || ""}
                  onChange={handleChange}
                />
              </Box>

              <Button
                variant="contained"
                disableElevation
                onClick={handleSubmit}
                sx={{
                  py: 1.3,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  mt: 1,
                }}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* TAB 1: RENDER DIRECTLY WITHOUT 400px WRAPPER CARD */}
      {tab === 1 && (
        <Box sx={{ width: "100%", maxWidth: 960 }}>
          <MyOrder />
        </Box>
      )}
    </Box>
  );
}
