// import React, { useState } from "react";
// import {
//     Box,
//     Button,
//     TextField,
//     Typography,
// } from "@mui/material";

// import axios from "axios";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setCart } from "@/redux/productSlice";

// export default function ProductDesc({ product }) {
//     const accessToken =
//         localStorage.getItem("accessToken");

//     const dispatch = useDispatch();

//     const [quantity, setQuantity] = useState(1);

//     async function addToCart(productId) {
//         try {
//             const res = await axios.post(
//                 "http://localhost:5000/api/v1/cart/add",
//                 {
//                     productId,
//                     quantity,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 }
//             );

//             if (res.data.success) {
//                 toast.success(
//                     "Product added to cart"
//                 );

//                 dispatch(
//                     setCart(res.data.cart)
//                 );
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//             }}
//         >
//             {/* Product Name */}
//             <Typography
//                 variant="h4"
//                 sx={{
//                     fontWeight: 700,
//                     color: "#374151",

//                     fontSize: {
//                         xs: "28px",
//                         md: "34px",
//                     },
//                 }}
//             >
//                 {product.productName}
//             </Typography>

//             {/* Category & Brand */}
//             <Typography
//                 sx={{
//                     color: "#374151",
//                     fontSize: "14px",
//                 }}
//             >
//                 {product.category} | {product.brand}
//             </Typography>

//             {/* Price */}
//             <Typography
//                 variant="h5"
//                 sx={{
//                     color: "#ec4899",
//                     fontWeight: 700,
//                 }}
//             >
//                 ₹{product.productPrice}
//             </Typography>

//             {/* Description */}
//             <Typography
//                 sx={{
//                     color: "text.secondary",

//                     lineHeight: 1.7,

//                     display: "-webkit-box",
//                     WebkitLineClamp: 10,
//                     WebkitBoxOrient: "vertical",
//                     overflow: "hidden",
//                 }}
//             >
//                 {product.productDesc}
//             </Typography>

//             {/* Quantity + Add To Cart */}
//             <Box
//                 sx={{
//                     display: "flex",
//                     gap: 1.5,
//                     alignItems: "center",

//                     // Responsive
//                     flexWrap: "wrap",

//                     mt: 1,
//                 }}
//             >
//                 {/* Quantity Label */}
//                 <Typography
//                     sx={{
//                         color: "#374151",
//                         fontWeight: 600,
//                     }}
//                 >
//                     Quantity:
//                 </Typography>

//                 {/* Quantity Input */}
//                 <TextField
//                     type="number"
//                     size="small"
//                     value={quantity}
//                     onChange={(e) => {
//                         const value =
//                             Number(e.target.value);

//                         if (value >= 1) {
//                             setQuantity(value);
//                         }
//                     }}
//                     slotProps={{
//                         htmlInput: {
//                             min: 1,
//                         },
//                     }}
//                     sx={{
//                         width: 65,
//                     }}
//                 />

//                 {/* Add To Cart */}
//                 <Button
//                     variant="contained"
//                     onClick={() =>
//                         addToCart(product._id)
//                     }
//                     sx={{
//                         backgroundColor: "#db2777",

//                         width: "fit-content",

//                         fontWeight: 600,

//                         "&:hover": {
//                             backgroundColor:
//                                 "#be185d",
//                         },
//                     }}
//                 >
//                     Add to Cart
//                 </Button>
//             </Box>
//         </Box>
//     );
// }



import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Chip,
    Divider,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

export default function ProductDesc({ product }) {
    const accessToken = localStorage.getItem("accessToken");
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    async function addToCart(productId) {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_URL}/api/v1/cart/add`,
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
                toast.success("Product added to cart");
                dispatch(setCart(res.data.cart));
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
                gap: 2.5,
            }}
        >
            {/* Category & Brand Badge */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Chip 
                    label={product.brand} 
                    size="small" 
                    sx={{ backgroundColor: "#f3f4f6", fontWeight: 600, color: "#4b5563" }} 
                />
                <Typography sx={{ color: "text.secondary", fontSize: "13px" }}>
                    • {product.category}
                </Typography>
            </Box>

            {/* Product Name */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: "#1f2937",
                    fontSize: {
                        xs: "22px",
                        sm: "26px",
                        md: "30px",
                    },
                    lineHeight: 1.3,
                }}
            >
                {product.productName}
            </Typography>

            {/* Price */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
                <Typography
                    variant="h5"
                    sx={{
                        color: "#db2777",
                        fontWeight: 800,
                        fontSize: { xs: "24px", md: "28px" },
                    }}
                >
                    ₹{product.productPrice}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "12px", textDecoration: "line-through" }}>
                    ₹{Math.round(product.productPrice * 1.2)}
                </Typography>
                <Typography sx={{ color: "#16a34a", fontSize: "13px", fontWeight: 600 }}>
                    (20% off)
                </Typography>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            {/* Description */}
            <Typography
                sx={{
                    color: "#4b5563",
                    fontSize: "14px",
                    lineHeight: 1.7,
                }}
            >
                {product.productDesc}
            </Typography>

            <Divider sx={{ my: 0.5 }} />

            {/* Quantity + Add To Cart Box (Buy Box Styling) */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2.5,
                    backgroundColor: "#f9fafb",
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                    mt: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Quantity Label */}
                    <Typography
                        sx={{
                            color: "#374151",
                            fontWeight: 600,
                            fontSize: "14px",
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
                            const value = Number(e.target.value);
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
                            width: 75,
                            backgroundColor: "#fff",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1.5,
                            }
                        }}
                    />
                </Box>

                {/* Add To Cart */}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => addToCart(product._id)}
                    sx={{
                        backgroundColor: "#db2777",
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: "15px",
                        borderRadius: 2,
                        boxShadow: "0px 4px 12px rgba(219, 39, 119, 0.3)",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#be185d",
                            boxShadow: "0px 6px 16px rgba(219, 39, 119, 0.4)",
                        },
                    }}
                >
                    Add to Cart
                </Button>
            </Box>
        </Box>
    );
}