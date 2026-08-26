import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const FilterSidebar = ({ allProducts,priceRange,setPriceRange,search,setSearch,category,setCategory,brand,setBrand }) => {
  const Categories = allProducts.map((p) => p.category); // get all product categories here
  const UniqueCategory = ["All", ...new Set(Categories)];

  const Brands = allProducts.map((p) => p.brand);
  const uniqueBrand = ["All", ...new Set(Brands)];

  console.log(uniqueBrand);

  function handleCategoryClick(val)
  {
    setCategory(val);
  }

  function handleBrandChange(e)
  {
    setBrand(e.target.value);
  }

  function handleMinChange(e)
  {
    const value=Number(e.target.value);
    if(value<=priceRange[1])
    {
      // setPriceRange([priceRange[0],value])
       setPriceRange([value, priceRange[1]])
    }
  }//

  function handleMaxChange(e)
  {
   const value=Number(e.target.value);
    if(value>=priceRange[0])
    {
      setPriceRange([priceRange[0],value])
    }
  }

  function resetFilters()
  {
    setSearch('');
    setCategory("All");
    setBrand('All');
    setPriceRange([0,999999])
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f3f4f6",
        mt: 10,
        p: 2,
        borderRadius: 1,
        height: "max-content",
        width: 256,
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      {/* Search */}
      <TextField
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        fullWidth
        size="small"
        sx={{
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
          },
        }}
      />

      {/* Category */}
      <Typography
        variant="h6"
        sx={{
          mt: 5,
          fontWeight: 600,
        }}
      >
        Category
      </Typography>

      <FormControl sx={{ mt: 1.5, width: "100%" }}>
        <RadioGroup>
          {UniqueCategory.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item}
              control={<Radio />}
              label={item}
              checked={category===item}
              onChange={()=>handleCategoryClick(item)}
              sx={{
                gap: 0.5,
                margin: 0,
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Brand */}
      <Typography
        variant="h6"
        sx={{
          mt: 5,
          fontWeight: 600,
        }}
      >
        Brands
      </Typography>

      <Select
        fullWidth
        size="small"
        sx={{
          mt: 1.5,
          backgroundColor: "white",
          borderRadius: 1,
        }}
        value={brand}
        onChange={handleBrandChange}
      >
        {uniqueBrand.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item.toUpperCase()}
          </MenuItem>
        ))}
      </Select>

      {/* Price Range */}
      <Typography
        variant="h6"
        sx={{
          mt: 5,
          mb: 1.5,
          fontWeight: 600,
        }}
      >
        Price Range
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="body2">Price Range: ₹{priceRange[0]}-₹{priceRange[1]}</Typography>

        {/* Min and Max Input */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <TextField
            type="number"
            inputProps={{
              min: 0,
              max: 5000,
            }}
            size="small"
            sx={{
              width: 80,
              backgroundColor: "white",
            }}
            value={priceRange[0]}
            onChange={handleMinChange}
          />

          <Typography>-</Typography>

          <TextField
            type="number"
            inputProps={{
              min: 0,
              max: 999999,
            }}
            size="small"
            sx={{
              width: 80,
              backgroundColor: "white",
            }}
            value={priceRange[1]}
            onChange={handleMaxChange}
          />
        </Box>

        {/* Minimum Price Slider */}
        <Box
          component="input"
          type="range"
          min="0"
          max="5000"
          step="100"
          sx={{
            width: "100%",
            cursor: "pointer",
          }}
          value={priceRange[0]}
          onChange={handleMinChange}
        />

        {/* Maximum Price Slider */}
        <Box
          component="input"
          type="range"
          min="0"
          max="999999"
          step="100"
          sx={{
            width: "100%",
            cursor: "pointer",
          }}
          value={priceRange[1]}
          onChange={handleMaxChange}
        />
      </Box>

      {/* Reset Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2.5,
          backgroundColor: "#db2777",
          color: "white",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#be185d",
          },
        }}
        onClick={resetFilters}
      >
        Reset Filter
      </Button>
    </Box>
  );
};

export default FilterSidebar;
