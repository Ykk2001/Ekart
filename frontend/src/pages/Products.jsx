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
import { useDispatch,useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
export default function Products() {
  
  const [sortValue, setSortValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading,setLoading]=useState(false);
  const [priceRange,setPriceRange]=useState([0,999999]);
  const[search,setSearch]=useState('');
  const[category,setCategory]=useState("All");
  const[brand,setBrand]=useState("All");


  const {products}=useSelector(store=>store.product)

  const dispatch=useDispatch();

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
        dispatch(setProducts(res.data.products));
        
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
  }, []);//after fetching the all the  products we are passing the all the products to the store
  
  useEffect(()=>{
       if (allProducts.length===0)
       {
         return;
       }
       let filtered=[...allProducts];//here we are filtering the product by applying below condition like category ,brand ,priceRange,prodyctNAme

       if(search.trim()!=='')
       {
        filtered=filtered.filter(p=>p.productName?.toLowerCase().includes(search.toLowerCase()))
       }//by typing product Name we are filtering the Product 

       if(category!=="All")
       {
        filtered=filtered.filter(p=>p.category===category);
       }//if All is not there then we have to filter the category else we have to show the all category
       if(brand!=='All')
       {
        filtered=filtered.filter(p=>p.brand===brand)
       }//if All brand is no there then we have to show the particular selected brand -->according to we have to filter out
       filtered=filtered.filter(p=>p.productPrice>=priceRange[0] && p.productPrice<=priceRange[1])

       if(sortValue=='lowToHigh')
       {
        filtered.sort((a,b)=>a.productPrice-b.productPrice);
       }
       else if(sortValue=='highToLow')
       {
        filtered.sort((a,b)=>b.productPrice-a.productPrice);
       }//sorted the product from low price to high price or high price to low Price
      dispatch(setProducts(filtered))//after apllying the all the filter properties we will pass this into the redux store
  },[search,category,brand,sortValue,priceRange,allProducts,dispatch])//here we are filtering the Products by apllying certain filter condition


  return (
    <Box sx={{ pt: 10, pb: 5 }}>
      <Container maxWidth="xl" sx={{ display: "flex", gap: 3.5 }}>
        {/* Sidebar */}
        <FilterSidebar allProducts={allProducts} priceRange={priceRange} setPriceRange={setPriceRange}
         search={search} setSearch={setSearch} brand={brand} setBrand={setBrand} category={category} setCategory={setCategory}
        />

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
            {products.map((product) => (
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
//after fetching the products from the database or  after filtering the products from apllying certain filters we are storing the products array inside the redux store-->then when the redux state will change -->then we are fetching the newly updated products from the store with the help of useSelectore -->and showing on UI
