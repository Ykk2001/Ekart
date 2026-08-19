import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }); 

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("FormData", formData);
  }

  async function handleSubmit(e) {
    console.log("event while Submitting the form", e);
    try {
       setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/v1/user/register`,
        formData,
        { headers:{
          "Content-Type":'application/json'
        } },
      );
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/verify");
      }
    } catch (error) {
      console.log("Error While Submitting the register form", error);
      toast.error(error.response.data.message)
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(252, 228, 236)",
      }}
    >
      <Card sx={{ maxWidth: "420px", borderRadius: "16px", boxShadow: "15" }}>
        <CardHeader
          title="Create Your Account"
          subheader="Enter Given Details below to create your account"
        />

        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Box sx={{ display: "flex", gap: "16px" }}>
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Box>

          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton>
                    {showPassword ? (
                      <VisibilityOff onClick={() => setShowPassword(false)} />
                    ) : (
                      <Visibility onClick={() => setShowPassword(true)} />
                    )}
                  </IconButton>
                ),
              },
            }}
          />

          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
           {loading?(<><CircularProgress size={20}/>Creating Account...</> ):"SignUp"} 
          </Button>

          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            Already have an account?{" "}
            <MuiLink
              component={RouterLink} //This tells MUI to act like a Router Link
              underline="none" //strt without underline
              to="/login"
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "blue",
                },
              }}
            >
              Login
            </MuiLink>
          </Typography>

          {/* MUI link is material ui therefore we can use sx={{ }} for other component we cant use sx={{}} */}
        </CardContent>
      </Card>
    </Box>
  );
}

//Notes -->slotProps={{}}} used newer version MUI alloes customizing internal part of the MUI component eg: input,label,helperText,root----->2){ headers:"Content-Type:{"application/json"} } =It tells backend The request body contains JSON data
