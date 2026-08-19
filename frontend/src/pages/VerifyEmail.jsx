import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Card, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate=useNavigate();

  async function verifyEmail() {
    try {
      let res = await axios.post(
        `http://localhost:5000/api/v1/user/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setStatus("Email Verified Successfully...");
        navigate('/login');
      }
    } catch (error) {
      //try
      console.log("Error while verifying the mail", error.response);
      toast.error(error.response?.data?.message || "Verification Failed");
      setStatus("Verification failed .Please try again");
    } //when response get in status code of 400 and 500
  }

  useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fce4ec",
      }}
    >
      <Card
        sx={{
          maxHeight: 420,
          maxWidth: 500,
          padding: 4,
          borderRadius: 4,
          boxShadow: 4,
        }}
      >
        {status.includes("Successfully") && (
          <Box sx={{display:'flex',gap:1,justifyContent:'center',alignItems:'center'}}>
            <CheckCircleIcon sx={{ color: "green" }} />
            <Typography>{status}</Typography>{" "}
          </Box>
        )}

        {status.includes("failed") && (
          <Box sx={{display:'flex',gap:1,justifyContent:'center',alignItems:'center'}}>
           <ErrorIcon sx={{ color: "red" }} />
            <Typography>
            {status}
          </Typography>
          </Box>
         
        )}
        {status.includes("Verifying...") && (
          <Typography>{status}</Typography>
        )
        }

      </Card>
    </Box>
  );
}

//NOTES --->VIIMP 1)try block will get executed when status code=200, This  catch block of try...catch. executed when backend return 400,500 ,token expired ,server error etc.
