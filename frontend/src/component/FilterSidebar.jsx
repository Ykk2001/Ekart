// import React from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Select,
//   MenuItem,
// } from "@mui/material";

// const FilterSidebar = ({ allProducts,priceRange,setPriceRange,search,setSearch,category,setCategory,brand,setBrand }) => {
//   const Categories = allProducts.map((p) => p.category); // get all product categories here
//   const UniqueCategory = ["All", ...new Set(Categories)];

//   const Brands = allProducts.map((p) => p.brand);
//   const uniqueBrand = ["All", ...new Set(Brands)];

//   console.log(uniqueBrand);

//   function handleCategoryClick(val)
//   {
//     setCategory(val);
//   }

//   function handleBrandChange(e)
//   {
//     setBrand(e.target.value);
//   }

//   function handleMinChange(e)
//   {
//     const value=Number(e.target.value);
//     if(value<=priceRange[1])
//     {
//       // setPriceRange([priceRange[0],value])
//        setPriceRange([value, priceRange[1]])
//     }
//   }//

//   function handleMaxChange(e)
//   {
//    const value=Number(e.target.value);
//     if(value>=priceRange[0])
//     {
//       setPriceRange([priceRange[0],value])
//     }
//   }

//   function resetFilters()
//   {
//     setSearch('');
//     setCategory("All");
//     setBrand('All');
//     setPriceRange([0,999999])
//   }

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#f3f4f6",
//         mt: 10,
//         p: 2,
//         borderRadius: 1,
//         height: "max-content",
//         width: 256,
//         display: {
//           xs: "none",
//           md: "block",
//         },
//       }}
//     >
//       {/* Search */}
//       <TextField
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e)=>setSearch(e.target.value)}
//         fullWidth
//         size="small"
//         sx={{
//           backgroundColor: "white",
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 1,
//           },
//         }}
//       />

//       {/* Category */}
//       <Typography
//         variant="h6"
//         sx={{
//           mt: 5,
//           fontWeight: 600,
//         }}
//       >
//         Category
//       </Typography>

//       <FormControl sx={{ mt: 1.5, width: "100%" }}>
//         <RadioGroup>
//           {UniqueCategory.map((item, index) => (
//             <FormControlLabel
//               key={index}
//               value={item}
//               control={<Radio />}
//               label={item}
//               checked={category===item}
//               onChange={()=>handleCategoryClick(item)}
//               sx={{
//                 gap: 0.5,
//                 margin: 0,
//               }}
//             />
//           ))}
//         </RadioGroup>
//       </FormControl>

//       {/* Brand */}
//       <Typography
//         variant="h6"
//         sx={{
//           mt: 5,
//           fontWeight: 600,
//         }}
//       >
//         Brands
//       </Typography>

//       <Select
//         fullWidth
//         size="small"
//         sx={{
//           mt: 1.5,
//           backgroundColor: "white",
//           borderRadius: 1,
//         }}
//         value={brand}
//         onChange={handleBrandChange}
//       >
//         {uniqueBrand.map((item, index) => (
//           <MenuItem key={index} value={item}>
//             {item.toUpperCase()}
//           </MenuItem>
//         ))}
//       </Select>

//       {/* Price Range */}
//       <Typography
//         variant="h6"
//         sx={{
//           mt: 5,
//           mb: 1.5,
//           fontWeight: 600,
//         }}
//       >
//         Price Range
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 1,
//         }}
//       >
//         <Typography variant="body2">Price Range: ₹{priceRange[0]}-₹{priceRange[1]}</Typography>

//         {/* Min and Max Input */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 1,
//             alignItems: "center",
//           }}
//         >
//           <TextField
//             type="number"
//             inputProps={{
//               min: 0,
//               max: 5000,
//             }}
//             size="small"
//             sx={{
//               width: 80,
//               backgroundColor: "white",
//             }}
//             value={priceRange[0]}
//             onChange={handleMinChange}
//           />

//           <Typography>-</Typography>

//           <TextField
//             type="number"
//             inputProps={{
//               min: 0,
//               max: 999999,
//             }}
//             size="small"
//             sx={{
//               width: 80,
//               backgroundColor: "white",
//             }}
//             value={priceRange[1]}
//             onChange={handleMaxChange}
//           />
//         </Box>

//         {/* Minimum Price Slider */}
//         <Box
//           component="input"
//           type="range"
//           min="0"
//           max="5000"
//           step="100"
//           sx={{
//             width: "100%",
//             cursor: "pointer",
//           }}
//           value={priceRange[0]}
//           onChange={handleMinChange}
//         />

//         {/* Maximum Price Slider */}
//         <Box
//           component="input"
//           type="range"
//           min="0"
//           max="999999"
//           step="100"
//           sx={{
//             width: "100%",
//             cursor: "pointer",
//           }}
//           value={priceRange[1]}
//           onChange={handleMaxChange}
//         />
//       </Box>

