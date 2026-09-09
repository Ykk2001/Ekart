import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";

import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

export default function ProductDesc({ product }) {
    const accessToken =
        localStorage.getItem("accessToken");

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    async function addToCart(productId) {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/cart/add",
                {
                    productId,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (res.data.success) {
                toast.success(
                    "Product added to cart"
                );

                dispatch(
                    setCart(res.data.cart)
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* Product Name */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: "#374151",

                    fontSize: {
                        xs: "28px",
                        md: "34px",
                    },
                }}
            >
                {product.productName}
            </Typography>

            {/* Category & Brand */}
            <Typography
                sx={{
                    color: "#374151",
                    fontSize: "14px",
                }}
            >
                {product.category} | {product.brand}
            </Typography>

            {/* Price */}
            <Typography
                variant="h5"
                sx={{
                    color: "#ec4899",
                    fontWeight: 700,
                }}
            >
                ₹{product.productPrice}
            </Typography>

            {/* Description */}
            <Typography
                sx={{
                    color: "text.secondary",

                    lineHeight: 1.7,

                    display: "-webkit-box",
                    WebkitLineClamp: 10,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {product.productDesc}
            </Typography>

            {/* Quantity + Add To Cart */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",

                    // Responsive
                    flexWrap: "wrap",

                    mt: 1,
                }}
            >
                {/* Quantity Label */}
                <Typography
                    sx={{
                        color: "#374151",
                        fontWeight: 600,
                    }}
                >
                    Quantity:
                </Typography>

                {/* Quantity Input */}
                <TextField
                    type="number"
                    size="small"
                    value={quantity}
                    onChange={(e) => {
                        const value =
                            Number(e.target.value);

                        if (value >= 1) {
                            setQuantity(value);
                        }
                    }}
                    slotProps={{
                        htmlInput: {
                            min: 1,
                        },
                    }}
                    sx={{
                        width: 65,
                    }}
                />

                {/* Add To Cart */}
                <Button
                    variant="contained"
                    onClick={() =>
                        addToCart(product._id)
                    }
                    sx={{
                        backgroundColor: "#db2777",

                        width: "fit-content",

                        fontWeight: 600,

                        "&:hover": {
                            backgroundColor:
                                "#be185d",
                        },
                    }}
                >
                    Add to Cart
                </Button>
            </Box>
        </Box>
    );
}