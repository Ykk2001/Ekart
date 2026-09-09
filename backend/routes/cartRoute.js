import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { addCart, getCart, removeCart, updateQuantity } from "../controllers/cartController.js";

const router=express.Router()//router

router.get('/',isAuthenticated,getCart);
router.post('/add',isAuthenticated,addCart);
router.put('/update',isAuthenticated,updateQuantity);
router.delete('/remove',isAuthenticated,removeCart);

export default router;

