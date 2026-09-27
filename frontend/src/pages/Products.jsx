
import FilterSidebar from "@/component/FilterSidebar";
import ProductCard from "@/component/ProductCard";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

export default function Products() {
  const [sortValue, setSortValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");

  const { products } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  function handleChange(e) {
    setSortValue(e.target.value);
  }

  useEffect(() => {
    async function getAllProducts() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/product/getallproducts`
        );
        if (res.data.success) {
          setAllProducts(res.data.products);
          dispatch(setProducts(res.data.products));
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    getAllProducts();
  }, [dispatch]);

  useEffect(() => {
    if (allProducts.length === 0) {
      return;
    }

    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]
    );

    if (sortValue === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortValue === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProducts(filtered));
  }, [search, category, brand, sortValue, priceRange, allProducts, dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        pt: { xs: 3, md: 5 },
        pb: 8,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          gap: { xs: 2, md: 3.5 },
          alignItems: "flex-start",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Sticky Filter Sidebar */}
        <FilterSidebar
          allProducts={allProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          category={category}
          setCategory={setCategory}
        />

        {/* Main Product Catalog Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Top Bar: Results Count + Sort Dropdown */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
              backgroundColor: "#ffffff",
              p: 2,
              borderRadius: 2.5,
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px -2px rgba(15, 23, 42, 0.04)",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "#0f172a",
                }}
              >
                All Products
              </Typography>
              <Typography sx={{ fontSize: "0.88rem", color: "#64748b" }}>
                Showing {products?.length || 0} items
              </Typography>
            </Box>

            <FormControl
              size="small"
              sx={{
                minWidth: 190,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  "& fieldset": { borderColor: "#e2e8f0" },
                  "&:hover fieldset": { borderColor: "#cbd5e1" },
                  "&.Mui-focused fieldset": { borderColor: "#db2777" },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#db2777",
                },
              }}
            >
              <InputLabel id="sort-select-label">Sort by Price</InputLabel>
              <Select
                labelId="sort-select-label"
                label="Sort by Price"
                value={sortValue}
                onChange={handleChange}
                sx={{ fontSize: "0.92rem" }}
              >
                <MenuItem value="" sx={{ fontSize: "0.92rem" }}>
                  Default
                </MenuItem>
                <MenuItem value="lowToHigh" sx={{ fontSize: "0.92rem" }}>
                  Price: Low to High
                </MenuItem>
                <MenuItem value="highToLow" sx={{ fontSize: "0.92rem" }}>
                  Price: High to Low
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Product Grid Area */}
          {loading ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton
                  key={item}
                  variant="rectangular"
                  height={460}
                  sx={{ borderRadius: 2.5 }}
                />
              ))}
            </Box>
          ) : products?.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 10,
                backgroundColor: "#ffffff",
                borderRadius: 3,
                border: "1px dashed #cbd5e1",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#334155",
                  mb: 1,
                }}
              >
                No products found
              </Typography>
              <Typography sx={{ color: "#64748b", fontSize: "0.95rem" }}>
                Try adjusting your search query, price ranges, or applied filters.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
                alignItems: "stretch",
              }}
            >
              {products.map((product) => (
                <Box key={product._id} sx={{ minWidth: 0, height: "100%" }}>
                  <ProductCard product={product} loading={loading} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}