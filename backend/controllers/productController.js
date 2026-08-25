import { Product } from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export async function addProduct(req, res) {
  try {
    const { productName, productDesc, productPrice, category, brand } =
      req.body;
    const userId = req.id;

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required.." });
    }

    //handle multiple Image Uploads
    let productImg = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "mern_products",
        }); //uploading the multiple files in cloudinary and from response we will get url and public id
        productImg.push({
          url: result.secure_url,
          public_id: result.public_id, //when we want to delete the image from the cloudinary for that we required public_id
        });
      }
    }

    //create a product in a Db
    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productImg, //arrau of objcts [{url,public_id},{url,public_id}]
      productPrice,
      category,
      brand,
    });

    return res.status(200).json({
      success: true,
      message: "Product Added Successfully..",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
} //add Product

export async function getAllProducts(req, res) {
  try {
    let products = await Product.find();
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Not Products Avilable",
        products: [],
      });
    }
    return res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
} //get all Products

export async function deleteProduct(req, res) {
  try {
    let productID = req.params.id;
    let product = await Product.findById(productID);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    //Delete Images from cloudinary
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      } //productimg is an array of an object consist of [{url,public_id},{url,public_id}]
    } //we can delete the images when productImg is not empty

    //Delete Product from MongoDb
    let deletedProduct = await Product.findByIdAndDelete(productID);
    return res.status(200).json({
      success: true,
      message: "Product has been Deleted Successfully",
      deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} //delete Product

export async function updateProduct(req, res) {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      existingImages,
    } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found..." });
    }

    let updatedImages = [];

    //keep selected old images
    if (existingImages) {
      const keepIds = JSON.parse(existingImages); //arrray of existing images public_id  (that we want to keep in cloudinary and rest we want to delete)

      updatedImages = product.productImg.filter((img) => {
        return keepIds.includes(img.public_id);
      }); //keeping the images that we want to keep from the cloudinary

      //delete only removed imges
      const removedImages = product.productImg.filter((img) => {
        return !keepIds.includes(img.public_id);
      }); //that are not existingImages which we have removed

      for (let img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      } //here actually we are removing the removingImages from the cloudinary
    } //existing Images are there
    else {
      updatedImages = product.productImg;
    } //keep all images if nothing is sent from user side
   
    //upload new images if any
    if(req.files && req.files.length>0)
    {
      for(let file of req.files)
      {
        const fileUri=getDataUri(file);
        const result=await cloudinary.uploader.upload(fileUri,{folder:'mern_products'});
        updatedImages.push({
          url:result.secure_url,
          public_id:result.public_id
        })
      }//here we are converting the each file into url and each file we are uploading inside the cloudinary -->after uploading we will get the url and public id from the cloudinary then we are pushing inside the updateImages
    }

    //at last we are updating the Product
    product.productName=productName||product.productName;//if productName has been passed from user then we are updating that else we are keeping previus name
    product.productDesc=productDesc||product.productDesc;
    product.productPrice=productPrice|| product.productPrice;
    product.category=category||product.category;
    product.brand=brand||product.brand;
    product.productImg=updatedImages;

    //after updating we are saving the product 
    await product.save();

    return res.status(200).json({success:true,message:"Product updated successfully",product});

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}//update the Product
