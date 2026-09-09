import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { Box } from "@mui/material";

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images?.[0]?.url || "");

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2.5,
        width: "100%",
        alignItems: "flex-start",
      }}
    >
      {/* Thumbnail Images */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,

          // Prevent thumbnails from shrinking
          flexShrink: 0,
        }}
      >
        {images?.map((img, index) => (
          <Box
            key={index}
            component="img"
            onClick={() => setMainImg(img.url)}
            src={img.url}
            alt="Product"
            sx={{
              cursor: "pointer",

              width: {
                xs: 60,
                sm: 70,
                md: 80,
              },

              height: {
                xs: 60,
                sm: 70,
                md: 80,
              },

              // Highlight selected image
              border:
                mainImg === img.url ? "2px solid #db2777" : "1px solid #ddd",

              borderRadius: 1,

              boxShadow: 2,

              objectFit: "cover",

              transition: "0.2s",

              "&:hover": {
                border: "2px solid #db2777",
              },
            }}
          />
        ))}
      </Box>

      {/* Main Image */}
      <Zoom>
        <Box
          component="img"
          src={mainImg}
          alt="Product"
          sx={{
            width: {
              xs: "100%",
              sm: 400,
              md: 420,
            },

            height: {
              xs: 350,
              sm: 400,
              md: 420,
            },

            maxWidth: "100%",

            cursor: "pointer",

            border: "1px solid #ddd",

            borderRadius: 1,

            boxShadow: 3,

            // Important for product images
            objectFit: "contain",

            backgroundColor: "#fff",
          }}
        />
      </Zoom>
    </Box>
  );
};

export default ProductImg;
