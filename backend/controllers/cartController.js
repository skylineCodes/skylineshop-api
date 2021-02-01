import asyncHandler from 'express-async-handler';
import Cart from '../models/cart.js';

// @desc Create new cart
// @route POST /api/carts
// @access Private
const addCartItems = asyncHandler(async (req, res) => {
  const {
    product,
    qty
  } = req.body;

    const cart = new Cart({
        user: req.user._id,
        product: product,
        qty
    });

    const createdCart = await cart.save();

    res.status(201).json(createdCart);
});

// @desc Read cart
// @route GET /api/carts
// @access Private
const getCartItems = asyncHandler(async (req, res) => {
    const carts = await Cart.find({}).populate(['product', 'user']);

    res.json(carts);
});

// @desc Read single cart
// @route GET /api/cart/:id
// @access Private
const getSingleCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id).populate(['product', 'user']);

    res.json(cart);
});

// @desc Update cart item
// @route PATCH /api/cart/:id
// @access Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { qty } = req.body;
  const cart = await Cart.findById(req.params.id);

  if (cart) {
    cart.qty = qty;

    const updatedCart = await cart.save();

    res.json(updatedCart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// @desc Delete cart item
// @route DELETE /api/cart/:id
// @access Private
const deleteCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if (cart) {
    await cart.remove();

    res.json({
      success: true,
      message: 'Cart deleted successfully!',
      data: req.params.id,
    });
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

export { addCartItems, getCartItems, getSingleCartItem, updateCartItem, deleteCartItem };
