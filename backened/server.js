
import express from 'express' ;
import cors from 'cors' ;
import { configDotenv } from 'dotenv';
configDotenv() ;

import DBConnection from './config/database.js';
import userRouter from './routes/userRoutes.js';
const PORT = process.env.PORT || 4000 ;

DBConnection() ;
const app = express() ;
app.use(express.json()) ;
app.use(cors()) ;

app.use('/api/user', userRouter) ;
app.use('/api/user/forgotPass',userRouter)
app.use('/api/user/resetPass',userRouter) ;

app.listen(PORT, ()=>{
    console.log(`server is running ${PORT} port`);
}) ;

