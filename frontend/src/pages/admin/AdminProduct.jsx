import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider,
  Stack,
} from "@mui/material";

import { Edit, Search, Trash2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import { setProducts } from "@/redux/productSlice";
import ImageUpload from "@/component/ImageUpload";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);

  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  const dispatch = useDispatch();

  // -----------------------------
  // Search + Filter
  // -----------------------------

  let filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  ); //array of products --->filter those products which satisfies the condition

  // -----------------------------
  // Sort
  // -----------------------------

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice,
    );
  }

  if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice,
    );
  }

  // -----------------------------
  // Handle Edit Input
  // -----------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Open Edit Dialog
  // -----------------------------

  const handleEdit = (product) => {
    setEditProduct(product);
    setOpen(true);
  };

  // -----------------------------
  // Save Product
  // -----------------------------

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("category", editProduct.category);
    formData.append("brand", editProduct.brand);

    // Existing images
    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    // New images
    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Product Updated Successfully");

        const updateProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p,
        );

        dispatch(setProducts(updateProducts));

        setOpen(false);
        setEditProduct(null);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to update product");
    }
  };

  // -----------------------------
  // Open Delete Dialog
  // -----------------------------

  const handleDeleteClick = (productId) => {
    setDeleteProductId(productId);
    setDeleteOpen(true);
  };

  // -----------------------------
  // Delete Product
  // -----------------------------

  const deleteProductHandler = async () => {
    if (!deleteProductId) return;

    try {
      const remainingProducts = products.filter(
        (product) => product._id !== deleteProductId,
      );

      const res = await axios.delete(
        `http://localhost:5000/api/v1/product/delete/${deleteProductId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        dispatch(setProducts(remainingProducts));

        setDeleteOpen(false);
        setDeleteProductId(null);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <Box
      sx={{
    minHeight: "100%",
    width: "100%",
    minWidth: 0,
    maxWidth: "100%",
    boxSizing: "border-box",

    overflowX: "hidden",

    backgroundColor: "#f5f7fb",

    px: {
      xs: 2,
      sm: 3,
      md: 4,
      lg: 5,
    },

    py: {
      xs: 3,
      sm: 4,
      md: 6,
    },
  }}
    >
      {/* -------------------------------- */}
      {/* Header / Search / Sort */}
      {/* -------------------------------- */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Search */}

        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search product..."
          size="small"
          sx={{
            width: {
              xs: "100%",
              sm: 400,
            },
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={19} color="#6b7280" />
              </InputAdornment>
            ),
          }}
        />

        {/* Sort */}

        <FormControl
          size="small"
          sx={{
            minWidth: {
              xs: "100%",
              sm: 200,
            },
            backgroundColor: "#fff",
          }}
        >
          <InputLabel>Sort by Price</InputLabel>

          <Select
            value={sortOrder}
            label="Sort by Price"
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{
              borderRadius: 2,
            }}
          >
            <MenuItem value="">Default</MenuItem>

            <MenuItem value="lowToHigh">Price: Low to High</MenuItem>

            <MenuItem value="highToLow">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* -------------------------------- */}
      {/* Product List */}
      {/* -------------------------------- */}

      <Stack spacing={1.5}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                boxSizing: "border-box",

                border: "1px solid #e5e7eb",
                borderRadius: 2.5,
                backgroundColor: "#fff",
                transition: "0.2s ease",

                "&:hover": {
                  borderColor: "#cbd5e1",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: "12px 16px !important",
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: {
                      xs: 1,
                      sm: 2,
                    },

                    minWidth: 0,

                    flex: 1,
                  }}
                >
                  {/* Product Info */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    {/* Product Image */}

                    <Box
                      component="img"
                      src={product.productImg?.[0]?.url}
                      alt={product.productName}
                      sx={{
                        width: {
                          xs: 55,
                          sm: 72,
                        },

                        height: {
                          xs: 55,
                          sm: 72,
                        },

                        objectFit: "contain",

                        borderRadius: 2,

                        backgroundColor: "#f8fafc",

                        border: "1px solid #e5e7eb",

                        p: 0.5,

                        flexShrink: 0,
                      }}
                    />

                    {/* Product Name */}

                    <Box
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{
                          color: "#374151",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.productName}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",
                          mt: 0.3,
                        }}
                      >
                        {product.brand} • {product.category}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Price */}

                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{
                      color: "#1f2937",

                      whiteSpace: "nowrap",

                      flexShrink: 0,

                      fontSize: {
                        xs: "13px",
                        sm: "15px",
                      },
                    }}
                  >
                    ₹{product.productPrice}
                  </Typography>

                  {/* Actions */}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      flexShrink: 0,
                    }}
                  >
                    {/* Edit */}

                    <IconButton
                      onClick={() => handleEdit(product)}
                      sx={{
                        width: 38,
                        height: 38,
                        color: "#16a34a",
                        backgroundColor: "#f0fdf4",

                        "&:hover": {
                          backgroundColor: "#dcfce7",
                        },
                      }}
                    >
                      <Edit size={18} />
                    </IconButton>

                    {/* Delete */}

                    <IconButton
                      onClick={() => handleDeleteClick(product._id)}
                      sx={{
                        width: 38,
                        height: 38,
                        color: "#ef4444",
                        backgroundColor: "#fef2f2",

                        "&:hover": {
                          backgroundColor: "#fee2e2",
                        },
                      }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card
            elevation={0}
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: 2,
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: 6,
              }}
            >
              <Typography variant="h6" fontWeight={600} color="text.secondary">
                No products found
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Try searching with a different product name, brand, or category.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Stack>

      {/* ================================= */}
      {/* EDIT PRODUCT DIALOG */}
      {/* ================================= */}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditProduct(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            pb: 1,
          }}
        >
          Edit Product
        </DialogTitle>

        <Divider />

        <DialogContent
          sx={{
            pt: 3,
            maxHeight: "70vh",
          }}
        >
          <DialogContentText
            sx={{
              mb: 3,
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            Make changes to your product details and click save when you're
            done.
          </DialogContentText>

          <Stack spacing={2.2}>
            {/* Product Name */}

            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={editProduct?.productName || ""}
              onChange={handleChange}
              placeholder="Ex - iPhone"
              required
            />

            {/* Price */}

            <TextField
              fullWidth
              label="Price"
              name="productPrice"
              type="number"
              value={editProduct?.productPrice || ""}
              onChange={handleChange}
              required
            />

            {/* Brand + Category */}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={editProduct?.brand || ""}
                onChange={handleChange}
                placeholder="Ex - Apple"
                required
              />

              <TextField
                fullWidth
                label="Category"
                name="category"
                value={editProduct?.category || ""}
                onChange={handleChange}
                placeholder="Ex - Mobile"
                required
              />
            </Box>

            {/* Description */}

            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Description"
              name="productDesc"
              value={editProduct?.productDesc || ""}
              onChange={handleChange}
              placeholder="Enter brief description of product"
            />

            {/* Image Upload */}

            {editProduct && (
              <ImageUpload
                productData={editProduct}
                setProductData={setEditProduct}
              />
            )}
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions
          sx={{
            p: 2,
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
              setEditProduct(null);
            }}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              boxShadow: "none",

              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================================= */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ================================= */}

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}
        >
          Delete Product?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setDeleteOpen(false)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={deleteProductHandler}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              boxShadow: "none",

              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminProduct;
