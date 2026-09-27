
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const { productImg, productPrice, productName, _id, brand, category } =
    props.product || {};
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function addToCart(productId) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Product added to Cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    }
  }

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2.5,
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px -6px rgba(15, 23, 42, 0.09)",
          borderColor: "#cbd5e1",
        },
      }}
    >
      {/* Product Image Area: Fixed 220px height ensures images never expand */}
      <Box
        sx={{
          width: "100%",
          height: 220,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2.5,
          borderBottom: "1px solid #f1f5f9",
          cursor: "pointer",
          overflow: "hidden",
        }}
        onClick={() => navigate(`/products/${_id}`)}
      >
        {props.loading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <CardMedia
            component="img"
            alt={productName}
            image={productImg?.[0]?.url || "/placeholder.png"}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
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
          p: 2.5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Brand Tag (Uniform fixed height) */}
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            height: "1.2rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mb: 0.5,
          }}
        >
          {brand || category || "Store Item"}
        </Typography>

        {/* Product Name (Strict 2-line clamp with uniform height) */}
        <Typography
          onClick={() => navigate(`/products/${_id}`)}
          title={productName}
          sx={{
            fontSize: "0.98rem",
            fontWeight: 600,
            color: "#0f172a",
            lineHeight: 1.4,
            height: "2.8em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            cursor: "pointer",
            "&:hover": { color: "#db2777" },
          }}
        >
          {productName}
        </Typography>

        {/* Price */}
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#0f172a",
            mt: 1.5,
            mb: 2,
          }}
        >
          ₹{Number(productPrice || 0).toLocaleString()}
        </Typography>

        {/* Action Button (Pushed to bottom) */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartOutlinedIcon fontSize="small" />}
          sx={{
            mt: "auto",
            py: 1.1,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "0.92rem",
            fontWeight: 600,
            backgroundColor: "#db2777",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#be185d",
              boxShadow: "none",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(_id);
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}