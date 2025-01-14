
import {v2 as cloudinary } from 'cloudinary'

// export const uploadImageToCloudinary = async(file,folder)=>{
//         const options = {folder};
//         // if(heigth){
//         //     options.heigth = heigth
//         // }
//         // if(quality){
//         //     options.quality = quality
//         // }
//         options.resource_type = "auto";

//     return cloudinary.uploader.upload(file.tempFilepath,options)
// }

export const uploadFile = async (file, folder, quality) => {
    const options = { folder, resource_type: "auto" };
    if (quality) {
      options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  };