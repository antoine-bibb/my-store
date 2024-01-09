import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    // Reference to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // Array of items in the order
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        size: { type: String, required: true },
      },
    ],
    // Shipping address details
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      state: { type: String, required: true },
    },
    // Payment method used for the order
    paymentMethod: {
      type: String,
      required: true,
    },
    // Details of the payment result
    paymentResult: {
      _id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    // Prices related to the order
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // Whether the order has been paid
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    // Whether the order has been delivered
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
