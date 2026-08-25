import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/productController.js";
import { multipleUpload } from "../middleware/multer.js";

const router=express.Router();

router.post('/add',isAuthenticated,isAdmin,multipleUpload,addProduct)//here we are adding the Product inside the db but only admin have that access to add --->to add the Product in db the user should be first logged In--->if user is looged then then we are passing the userId and and user to the req--->after that in admin Middleware we are checking that the user is Admin or Not if the user is admin then and then it can add the Product to the DB other wise Not
router.get('/getallproducts',getAllProducts)//anyone can access the allProducts (if they are not logged in also)
router.delete('/delete/:id',isAuthenticated,isAdmin,deleteProduct);
router.put('/update/:productId',isAuthenticated,isAdmin,multipleUpload,updateProduct)
export default router;