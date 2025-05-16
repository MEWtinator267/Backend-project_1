import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userschema = new Schema(
    {
        username:{
            type: String,
            required : true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            required : true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname:{
            type: String,
            required : true,
            trim: true,
            index: true
        },
        avatar:{
            type: String,
            required : true   // cloudnary
        },
        coverimage:{
            type: String  // cloudnary
        },
        watchhistory:[
            {
                type: Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type: String,
            required: [true,'password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps:true
    }
)

userschema.pre("save",async function(next){  //here a hook is used on the userschema a "pre" hook used to code to run before actual code.
               // here it will run before the save as seen above to hash the password for safety.
    if(!this.ismodified("password")) return next() // here is a if condition so that it dosent run numerous time.
    this.password = await bcrypt.hash(this.password,10)//this. is a keyword that automatically selects the userschema objects. 
})

// now we can make our own methods to check password is correct of not:-
userschema.methods.ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password,this.password) // it returns value in true or false.
}

userschema.methods.generateAccessToken = function(){
     jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullname:this.fullname,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY //expires is written inside curly brakets.
        }
     )
}

userschema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY //expires is written inside curly brakets.
        }
     )
}

export const User = mongoose.model("User",userschema)