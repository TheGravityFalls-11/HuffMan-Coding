import  express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import ngoRoute from './routers/ngoform.js'
import cors from 'cors'

const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(urlencoded({extended:false}));

mongoose.connect(process.env.MONGO)
.then(()=> console.log("mongoDB is connected"))
.catch(()=>  console.log("mongoDB is not connected"))

app.use('/api/village',ngoRoute);


app.listen(process.env.PORT,()=>{
    console.log(`port is listening at ${process.env.PORT}`);
})