//       {/* Reset Button */}
//       <Button
//         variant="contained"
//         fullWidth
//         sx={{
//           mt: 2.5,
//           backgroundColor: "#db2777",
//           color: "white",
//           cursor: "pointer",
//           "&:hover": {
//             backgroundColor: "#be185d",
//           },
//         }}
//         onClick={resetFilters}
//       >
//         Reset Filter
//       </Button>
//     </Box>
//   );
// };

// export default FilterSidebar;



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
  Divider,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const FilterSidebar = ({
  allProducts = [],
  priceRange,
  setPriceRange,
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
}) => {
  const Categories = allProducts.map((p) => p.category);
  const UniqueCategory = ["All", ...new Set(Categories.filter(Boolean))];

  const Brands = allProducts.map((p) => p.brand);
  const uniqueBrand = ["All", ...new Set(Brands.filter(Boolean))];

  function handleCategoryClick(val) {
    setCategory(val);
  }

  function handleBrandChange(e) {
    setBrand(e.target.value);
  }

  function handleMinChange(e) {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
    }
  }

  function handleMaxChange(e) {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) {
      setPriceRange([priceRange[0], value]);
    }
  }

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  }

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 2.5,
        p: 2.5,
        width: { md: 280, lg: 300 },
        flexShrink: 0,
        height: "fit-content",
        position: { md: "sticky" },
        top: { md: 24 },
        boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography sx={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
          Filters
        </Typography>
        <Button
          size="small"
          onClick={resetFilters}
          startIcon={<RestartAltIcon fontSize="small" />}
          sx={{
            textTransform: "none",
            color: "#db2777",
            fontWeight: 600,
            fontSize: "0.85rem",
            "&:hover": { backgroundColor: "#fdf2f8" },
          }}
        >
          Reset
        </Button>
      </Box>

      {/* Search */}
      <TextField
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#94a3b8", fontSize: "1.2rem" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1.8,
            backgroundColor: "#f8fafc",
            "& fieldset": { borderColor: "#e2e8f0" },
            "&:hover fieldset": { borderColor: "#cbd5e1" },
            "&.Mui-focused fieldset": { borderColor: "#db2777" },
          },
          "& .MuiInputBase-input": { fontSize: "0.95rem" },
        }}
      />

      <Divider sx={{ my: 2.5 }} />

      {/* Category */}
      <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", mb: 1 }}>
        Category
      </Typography>

      <FormControl sx={{ width: "100%" }}>
        <RadioGroup>
          {UniqueCategory.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item}
              control={
                <Radio
                  size="small"
                  sx={{
                    color: "#cbd5e1",
                    "&.Mui-checked": { color: "#db2777" },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.92rem", color: category === item ? "#0f172a" : "#475569", fontWeight: category === item ? 600 : 400 }}>
                  {item}
                </Typography>
              }
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
              sx={{ my: 0.2 }}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 2.5 }} />

      {/* Brand */}
      <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", mb: 1 }}>
        Brand
      </Typography>

      <Select
        fullWidth
        size="small"
        value={brand}
        onChange={handleBrandChange}
        sx={{
          borderRadius: 1.8,
          backgroundColor: "#f8fafc",
          "& fieldset": { borderColor: "#e2e8f0" },
          "&:hover fieldset": { borderColor: "#cbd5e1" },
          "&.Mui-focused fieldset": { borderColor: "#db2777" },
          fontSize: "0.92rem",
        }}
      >
        {uniqueBrand.map((item, index) => (
          <MenuItem key={index} value={item} sx={{ fontSize: "0.92rem" }}>
            {item.toUpperCase()}
          </MenuItem>
        ))}
      </Select>

      <Divider sx={{ my: 2.5 }} />

      {/* Price Range */}
      <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
        Price Range
      </Typography>

      <Typography sx={{ fontSize: "0.85rem", color: "#64748b", mb: 1.5 }}>
        ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {/* Min and Max Inputs */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            type="number"
            placeholder="Min"
            size="small"
            value={priceRange[0]}
            onChange={handleMinChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
                backgroundColor: "#f8fafc",
              },
              "& .MuiInputBase-input": { fontSize: "0.88rem", py: 0.8 },
            }}
          />
          <Typography sx={{ color: "#94a3b8" }}>-</Typography>
          <TextField
            type="number"
            placeholder="Max"
            size="small"
            value={priceRange[1]}
            onChange={handleMaxChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
                backgroundColor: "#f8fafc",
              },
              "& .MuiInputBase-input": { fontSize: "0.88rem", py: 0.8 },
            }}
          />
        </Box>

        {/* Sliders */}
        <Box
          component="input"
          type="range"
          min="0"
          max="5000"
          step="100"
          value={priceRange[0]}
          onChange={handleMinChange}
          sx={{
            width: "100%",
            accentColor: "#db2777",
            cursor: "pointer",
          }}
        />

        <Box
          component="input"
          type="range"
          min="0"
          max="999999"
          step="1000"
          value={priceRange[1]}
          onChange={handleMaxChange}
          sx={{
            width: "100%",
            accentColor: "#db2777",
            cursor: "pointer",
          }}
        />
      </Box>
    </Paper>
  );
};

export default FilterSidebar;