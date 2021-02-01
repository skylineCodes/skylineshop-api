import express from 'express';
const router = express.Router();
import {
  addCartItems,
  getCartItems,
  getSingleCartItem,
  updateCartItem,
  deleteCartItem,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addCartItems).get(protect, getCartItems);
router
  .route('/:id')
  .get(protect, getSingleCartItem)
  .patch(protect, updateCartItem)
  .delete(protect, deleteCartItem);

export default router;
