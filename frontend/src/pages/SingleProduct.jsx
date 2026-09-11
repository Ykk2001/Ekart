import React from "react";
import BreadCrums from "../component/Breadcrums";
import ProductImg from "../component/ProductImg";
import ProductDesc from "../component/ProductDesc";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";

export default function SingleProduct() {
  const params = useParams(); //here we are accessing the dynamic id from the url
  const productId = params.id; //same here
  const { products } = useSelector((store) => store.product); //getting the products array
  const product = products.find((item) => item._id === productId); //getting the product from the productId

  if (!product) {
    return (
      <Typography sx={{ textAlign: "center", marginTop: 10 }}>
        Loading.....
      </Typography>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {/* Breadcrumbs */}
      <BreadCrums product={product} />

      {/* Product Section */}
      <Box
       sx={{
        mt: 5,
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
        },
        gap: {
            xs: 4,
            md: 6,
        },
        alignItems: "start",
    }}
      >
        {/* product images */}
        <ProductImg images={product.productImg} />

        {/* product Description */}
        <ProductDesc product={product} />
      </Box>
    </Container>
  );
}
