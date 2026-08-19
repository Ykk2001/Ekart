import { Box, Typography, Toolbar, TextField, Button } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Facebook, Instagram, Twitter, Pinterest } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box sx={{ maxWidth: "100%", bgcolor: "#07142b", color: "white" }}>
      
      {/* 4 Columns */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 4,
          px: { xs:3, sm: 5, md:7},
          py: 4
        }}
      >
        {/* Logo and Address */}
        <Box sx={{ flex: "1 1 220px" }}>
          <Box sx={{ color: "#de628f", fontWeight: 700 }}>
            <Toolbar disableGutters>
              <ShoppingCartIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6">KART</Typography>
            </Toolbar>
          </Box>

          <Typography sx={{ mt: 1 }}>
            Powering Your World with the Best in Electronics.
          </Typography>

          <Typography sx={{ mt: 1 }}>
            123 Electronics St, Style City
          </Typography>

          <Typography>Email: support@ekart.com</Typography>
          <Typography>Phone: (123) 456-7890</Typography>
        </Box>

        {/* Customer Service */}
        <Box sx={{ flex: "1 1 180px" }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Customer Service
          </Typography>

          <Typography sx={{ mb: 1 }}>Contact Us</Typography>
          <Typography sx={{ mb: 1 }}>Shipping & Returns</Typography>
          <Typography sx={{ mb: 1 }}>FAQs</Typography>
          <Typography>Order Tracking</Typography>
        </Box>

        {/* Follow Us */}
        <Box sx={{ flex: "1 1 180px" }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Follow Us
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Facebook sx={{ cursor: "pointer" }} />
            <Instagram sx={{ cursor: "pointer" }} />
            <Twitter sx={{ cursor: "pointer" }} />
            <Pinterest sx={{ cursor: "pointer" }} />
          </Box>
        </Box>

        {/* Stay in Loop */}
        <Box sx={{ flex: "1 1 250px" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Stay in the Loop
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Subscribe to get offers and updates
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Your email"
            fullWidth
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              mb: 2
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#ff1493",
              "&:hover": { bgcolor: "#e60073" }
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>

      {/* Bottom */}
      <Box
        sx={{
          borderTop: "1px solid gray",
          textAlign: "center",
          py: 2,
          px: 2
        }}
      >
        <Typography variant="body2">
          © 2026 EKart. All rights reserved
        </Typography>
      </Box>
    </Box>
  );
}

//Notes--->1) <Box sx={{ flex: "1 1 250px" }}> flex-grow: 1;flex-shrink: 1;flex-basis: 250px;  Starting/default width is 250px Before growing or shrinking. 
