import mongoose from 'mongoose';
// import { config } from 'dotenv';
export  async function connectDB()
{
    try{
      await mongoose.connect(`${process.env.MONGO_URL}/Ekart-YT`);
      console.log("MongoDB connected Successfully..")
    }
    catch(error){
      console.log("Failed to connect to MongoDB",error);
    }
}

//it will connect to mongodb
//VIMP express is not directly connected to the mongodb whatever operation perform on mongodb mongoose will perform it --->just express takes data from frontend through diffrent request and that data will be added by mongoose 
//👉 Express handles request → Mongoose sends data → MongoDB stores it

//till 35 min

