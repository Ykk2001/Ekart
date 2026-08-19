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
      }
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
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tabs
        onChange={(e, value) => setTab(value)}
        value={tab}
        sx={{
          backgroundColor: "#f4f4f5",
          borderRadius: 2,
          mb: 3,
          boxShadow: 3,
        }}
      >
        <Tab
          label="Profile"
          sx={{
            bgcolor: tab == 0 ? "white" : "transparent",
            borderRadius: 3,
            textTransform: "none",
          }}
        />
        <Tab
          label="Orders"
          sx={{
            bgcolor: tab == 1 ? "white" : "transparent",
            borderRadius: 3,
            textTransform: "none",
          }}
        />
      </Tabs>

      {tab == 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* avtar */}
          <Box sx={{ textAlign: "center", width: { xs: "100%", md: "auto" } }}>
            <Avatar
              src={updateUser.profilePic}
              sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
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
                variant="contained"
                component="span"
                sx={{ textTransform: "none" }}
              >
                Change Picture
              </Button>
            </label>
          </Box>

          {/* form */}
          <Card sx={{ width: { xs: "100%", sm: 400 }, boxShadow: 3 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Update Profile</Typography>

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

              <Button variant="contained" onClick={handleSubmit}>
                Update Profile
              </Button>

            </CardContent>
          </Card>
        </Box>
      )}

      {tab == 1 && (
        <Card sx={{ width: { xs: "100%", sm: 400 } }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Orders
            </Typography>
            <Typography variant="body2">No orders found.</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
