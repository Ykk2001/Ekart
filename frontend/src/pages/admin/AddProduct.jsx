import { setProducts } from "@/redux/productSlice";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImageUpload from "@/component/ImageUpload";

export default function AddProduct() {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const { products } = useSelector((store) => store.product);

  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState({
    productName: "",
    productPrice: 0,
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productDesc", productData.productDesc);
    formData.append("category", productData.category);
    formData.append("brand", productData.brand);

    if (productData.productImg.length === 0) {
      toast.error("Please select atleast one Image");
      return;
    }

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(
          setProducts([
            ...products,
            res.data.product,
          ])
        );

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        py: { xs: 2, md: 3 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Main Container */}
      <Box
        sx={{
          maxWidth: "1050px",
          mx: "auto",
        }}
      >

        {/* Page Heading */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              fontSize: { xs: "1.4rem", md: "1.6rem" },
            }}
          >
            Add Product
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: "0.95rem",
              mt: 0.3,
            }}
          >
            Add a new product to your store
          </Typography>
        </Box>

        {/* Main Form Card */}
        <Card
          elevation={0}
          sx={{
            width: "100%",
            border: "1px solid #e2e8f0",
            borderRadius: 2.5,
            backgroundColor: "#ffffff",
          }}
        >

          {/* Header */}
          <CardHeader
            sx={{
              px: { xs: 2.5, md: 3 },
              py: 2,
            }}
            title={
              <Typography
                sx={{
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "#1e293b",
                }}
              >
                Product Information
              </Typography>
            }
            subheader={
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                  mt: 0.2,
                }}
              >
                Enter the details of your product
              </Typography>
            }
          />

          <Divider />

          {/* Form Content */}
          <CardContent
            sx={{
              px: { xs: 2.5, md: 3 },
              py: 2.5,
            }}
          >
            <Box
              component="form"
              onSubmit={submitHandler}
            >

              {/* ================= BASIC INFORMATION ================= */}
              <Box sx={{ mb: 2.5 }}>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#334155",
                    mb: 1.5,
                  }}
                >
                  Basic Information
                </Typography>

                {/* Product Name */}
                <Box sx={{ mb: 1.7 }}>
                  <Typography
                    component="label"
                    sx={labelStyle}
                  >
                    Product Name
                  </Typography>

                  <TextField
                    type="text"
                    name="productName"
                    value={productData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    fullWidth
                    size="small"
                    sx={inputStyle}
                  />
                </Box>

                {/* Price */}
                <Box sx={{ mb: 1.7 }}>
                  <Typography
                    component="label"
                    sx={labelStyle}
                  >
                    Price
                  </Typography>

                  <TextField
                    type="number"
                    name="productPrice"
                    value={productData.productPrice}
                    onChange={handleChange}
                    placeholder="Enter product price"
                    required
                    fullWidth
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <Typography
                          sx={{
                            fontSize: "0.95rem",
                            color: "#64748b",
                            mr: 0.7,
                          }}
                        >
                          ₹
                        </Typography>
                      ),
                    }}
                    sx={inputStyle}
                  />
                </Box>

                {/* Brand + Category */}
                <Grid container spacing={2}>

                  {/* Brand */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      component="label"
                      sx={labelStyle}
                    >
                      Brand
                    </Typography>

                    <TextField
                      type="text"
                      name="brand"
                      value={productData.brand}
                      onChange={handleChange}
                      placeholder="e.g. Lenovo"
                      required
                      fullWidth
                      size="small"
                      sx={inputStyle}
                    />
                  </Grid>

                  {/* Category */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      component="label"
                      sx={labelStyle}
                    >
                      Category
                    </Typography>

                    <TextField
                      type="text"
                      name="category"
                      value={productData.category}
                      onChange={handleChange}
                      placeholder="e.g. Laptop"
                      required
                      fullWidth
                      size="small"
                      sx={inputStyle}
                    />
                  </Grid>

                </Grid>
              </Box>

              <Divider sx={{ mb: 2.5 }} />

              {/* ================= DESCRIPTION ================= */}
              <Box sx={{ mb: 2.5 }}>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#334155",
                    mb: 1.5,
                  }}
                >
                  Product Description
                </Typography>

                <Typography
                  component="label"
                  sx={labelStyle}
                >
                  Description
                </Typography>

                <TextField
                  name="productDesc"
                  value={productData.productDesc}
                  onChange={handleChange}
                  placeholder="Write a short description about your product..."
                  multiline
                  rows={3}
                  fullWidth
                  sx={inputStyle}
                />

              </Box>

              <Divider sx={{ mb: 2.5 }} />

              {/* ================= IMAGES ================= */}
              <Box sx={{ mb: 1 }}>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#334155",
                    mb: 1.5,
                  }}
                >
                  Product Images
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    border: "1px dashed #cbd5e1",
                    borderRadius: 1.5,
                    p: 1.5,
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <ImageUpload
                    productData={productData}
                    setProductData={setProductData}
                  />
                </Paper>

              </Box>

              {/* ================= BUTTONS ================= */}
              <CardActions
                sx={{
                  px: 0,
                  pt: 2,
                  pb: 0,
                  justifyContent: "flex-end",
                  gap: 1.2,
                }}
              >

                {/* Clear */}
                <Button
                  type="button"
                  disabled={loading}
                  variant="outlined"
                  onClick={() =>
                    setProductData({
                      productName: "",
                      productPrice: 0,
                      productDesc: "",
                      productImg: [],
                      brand: "",
                      category: "",
                    })
                  }
                  sx={{
                    minWidth: 90,
                    height: 38,
                    borderRadius: 1.3,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#475569",
                    borderColor: "#cbd5e1",

                    "&:hover": {
                      borderColor: "#94a3b8",
                      backgroundColor: "#f8fafc",
                    },
                  }}
                >
                  Clear
                </Button>

                {/* Add Product */}
                <Button
                  disabled={loading}
                  type="submit"
                  variant="contained"
                  sx={{
                    minWidth: 130,
                    height: 38,
                    borderRadius: 1.3,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    backgroundColor: "#db2777",
                    boxShadow: "none",

                    "&:hover": {
                      backgroundColor: "#be185d",
                      boxShadow: "none",
                    },
                  }}
                >
                  {loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CircularProgress
                        size={17}
                        sx={{ color: "white" }}
                      />

                      Please Wait
                    </Box>
                  ) : (
                    "Add Product"
                  )}
                </Button>

              </CardActions>

            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}


/* ================= LABEL STYLE ================= */

const labelStyle = {
  display: "block",
  fontSize: "0.95rem",
  fontWeight: 500,
  color: "#334155",
  mb: 0.6,
};


/* ================= INPUT STYLE ================= */

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    minHeight: 40,
    borderRadius: 1.3,
    backgroundColor: "#ffffff",

    "& fieldset": {
      borderColor: "#cbd5e1",
    },

    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#db2777",
      borderWidth: 1,
    },
  },

  "& .MuiInputBase-input": {
    fontSize: "0.95rem",
    color: "#334155",
  },

  "& .MuiInputBase-input::placeholder": {
    color: "#94a3b8",
    opacity: 1,
    fontSize: "0.9rem",
  },
};

