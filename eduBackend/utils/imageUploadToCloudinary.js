const cloudinary = require('cloudinary').v2

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (file, folder, height, quality, resourceType = 'image') =>{
    const options = {folder};
    if(height){
        options.height= height;
    }
    if(quality){
        options.quality=quality
    }
    options.resource_type = resourceType;

    const source = typeof file === 'string' ? file : file?.tempFilePath;
    if (!source) {
        throw new Error('An image file or data URL is required');
    }

    return await cloudinary.uploader.upload(source, options);
}

module.exports = { uploadImageToCloudinary };