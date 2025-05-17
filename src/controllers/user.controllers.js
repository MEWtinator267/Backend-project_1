import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/APIerrors.js"
import {User} from "../models/user.modals.js"
import {uploading} from "../utils/uploadContent.js"
import {ApiResponse} from "../utils/APIresponse.js"

const registeruser = asyncHandler( async(req,res)=>{     // refer point 16
    const {fullname,username,email,password} = req.body
    console.log("email: ".email);

    if ([fullname,username,email,password].some((fields)=>fields?.trim() === "")) {
        throw new ApiError(400,"All fields are required")  // here we checked the field are empty or not
    }             
    // now we will write the code to find, if the user exist or not

    const existiense = await User.findone({
        $or:[{username},{email}]     // $or is the operator    // point 16
    })
    if (existiense) {
        throw new ApiError(409,"username and email exist")
    }

    //now check on on images and avatar

    const avatarlocalpath = req.files?.avatar[0]?.path  //here is the files [ath provided by multer.
    const coverimagelocalpath = req.files?.coverimage[0]?.path // same

    if (!avatarlocalpath) {
        throw new ApiError(400,"path not found")  // checked here
    }
    // now uploading ob the cloud

    const avatar = await uploading(avatarlocalpath) // here await is used to counter time taking
                                                    // to upload
    if (!avatar) {
        throw new ApiError(400,"path not found")   
    }

    // now we create the object
    
    const usercheck = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // here is to find user by id and remove the fields not to be taken
    const createduser = await User.findById(usercheck._id).select(
        "-password -refreshToken"  // here select is used to remove the things not to be taken
    )
    
    if (!createduser) {
        throw new ApiError(500,"something went wrong while registering user ")
    }

    return res.status(201).json(  // here we could have written directly jason(createduser)
                                  //but we didnt as this one makes server less loaded
        new ApiResponse(200,createduser,"User created sucessfully")
    )

})                                           

export {registeruser}