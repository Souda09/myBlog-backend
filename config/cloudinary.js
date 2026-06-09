





import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with your .env credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug logs - process.env se values le rahe hain
console.log("✅ Cloudinary Config:");
console.log("   Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME || "❌ Missing");
console.log("   API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Set" : "❌ Missing");
console.log("   API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Set" : "❌ Missing");

// Setup storage settings for Blog Images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_uploads', // The folder name inside your Cloudinary dashboard
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }] // Optional: resizes automatically
  },
});

const upload = multer({ storage: storage });



// ✅ Default export
export default cloudinary;









// 