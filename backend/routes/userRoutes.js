import express from "express";
import {
  alluser,
  changePassword,
  forgetPassword,
  getUserById,
  login,
  logout,
  register,
  reVerify,
  updateUser,
  verify,
  verifyOTP,
} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

//for user register
router.post("/register", register);
router.post("/verify", verify);
router.post("/reverify", reVerify);

//for user login and logout
router.post("/login", login);
router.post("/logout", isAuthenticated, logout); //before clicking the logout btn first it will chech the user is logged in Or not (if user is exist then it will logout)

//for changing the password
router.post("/forget-password", forgetPassword); //sent the otp on mail
router.post("/verify-otp/:email", verifyOTP); //verify the otp
router.post("/change-password/:email", changePassword); //update the new password

//fetch all user and update the particular user
router.get("/all-user", isAuthenticated, isAdmin, alluser);
router.get("/get-user/:userId", getUserById); 
router.put("/update/:id", isAuthenticated, singleUpload, updateUser);
export default router; 

