import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// import asyncHandler from '../middleware/asyncHandler.js';
// import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};

// /**
//  *  @description Create new order
//  *  @route POST/api/orders
//  *  @access Private
//  */
// const addOrderItems = asyncHandler(async (req, res) => {
//   const {
//     orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemPrice,
//     shippingPrice,
//     taxPrice,
//     totalPrice,
//   } = req.body;

//   if (orderItems && orderItems.length === 0) {
//     res.status(400);
//     throw new Error("No Order Items");
//   } else {
//     const order = new Order({
//       orderItems: orderItems.map((x) => ({
//         ...x,
//         product: x._id,
//         _id: undefined,
//       })),
//       user: req.user._id,
//       shippingAddress,
//       paymentMethod,
//       itemPrice,
//       shippingPrice,
//       taxPrice,
//       totalPrice,
//     });

//     const createOrder = await order.save();
//   }

//   res.status(201).json(createOrder);
// });

// /**
//  *  @description Get logged in user orders
//  *  @route GET/api/orders/myorders
//  *  @access Private
//  */
// const getMyOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });
//   res.status(200).json(orders);
// });

// /**
//  *  @description Get order by id
//  *  @route GET/api/orders/:id
//  *  @access Private
//  */
// const getOrderById = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id).populate(
//     "user",
//     "name email"
//   );

//   if (order) {
//     res.status(200).json(order);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }

//   res.status(200).json(order);
// });
// /**
//  *  @description Update order to paid
//  *  @route get /api/orders/:id/pay
//  *  @access Private
//  */
// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   res.send("Update order to paid");
// });
// /**
//  *  @description Update order to delivered
//  *  @route get /api/orders/:id/deliver
//  *  @access Private/Admin
//  */
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   res.send("Update order to delivered");
// });

// /**
//  *  @description Get all Orders
//  *  @route get /api/orders/
//  *  @access Private/Admin
//  */
// const getOrders = asyncHandler(async (req, res) => {
//   res.send("All orders");
// });

// export {
//   addOrderItems,
//   getMyOrders,
//   getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   getOrders,
// };
