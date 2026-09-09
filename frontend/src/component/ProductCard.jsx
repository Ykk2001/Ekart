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
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const { productImg, productPrice, productName,_id } = props.product;
  const accessToken=localStorage.getItem('accessToken');
  const dispatch=useDispatch();
  const navigate=useNavigate();

  async function addToCart(productId)
  {
    try{
       const res=await axios.post('http://localhost:5000/api/v1/cart/add',{productId},{
         headers:{
          Authorization:`Bearer ${accessToken}`
         }
       })//sending the cart add request to the backend

       console.log("data after posting the product inside the cart",res.data)
       if(res.data.success)
       {
        console.log("cart reciebed from backend",res.data)
         toast.success("Product added to Cart");
         dispatch(setCart(res.data.cart))//after fetching the cart we are storing that cart in a cart Slice in redux
       }

    }
    catch(error)
    {
      console.error(error)
    }
  }
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
              cursor:'pointer'
            }}
            onClick={()=>navigate(`/products/${_id}`)}
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
          onClick={()=>addToCart(_id)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
