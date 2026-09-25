import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export async function getCart(req, res) {
  try {
    const userId = req.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId"); //getting the cart of particular user by its userID
    if (!cart) {
      return res.json({ success: true, cart: [] });
    }
    res.status(200).json({ success: true, cart }); //send the cart to the client
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //get Cart  -->whenever request coming for getCart then -->from middleware we are getting the userId -->from that id we are finfing the cart from the cart model



export async function addCart(req, res) {
  try {
    const userId = req.id;
    const { productId } = req.body;
    const product = await Product.findById(productId); //to add this product in cart Model it should be there in Product model
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    } //if it is not in Product model we are unable to add in Cart model

    //find the users cart if (exists)
    let cart = await Cart.findOne({ userId }); //finding th cart for particular user there will be one cart and multiple products in an items array

    //if cart is not there then create a new one -->if product is available to add -->and cart is not there so we have to create the new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity:1, price: product.productPrice }],
        totalPrice: product.productPrice,
      }); //added one product in a cart
    } else {
      //if cart is exist for particular user
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      ); //find the index of matching product that we are adding to the cart(tring to find the produc that is already in a cart) -->
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1; //increase the quantity
      } //means the product is there in items array just icrease the quantity
      else {
        cart.items.push({
          productId,
          quantity: 1,
          price: product.productPrice,
        });
      } //if item is not there in itemsList then we are pushing the item in items array in a cart
    }

    //Recalculate the total Price after adding the product in a cart
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,0
    ); //here is given one product price -->if product quantity is 3 then we have to multiply that quantity into price

    //Save the updated Cart
    await cart.save();

    //Populate product details before sending the response
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.productId",
    ); //Cart is consist of multiple user cart

    //send the response to the client
    res.status(200).json({
      success: true,
      message: "Product Added Successfully",
      cart: populatedCart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //add Cart


export async function updateQuantity(req, res) {
  try {
    const userId = req.id;
    const { productId, type } = req.body;

    let cart = await Cart.findOne({ userId }); //find the cart of particular user
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() == productId,
    ); //here we are finding the product from the items array in a cart
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    } //if there not item (product in a item array)

    if (type === "increase") {
      item.quantity += 1;
    }
    if (type == "decrease" && item.quantity > 1) {
      item.quantity -= 1;
    } //it should not be zero

    //updating the totalPrice after updating the qantity of product in a cart
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,0
    );

    await cart.save(); //after updating we are saving the cart

    cart = await cart.populate("items.productId");

    res.status(200).json({ success: true, cart }); //sending the updated cart to the client
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //here we are updating the cart of particular user -->by userId we find the cart -->by productId we find the product from the cart-->then by type we have increased the quantity or decreased the quant


export async function removeCart(req, res) {
  try {
    const userId = req.id;
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,0
    ); //after updating the cart again we are recalculating the totalprice of the cart

    await cart.save();//after updating the totalPrice and items we are saving the cart in mongodB
    
     // Populate product details before sending response
    await cart.populate("items.productId");

    res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //here i am getting the useId from the req and also getting the productId from the req.body --->from the userId i will find the cart-->and from the Productid i will removve the particular product from the cart -->after updating the cart again i will calculate the totalprice of the cart-->in that way cart will get updated -->then will send the response as a cart to the client



    



