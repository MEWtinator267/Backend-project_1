import express from "express"
import CookieParser from "cookieparser"
import cors from "cors"

const app = express()

app.use((cros)=>{
    origin:process.env.CROS_ORIGIN,  //line used to handel cros
    Credential = true
})
app.use(express.json({limit: "16kb"})) //used to handel the data in json format
app.use(express.urlencoded) //used to read the url type of data (url/search bar shit)
app.use(express.static("public")) //used for storing reuseable data in the public folder .
app.use(CookieParser) //used to store and access cookies.

app.use(express.json({limit:"16kb"}))

export {app}