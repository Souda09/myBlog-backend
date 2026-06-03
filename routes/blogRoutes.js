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
import { upload, processImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/my-blogs', authMiddleware, getUserBlogs);
router.get('/:id', getSingleBlog);
router.post('/', authMiddleware, upload.single('image'), processImage, createBlog);
router.put('/:id', authMiddleware, upload.single('image'), processImage, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export default router;