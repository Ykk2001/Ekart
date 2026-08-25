import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { Skeleton } from "@mui/material";
export default function ProductCard(props) {
  const { productImg, productPrice, productName } = props.product;
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        height: "100%", //  ⬅️ FIX 1: card fills the full Grid cell height
        display: "flex", //  ⬅️ FIX 2: make card a flex column
        flexDirection: "column", //  ⬅️ FIX 2: so content stacks and can grow
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      {/* Product Image */}
      <Box sx={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
        {props.loading ? (
          <Skeleton variant="circular" width={48} height={48}></Skeleton>
        ) : (
          <CardMedia
            component="img"
            alt={productName}
            image={productImg?.[0]?.url}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        )}
      </Box>

      {/* Product Information */}
      <CardContent
        sx={{
          px: 2,
          py: 1.5,
          flex: 1, //  ⬅️ FIX 3: content area grows to fill leftover space
          display: "flex", //  ⬅️ FIX 3: flex column inside content too
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "18px", fontWeight: 700, mt: 0.5 }}
        >
          {productName}
        </Typography>
        <Typography>₹{productPrice}</Typography>

        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          sx={{
            mt: "auto", //  ⬅️ FIX 4: pushes button to the bottom always
            bgcolor: "#e91368",
            "&:hover": { bgcolor: "#c5105a" },
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
