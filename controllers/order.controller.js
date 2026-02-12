import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  if (!cart) throw new Error("Cart is empty");

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user._id,
    items: cart.items,
    totalPrice
  });

  await Cart.deleteOne({ user: req.user._id });

  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product");

  res.json(orders);
});
