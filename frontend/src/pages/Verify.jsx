import { Box, Card, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

export default function Verify() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
         backgroundColor: "#fce4ec"
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          maxHeight: 420,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: 4,
          boxShadow: 5,
          padding: 5,
          gap:"8px"
        }}
      >

        <Typography  variant="h5" sx={{fontWeight:600,color:'green'}} >
          <CheckCircleIcon /> Check Your Email
        </Typography>

        <Typography variant="body1" sx={{color:'text.secondary'}}>
          We have sent you an email to verify your account.Please check your
          inbox and click the verification link
        </Typography>

      </Card>
    </Box>
  );
}
