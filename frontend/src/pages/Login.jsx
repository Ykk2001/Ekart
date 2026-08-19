import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import {Link as RouterLink} from 'react-router-dom'
import {Link as MuiLink} from '@mui/material'
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();//A hook to access the redux dispatch function.

  const [formData,setFormData]=useState({
   email:'',
   password:''
  })

  function handleChange(e)
  {
    setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

 async function handleSubmit()
  { 
    try{
     let res=await axios.post(`http://localhost:5000/api/v1/user/login`,formData,{
      headers:{
        "Content-Type":'Application/json'
      }
     })
     
     if(res.data.success)
     {
      dispatch(setUser(res.data.user))
      toast.success(res.data.message);
      localStorage.setItem('accessToken',res.data.accessToken)//setting accessToken in localstorage after login so at the time of logout we are taking that accessToken from localstorage and passing that through the logout API so that user will get Authenticated and Then User will logged out
      console.log(" backend response after user login ",res)
      navigate('/');

     }
    //  console.log("Response after login",res)
    }
    catch(error)
    {
     toast.error(error.response.data.message);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fce4ec",
      }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: 4,
          boxShadow: 5,
          minWidth: 350,
          minHeight: 350,
        }}
      >
        <CardHeader title="User Login"></CardHeader>

        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}>

            <TextField type="email" label="Email" name="email" onChange={handleChange} />

            <TextField
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              label="Password"
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton>
                      {showPassword ? (
                        <VisibilityOff onClick={() => setShowPassword(false)} />
                      ) : (
                        <Visibility onClick={() => setShowPassword(true)} />
                      )}
                    </IconButton>
                  ),
                },
              }}
            />

            <Button variant="contained" onClick={handleSubmit}>Login</Button>

          </Box>
        </CardContent>

        <Typography >
          Don`t have an Account? <MuiLink component={RouterLink} to='/signup' sx={{textDecoration:'none',"&:hover":{
            textDecoration:"underline",
            color:'blue',
            cursor:'pointer'
          }}} >SignUp</MuiLink>
        </Typography>

      </Card>
    </Box>
  );
}
