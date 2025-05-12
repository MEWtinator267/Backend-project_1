import express from "express"
import CookieParser from "cookieparser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,  // line used to handle CORS
    credentials: true
}))

app.use(express.json({limit: "16kb"})) //used to handel the data in json format
app.use(express.urlencoded({extended:true})) //used to read the url type of data (url/search bar shit)
app.use(express.static("public")) //used for storing reuseable data in the public folder .
app.use(CookieParser) //used to store and access cookies.

//router imports
import userrouter from "./router/user.routes.js"

//routes decleration
app.use("/api/v1/users", userrouter);

export {app}