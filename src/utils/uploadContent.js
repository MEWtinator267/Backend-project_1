import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const uploading = async (filepath)=>{

    try {
        if(!filepath) return null
        
    const response = await cloudinary.uploader.upload(filepath,{
            resource_type:"auto"  // file uploaded here
        })
        // now as the file is uploaded sucessfully  console log
    console.log("file uploaded",response.url)
    return response;   

    } catch (error) {
        fs.unlinkSync(uploading) // remove the file from teporary storage if failed
    }
}

export {uploading}



// const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });