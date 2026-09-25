import express from 'express'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js';
import { createOrder, getAllOrdersAdmin, getMyOrder, verifyPayment } from '../controllers/orderController.js';

const router=express.Router();

router.post('/create-order',isAuthenticated,createOrder)

router.post('/verify-payment',isAuthenticated,verifyPayment)

router.get('/myorder',isAuthenticated,getMyOrder);//this can visisble to the user only

router.get('/user-order/:userId',isAuthenticated,isAdmin,getAllOrdersAdmin);//this can visible to the admin only

router.get('/all',isAuthenticated,isAdmin,getAllOrdersAdmin);//this can visible to the admin only

export default router;