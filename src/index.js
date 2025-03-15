import connectDB from "./DB/dbConnect.js";
import dotenv from "dotenv"

dotenv.config({
    path : './env'
})

connectDB()













/*
this is the way in which we write all the code in the index file directly but it dosent look good so we will
use the db folder and write all these thing there and then call the function here keeping the code clean.
;( async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
        app.on("error",(error)=>{
            console.log("error",error);
            throw error; 
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on ${process.env.PORT}`);
            
        })

    } catch (error) {
        console.log(error);
        throw error;
    }
})()
*/