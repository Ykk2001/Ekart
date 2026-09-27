// import React from "react";
// import BreadCrums from "../component/Breadcrums";
// import ProductImg from "../component/ProductImg";
// import ProductDesc from "../component/ProductDesc";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Typography, Container, Box } from "@mui/material";

// export default function SingleProduct() {
//   const params = useParams(); //here we are accessing the dynamic id from the url
//   const productId = params.id; //same here
//   const { products } = useSelector((store) => store.product); //getting the products array
//   const product = products.find((item) => item._id === productId); //getting the product from the productId

//   if (!product) {
//     return (
//       <Typography sx={{ textAlign: "center", marginTop: 10 }}>
//         Loading.....
//       </Typography>
//     );
//   }
//   return (
//     <Container maxWidth="lg" sx={{ paddingTop: 5, paddingBottom: 5 }}>
//       {/* Breadcrumbs */}
//       <BreadCrums product={product} />

//       {/* Product Section */}
//       <Box
//        sx={{
//         mt: 5,
//         display: "grid",
//         gridTemplateColumns: {
//             xs: "1fr",
//             md: "1fr 1fr",
//         },
//         gap: {
//             xs: 4,
//             md: 6,
//         },
//         alignItems: "start",
//     }}
//       >
//         {/* product images */}
//         <ProductImg images={product.productImg} />

//         {/* product Description */}
//         <ProductDesc product={product} />
//       </Box>
//     </Container>
//   );
// }



import React from "react";
import BreadCrums from "../component/Breadcrums";
import ProductImg from "../component/ProductImg";
import ProductDesc from "../component/ProductDesc";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";

export default function SingleProduct() {
  const params = useParams();
  const productId = params.id;
  const { products } = useSelector((store) => store.product);
  const product = products.find((item) => item._id === productId);

  if (!product) {
    return (
      <Typography sx={{ textAlign: "center", marginTop: 10, color: "text.secondary", fontWeight: 500 }}>
        Loading.....
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 6 }}>
      {/* Breadcrumbs */}
      <BreadCrums product={product} />

      {/* Product Section */}
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1.1fr", // Gives slightly more room to description/actions
          },
          gap: {
            xs: 4,
            md: 6,
          },
          alignItems: "start",
          backgroundColor: "#fff",
          padding: { xs: 2, md: 4 },
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
          border: "1px solid #f0f0f0",
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