import express from 'express'
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js'
import {
  addProduct, 
  getAllCarts, 
  getCarts,
  updateCart,
  deleteCart,
  setCart
} from '../controllers/cartController.js'

router.route('/').get(protect, getCarts);
router.route('/all').get(protect, getAllCarts);
router.route('/add').post(protect, addProduct);
router.route('/set').post(protect, setCart);
router.route('/delete/:productID').get(protect, updateCart);
router.route('/delete/:productID').delete(protect, deleteCart);

export default router;
