import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import ShopingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

export default function Navbar() {
  
  const {User}  = useSelector((store) => store.user); //now store can access any component beacuse store Provided globally -->useSelecotr read the data from the Store
  console.log("user",User)//here User==userSlice reducer, user==user from store
  
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const accessToken = localStorage.getItem("accessToken");

  async function logoutHandler() {
    try {
      let res = await axios.post(
        `http://localhost:5000/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data) {
        toast.success(res.data.message);
        dispatch(setUser(null));


      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error while logout",error.response)
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgba(252, 228, 236)",
        display: "flex",
        justifyContent: "space-between",
        minWidth:'100%'
      }}
    >
      <Box sx={{ color: "#de628f", fontWeight: 700 }}>
        <Toolbar>
          <ShopingCartIcon sx={{ fontSize: 35 }} />
          <Typography variant="h">KART</Typography>
        </Toolbar>
      </Box>

      <Box>
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
        >
          <Link to={"/"}>Home</Link>
          <Link to="/products">Products</Link>
          {User && <Link to={`/profile/${User._id}`}>Hello,{User.firstName}</Link>}
          <Link to='/cart'>
            <AddShoppingCartIcon  />
          </Link>
          {User ? (
            <Button
              onClick={() => logoutHandler()}
              variant="contained"
              sx={{ backgroundColor: "#de628f" }}
            >
              Logout
            </Button>   
          ) : (
            <Button onClick={()=>navigate('/login')} variant="contained" sx={{ backgroundColor: "purple" }}>
              Login
            </Button>
          )}
        </Toolbar>
      </Box>
    </Box>
  );
}

// NOTES--->Toolbar provide display: flex align-items: center min-height: navbar height padding left/right(Provide These Inbuilt Property)
// ✔ Row layout
// ✔ Proper navbar height
// ✔ Center alignment
// ✔ Padding
// ✔ Clean spacing
// ✔ Professional header layout
