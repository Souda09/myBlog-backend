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
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getSingleBlog);

// Protected routes (require authentication)
router.get('/my-blogs', authMiddleware, getUserBlogs);  // ✅ Sirf apne blogs
router.post('/', authMiddleware, upload.single('image'), createBlog);
router.put('/:id', authMiddleware, upload.single('image'), updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export default router;