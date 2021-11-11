import mongoose from 'mongoose';

/**
 * Cart Schema
 */
const CartItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: Number,
  price: Number,
  name: String,
  image: String,
  countInStock: Number,
  priceWithTax: {
    type: Number,
    default: 0
  }
})

// Cart Schema
const CartSchema = mongoose.Schema({
  products: [CartItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
  updated: Date,
    type: Date,
    default: Date.now
  },
  checkOut: {
    type: Boolean,
    default: false
  }
})

const Cart = mongoose.model('Cart', CartSchema)
export default Cart
