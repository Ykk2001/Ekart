// import React, { useState } from "react";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";

// import { Box } from "@mui/material";

// const ProductImg = ({ images }) => {
//   const [mainImg, setMainImg] = useState(images?.[0]?.url || "");

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         gap: 2.5,
//         width: "100%",
//         alignItems: "flex-start",
//       }}
//     >
//       {/* Thumbnail Images */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,

//           // Prevent thumbnails from shrinking
//           flexShrink: 0,
//         }}
//       >
//         {images?.map((img, index) => (
//           <Box
//             key={index}
//             component="img"
//             onClick={() => setMainImg(img.url)}
//             src={img.url}
//             alt="Product"
//             sx={{
//               cursor: "pointer",

//               width: {
//                 xs: 60,
//                 sm: 70,
//                 md: 80,
//               },

//               height: {
//                 xs: 60,
//                 sm: 70,
//                 md: 80,
//               },

//               // Highlight selected image
//               border:
//                 mainImg === img.url ? "2px solid #db2777" : "1px solid #ddd",

//               borderRadius: 1,

//               boxShadow: 2,

//               objectFit: "cover",

//               transition: "0.2s",

//               "&:hover": {
//                 border: "2px solid #db2777",
//               },
//             }}
//           />
//         ))}
//       </Box>

//       {/* Main Image */}
//       <Zoom>
//         <Box
//           component="img"
//           src={mainImg}
//           alt="Product"
//           sx={{
//             width: {
//               xs: "100%",
//               sm: 400,
//               md: 420,
//             },

//             height: {
//               xs: 350,
//               sm: 400,
//               md: 420,
//             },

//             maxWidth: "100%",

//             cursor: "pointer",

//             border: "1px solid #ddd",

//             borderRadius: 1,

//             boxShadow: 3,

//             // Important for product images
//             objectFit: "contain",

//             backgroundColor: "#fff",
//           }}
//         />
//       </Zoom>
//     </Box>
//   );
// };

// export default ProductImg;





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
        flexDirection: { xs: "column-reverse", sm: "row" },
        gap: 2,
        width: "100%",
        alignItems: { xs: "center", sm: "flex-start" },
        position: "sticky",
        top: 20,
      }}
    >
      {/* Thumbnail Images */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          gap: 1.5,
          flexShrink: 0,
          overflowX: { xs: "auto", sm: "visible" },
          maxWidth: "100%",
          p: 0.5,
        }}
      >
        {images?.map((img, index) => (
          <Box
            key={index}
            component="img"
            onClick={() => setMainImg(img.url)}
            src={img.url}
            alt="Product Thumbnail"
            sx={{
              cursor: "pointer",
              width: { xs: 55, sm: 65, md: 75 },
              height: { xs: 55, sm: 65, md: 75 },
              border: mainImg === img.url ? "2px solid #db2777" : "1px solid #e5e7eb",
              borderRadius: 2,
              objectFit: "cover",
              transition: "all 0.2s ease-in-out",
              backgroundColor: "#f9fafb",
              "&:hover": {
                borderColor: "#db2777",
                transform: "scale(1.02)",
              },
            }}
          />
        ))}
      </Box>

      {/* Main Image */}
      <Box 
        sx={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          borderRadius: 3,
          border: "1px solid #f0f0f0",
          p: 2,
        }}
      >
        <Zoom>
          <Box
            component="img"
            src={mainImg}
            alt="Product"
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 400, md: 420 },
              height: { xs: 320, sm: 380, md: 420 },
              cursor: "zoom-in",
              borderRadius: 2,
              objectFit: "contain",
              backgroundColor: "transparent",
            }}
          />
        </Zoom>
      </Box>
    </Box>
  );
};

export default ProductImg;