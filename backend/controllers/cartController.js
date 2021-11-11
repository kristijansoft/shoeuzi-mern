import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'

// @desc    Add cart in case of loggedin user
// @route   POST /api/carts/add
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
  if(!req.user) {
    res.status(404).json({
      message: 'No registered user'
    })
    return
  }
  const user = req.user._id
  const { productId, quantity } = req.body
  const selectedProduct = await Product.findOne({_id: productId})
  // const totalPrice = selectedProduct.price * quantity;
  if(quantity > selectedProduct.countInStock) {
    res.status(404).json({
      message: 'There isn\'t enough inventory',
      quantity: selectedProduct.countInStock
    });
    return
  }
  const curCart = await Cart.findOne({user: user, checkOut: false})
  let addedCart;
  if(curCart) {
    const curProduct = curCart.products.filter(product => product.productId == productId)
    if(curProduct[0]) {
      curProduct[0].quantity = quantity
    } else {
      curCart.products.push({
        productId, 
        quantity,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        countInStock: selectedProduct.countInStock,
        priceWithTax: selectedProduct.priceWithTax || 0
      });
    }
    addedCart = await curCart.save();
  } else {
    const cart = new Cart({
      user,
      products: {
        productId, 
        quantity,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        countInStock: selectedProduct.countInStock
      }
    })
  
    addedCart = await cart.save();
  }
  res.status(201).json(addedCart)
})

// @desc    Get the not-checked cart of the loggedin user
// @route   GET /api/carts/
// @access  Private
const getCarts = asyncHandler(async (req, res) => {
  if(!req.user) {
    res.status(404).json({
      message: 'No registered user'
    })
    return
  }
  const user = req.user._id
  const cart = await Cart.find({user: user, checkOut: false})
  res.json(cart)
})

// @desc    Set the cart with the products before the user logs in
// @route   GET /api/carts/set
// @access  Private
const setCart = asyncHandler(async (req, res) => {
  if(!req.user) {
    res.status(404).json({
      message: 'No registered user'
    })
    return
  }
  const user = req.user._id
  const curCart = await Cart.findOne({user: user, checkOut: false})
  let newCart
  if(curCart) {
    curCart.products = req.body.products
    newCart = await curCart.save()
  } else {
    const cart = new Cart({
      user,
      products: req.body.products
    })
    
    newCart = await cart.save();
  }
  res.json(newCart)
})

// @desc    Get all the history of carts of the loggedin user
// @route   GET /api/carts/all
// @access  Private
const getAllCarts = asyncHandler(async (req, res) => {
  if(!req.user) {
    res.status(404).json({
      message: 'No registered user'
    })
    return
  }
  const user = req.user._id
  const carts = await Cart.find({user: user}).populate({
    path: 'products',
    populate: {
      path: 'product',
    }
  })
  res.json(carts)
})

// @desc    Update the cart with deleted Product
// @route   get /api/carts/delete/:productId
// @access  Public
const updateCart = asyncHandler(async (req, res) => {
  if(!req.user) {
    res.status(404).json({
      message: 'No registered user'
    })
    return
  }
  const productId = req.params.productId
  const query = { user: req.user._id }
  try {
    const curCart = await Cart.findOne(query);
    let id = curCart.products.map(item => item.product).indexOf(productId)
    curCart.products.splice(id, 1)
    const filteredCart = await curCart.save()
    res.status(201).json(filteredCart)
  } catch(err) {
    res.status(404)
    throw new Error(err)
  }
})

// @desc    Delete product on the cart
// @route   DELETE /api/carts/update/:productId
// @access  Private
const deleteCart = asyncHandler(async (req, res) => {
  if(!req.user) {
    res.status(404).json({
      message: 'No registered user'
    })
    return
  }
  const productId = req.params.productId
  const query = { user: req.user._id, checkOut: false }
  try {
    const curCart = await Cart.findOne(query);
    var id = curCart.products.map(item => item.product).indexOf(productId)
    curCart.products.splice(id, 1);
    const filteredCart = await curCart.save();
    res.status(201).json(filteredCart);
  } catch(err) {
    res.status(404)
    throw new Error(err)
  }
})

export {
  addProduct,
  updateCart,
  deleteCart,
  getCarts,
  getAllCarts,
  setCart
}