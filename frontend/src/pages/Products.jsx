import FilterSidebar from "@/component/FilterSidebar";
import ProductCard from "@/component/ProductCard";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Products() {
  const [sortValue, setSortValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading,setLoading]=useState(false);
  const [priceRange,setPriceRange]=useState([0,999999]);

  function handleChange(e) {
    setSortValue(e.target.value);
  }

  useEffect(() => {
    async function getAllProducts() {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/product/getallproducts`
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch products");
    }
    finally{
        setLoading(false);
    }
  }
    getAllProducts();
  }, []);

  return (
    <Box sx={{ pt: 10, pb: 5 }}>
      <Container maxWidth="xl" sx={{ display: "flex", gap: 3.5 }}>
        {/* Sidebar */}
        <FilterSidebar allProducts={allProducts} priceRange={priceRange} />

        {/* Main Product Section */}
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Sort Bar */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <FormControl sx={{ width: 200 }} size="small">
              <InputLabel>Sort by Price</InputLabel>
              <Select label="Sort by Price" onChange={handleChange} value={sortValue}>
                <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="highToLow">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Product Grid — now INSIDE the main section, next to the sidebar */}
          <Grid container spacing={3.5}>
            {allProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} loading={loading}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

