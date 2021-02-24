import express from 'express';
const router = express.Router();
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getAllBlogs).post(protect, admin, createBlog);
router
  .route('/:id')
  .get(getBlogById)
  .patch(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

export default router;
