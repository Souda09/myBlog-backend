// // import express from 'express';
// // import {
// //   getAllBlogs,
// //   getUserBlogs,
// //   getSingleBlog,
// //   createBlog,
// //   updateBlog,
// //   deleteBlog
// // } from '../controllers/blogController.js';
// // import { authMiddleware } from '../middleware/auth.js';
// // import { upload } from '../middleware/upload.js';

// // const router = express.Router();

// // router.get('/', getAllBlogs);
// // router.get('/my-blogs', authMiddleware, getUserBlogs);
// // router.get('/:id', getSingleBlog);
// // router.post('/', authMiddleware, upload.single('image'), createBlog);
// // router.put('/:id', authMiddleware, upload.single('image'), updateBlog);
// // router.delete('/:id', authMiddleware, deleteBlog);

// // export default router;

// // backend/routes/blogRoutes.js
// import express from 'express';
// import {
//   getAllBlogs,
//   getUserBlogs,
//   getSingleBlog,
//   createBlog,
//   updateBlog,
//   deleteBlog
// } from '../controllers/blogController.js';
// import { authMiddleware } from '../middleware/auth.js';
// import { upload } from '../middleware/upload.js';

// const router = express.Router();

// router.get('/', getAllBlogs);
// router.get('/my-blogs', authMiddleware, getUserBlogs);
// router.get('/:id', getSingleBlog);
// router.post('/', authMiddleware, upload.single('image'), createBlog);
// router.put('/:id', authMiddleware, upload.single('image'), updateBlog);
// router.delete('/:id', authMiddleware, deleteBlog);

// export default router;


// backend/routes/blogRoutes.js
import express from 'express';
import {
  getAllBlogs,
  getUserBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import { authMiddleware } from '../middleware/auth.js';

// ✅ PURANA BALAAV: Purane local upload middleware ko hata kar naye Cloudinary config se import kiya
import { upload } from '../config/cloudinary.js'; 

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getSingleBlog);

// Protected routes (Requires Authentication)
router.get('/my-blogs', authMiddleware, getUserBlogs);

// ✅ Create Blog - Isme upload.single('image') ab seedhe Cloudinary par image upload karega
router.post('/', authMiddleware, upload.single('image'), createBlog);

// ✅ Update Blog - Isme bhi nayi image seedhe Cloudinary par jayegi
router.put('/:id', authMiddleware, upload.single('image'), updateBlog);

router.delete('/:id', authMiddleware, deleteBlog);

export default router;