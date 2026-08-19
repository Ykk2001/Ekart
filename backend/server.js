import { config } from 'dotenv';//loads .env file content inside process.env
config();
import express from 'express';
import router from './routes/userRoutes.js';
import  {connectDB } from './database/db.js';
import cors from 'cors'

const app=express();

const PORT=process.env.PORT ||5000 //process.env is global object in node js  it stores environment variables

//middleware
app.use(cors({origin:"http://localhost:5173",credentials:true}))//This allows all origins. from frontend and from any device
app.use(express.json());//in app.use() middleware will get mounted express.json() parses the json into real object

//Routes
app.get('/',(req,res)=>{
   res.send("Server is Running...");
})

app.use('/api/v1/user',router);//base api url for the userController

 connectDB();  

app.listen(PORT,()=>{
    // connectDB()
  console.log(`server is listening on port: ${PORT}`);
})    // when server will get run port will get registered

//NOTES-----> 2nd Vedio is going on -->completed till 50:00 m () update user is going on

//Flow of the project in backend-->1) server creation through express --->2)mongodb connected through mongoose--->3)

//password for ykhatake6@gmail.com -->Yogesh@456

