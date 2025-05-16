import { Router } from "express"
import { registeruser } from "../controllers/user.controllers.js"
import {upload, uploads} from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/register").post(    //this is the multer middleware, used just before the designation
    upload.fields([                // this is the upload multter function     // refer point 16.   
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }
    ]),
    registeruser
)

export default router