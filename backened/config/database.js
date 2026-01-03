
import mongoose from 'mongoose' ;

const DBConnection  = async() =>{
    mongoose.connection.on("connected", ()=>{
        console.log("DataBase Connected Successfully") ;
    }) ;

    const options = {
        connectTimeoutMs : 30000,
        socketTimeoutMs : 45000,
        serverSelectionTimeoutMs: 5000
    };
    // console.log(process.env.MONGODB_URL);
    
    await mongoose.connect(process.env.MONGODB_URL, options) ;
}

export default DBConnection ;
