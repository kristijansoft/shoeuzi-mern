import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'
import dotenv from 'dotenv'
dotenv.config()
import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_TEST_API_KEY)
import {v4 as uuid} from 'uuid'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  // console.log('visited')
  const {
    recipient,
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      recipient,
      user: req.user._id || null,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: new Date()
    })

    const createdOrder = await order.save()
    orderItems.map(async (item) => {
      console.log(item.productId)
      const product = await Product.findById(item.productId)
      if (product.countInStock >= item.quantity) {
        product.countInStock -= item.quantity
      } else {
        product.countInStock = 0
      }
      await product.save()
    })
    
    if(req.user && req.user._id) {
      const curCart = await Cart.findOne({user: req.user._id, checkOut: false});
      curCart.checkOut = true;
      await curCart.save()
    }

    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @desc    stripe checkout
// @route   GET /api/orders/stripecheckout
// @access  public
const stripeCheckout = asyncHandler(async (req, res) => {
  let error
  let status
  let shippingAddress
  let buyer, paymentMethod, paymentResult
  try {
    const { products, token } = req.body
    const description = products.reduce((desc, product, index) => {
      let prefix = ''
      if((index + 1) === products.length) prefix = ' and '
      else if(index) prefix = ', '
      return desc + prefix + product.name
    }, '')


    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${description}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    )
    status = 'success'
    shippingAddress = {
      address: charge.shipping.address.line1 || charge.shipping.address.line2,
      city: charge.shipping.address.city,
      postalCode : charge.shipping.address.postal_code,
      country: charge.shipping.address.country
    }
    buyer = charge.shipping.name
    paymentMethod = charge.payment_method_details.card.brand
    paymentResult = {
      id : charge.payment_method,
      status: charge.paid,
      email_address: charge.receipt_email,
      update_time: new Date(charge.created * 1000)
    }
  } catch (error) {
    status = 'failure'
  }
  res.json({error, status, address: shippingAddress, recipient: buyer, paymentMethod, paymentResult})
})



export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  stripeCheckout
}
