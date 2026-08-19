export async function addProduct(req,res)
{
 try{
   const {productName,productDesc,productPrice,category,brand}=req.body;
   const userId=req.id;

   if(!productName||!productDesc||!productPrice||!category||!brand)
   {
    return res.status(400).json({success:false,message:"All fields are required.."});
   }

   //handle multiple Image Uploads
   let productImg=[];

   if(req.files && req.files.length>0)
   {
    
   }
 }
 catch(error)
 {
   return res.status(500).json({
        success:false,
        message:error.message
    })
 }
}