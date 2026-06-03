// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);
  
//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed'));
//   }
// };

// export const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: fileFilter
// });


// backend/middleware/upload.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Use memory storage for sharp processing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: fileFilter
});

// Process image with sharp - high quality
export const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const filename = `${timestamp}-${random}.webp`;
    const outputPath = path.join('uploads', filename);
    
    // Process image with sharp - HIGH QUALITY settings
    await sharp(req.file.buffer)
      .resize(1600, 1200, { 
        fit: 'inside', 
        withoutEnlargement: false,
        kernel: 'lanczos3' // High quality resampling
      })
      .webp({ 
        quality: 92,  // High quality (0-100)
        effort: 6,    // More effort = better quality
        lossless: false
      })
      .toFile(outputPath);
    
    // Store filename in req.file
    req.file.filename = filename;
    req.file.path = outputPath;
    
    next();
  } catch (error) {
    console.error('Image processing error:', error);
    next(error);
  }
};