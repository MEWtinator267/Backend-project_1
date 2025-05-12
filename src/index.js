import connectDB from "./DB/dbConnect.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path: './.env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{   // here the app listens.
        console.log(`the server is running at ${process.env.PORT}`,`\nIT IS RUNNING PERFECT `);
    })
    app.on("error",(error)=>{
        console.log(`Error in the app:`, error);    }) 
})
.catch((error)=>{
    console.log("error in connecting",error); // here the error handling is taking place which is written 
                                              // in the dbconnect folder while calling the mongo. 
})













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