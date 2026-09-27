import razorpayInstance from "../config/razorpay.js";
import { Cart } from "../models/cartModel.js";
import { Order } from "../models/orderModel.js";
import crypto from "crypto";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";


export const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    console.log("=================================");
    console.log("CREATE ORDER BODY:", req.body);
    console.log("USER:", req.user);
    console.log("=================================");

    // -----------------------------------------
    // 1. Validate products
    // -----------------------------------------
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products provided",
      });
    }

    let subtotal = 0;

    // -----------------------------------------
    // 2. Get products from MongoDB
    // -----------------------------------------
    for (const item of products) {
      if (!item.productId || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product information",
        });
      }

      const product = await Product.findById(item.productId);

      console.log("PRODUCT FROM DATABASE:", product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      console.log("PRODUCT NAME:", product.productName);
      console.log("PRODUCT PRICE:", product.productPrice);
      console.log("QUANTITY:", item.quantity);

      // -----------------------------------------
      // 3. Validate product price
      // -----------------------------------------
      if (
        product.productPrice === undefined ||
        product.productPrice === null
      ) {
        return res.status(400).json({
          success: false,
          message: `Product price missing for ${product.productName}`,
        });
      }

      const price = Number(product.productPrice);
      const quantity = Number(item.quantity);

      if (!Number.isFinite(price) || !Number.isFinite(quantity)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product price or quantity",
        });
      }

      // -----------------------------------------
      // 4. Calculate product total
      // -----------------------------------------
      const itemTotal = price * quantity;

      console.log(
        `${product.productName}: ₹${price} × ${quantity} = ₹${itemTotal}`,
      );

      subtotal += itemTotal;
    }

    // -----------------------------------------
    // 5. Calculate tax
    // -----------------------------------------
    const tax = Number((subtotal * 0.05).toFixed(2));

    // -----------------------------------------
    // 6. Calculate shipping
    // -----------------------------------------
    const shipping = subtotal > 50 ? 0 : 10;

    // -----------------------------------------
    // 7. Calculate final amount
    // -----------------------------------------
    const totalAmount = Number(
      (subtotal + tax + shipping).toFixed(2),
    );

    console.log("=================================");
    console.log("SUBTOTAL:", subtotal);
    console.log("TAX:", tax);
    console.log("SHIPPING:", shipping);
    console.log("TOTAL AMOUNT:", totalAmount);
    console.log("=================================");

    // -----------------------------------------
    // 8. Validate final amount
    // -----------------------------------------
    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    // -----------------------------------------
    // 9. Convert INR to paise
    // -----------------------------------------
    const razorpayAmount = Math.round(totalAmount * 100);

    console.log("RAZORPAY AMOUNT IN PAISE:", razorpayAmount);

    // -----------------------------------------
    // 10. Create Razorpay order
    // -----------------------------------------
    const options = {
      amount: razorpayAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("RAZORPAY OPTIONS:", options);

    const razorpayOrder =
      await razorpayInstance.orders.create(options);

    // -----------------------------------------
    // 11. Save order in MongoDB
    // -----------------------------------------
    const newOrder = new Order({
      user: req.user._id,
      products,
      amount: totalAmount,
      tax,
      shipping,
      currency: "INR",
      status: "Pending",
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    // -----------------------------------------
    // 12. Send response
    // -----------------------------------------
    return res.status(200).json({
      success: true,
      order: razorpayOrder,
      dbOrder: newOrder,
    });
  } catch (error) {
    console.error("❌ ERROR IN CREATE ORDER:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};//new 

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentFailed,
    } = req.body;

    const userId = req.user._id;

    if (paymentFailed) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "Failed" },
        { returnDocument: "after" },
      );
      return res
        .status(400)
        .json({ success: false, message: "Payment failed", order });
    } //if payment getting failed

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "Paid",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
         { returnDocument: "after" },
      );

      await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [], totalPrice: 0 } },
      ); //after completing the payment and verifying the payment we have to make it to empty cart
      return res.json({ success: true, message: "Payment Successful", order });
    } 
    else {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "Failed",
        },
         { returnDocument: "after" },
      );

      return res
        .status(400)
        .json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error("❌ Error in verify Payment:",error)
    res.status(500).json({success:false,message:error.message})
  }
};

//user can see  his orders 
export const getMyOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      })
      .populate("user", "firstName lastName email");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: error.message });
  }
}; 

// only for admin
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params; // userId will come from URL
    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      }) // fetch product details
      .populate("user", "firstName lastName email"); // fetch user info

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log("Error fetching user order: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "firstName email") // populate user info
      .populate("products.productId", "productName productPrice productImg"); // 👈 productImg add kar diya hai

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

export const getSalesData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({ status: "Paid" });

    // Total sales amount
    const totalSaleAgg = await Order.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
   
    console.log("TotalSales Agg",totalSaleAgg);

    const totalSales = totalSaleAgg[0]?.total || 0;

    // Sales grouped by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const salesByDate = await Order.aggregate([
      {
        $match: {
          status: "Paid",
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt",timezone:"+05:30" },
          },
          amount: { $sum: "$amount" },
        },//shows id and amount with datewise
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    console.log("Sales By Date",salesByDate);

    const formattedSales = salesByDate.map((item) => ({
      date: item._id,
      amount: item.amount,
    }));

    console.log("FormatedSales",formattedSales);

    res.json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales,
      sales: formattedSales,
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

