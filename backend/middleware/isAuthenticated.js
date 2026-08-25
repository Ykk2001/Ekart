import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from '../models/userModel.js';
config();

export async function isAuthenticated(req,res,next)
{
  try{
   const authHeader=req.headers.authorization;
   if(!authHeader ||!authHeader.startsWith('Bearer'))
   {
    return res.status(400).json({success:false,message:"Missing Token Or Invalid Token"})
   }
   //decoding the token 
   const token=authHeader.split(' ')[1];
   let decoded;
   try{
    decoded=jwt.verify(token,process.env.SECRET_KEY);//it it will not decoded then it will give the error 
   }//inner try
   catch(err)
   {
     if(err.name==='TokenExpiredError')
     { 
         console.log("Token expired",err);
        return res.status(400).json({success:false,message:"The registration token has expired"});
     }
     return res.status(400).json({success:false,message:'Access token is missing or Invalid'})
   }//inner catch

   const user=await User.findById(decoded.id);//finding thr user
   if(!user)   
   {
    return res.status(400).json({success:false,message:"User not found"});
   }
   
   req.id=user._id;
   req.user=user;

   next();//calling next function after this function 

  }
  catch(error)
  {
    return res.status(500).json({success:false,message:error.message})
  }
}//it will find the user from the token and check the user is logged in or not from the token

export async function isAdmin(req,res,next)
{
 if(req.user && req.user.role=='admin' )
 {
  next()
 }
 else{
  return res.status(403).json({success:false,message:"access denied:admin can access only"})
 }
}//this api request can access only by admin user(role==admin )

//NOtes --->1) here will get token from header--->with the help of verify function we will decode the token -->from the decoded token we will get userId -->from that userId we will get user from the DB