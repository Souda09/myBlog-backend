// Create a migration script: backend/migrate.js
import mongoose from 'mongoose';
import cloudinary from './config/cloudinary.js';
import Blog from './models/Blog.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const migrateImages = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const blogs = await Blog.find({ image: { $regex: '/uploads/', $options: 'i' } });
  
  for (const blog of blogs) {
    console.log(`Migrating blog: ${blog._id}`);
    // Upload to Cloudinary
    const localPath = `./uploads/${blog.image.split('/').pop()}`;
    if (fs.existsSync(localPath)) {
      const result = await cloudinary.uploader.upload(localPath, {
        folder: 'blog-images'
      });
      blog.image = result.secure_url;
      await blog.save();
      console.log(`✅ Migrated: ${result.secure_url}`);
    }
  }
  
  console.log('Migration complete');
  process.exit();
};

migrateImages();