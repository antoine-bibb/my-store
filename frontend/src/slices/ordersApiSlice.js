import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';
// Async Thunk to mark an order as delivered
 const markOrderAsDelivered = createAsyncThunk(
  'orders/markOrderAsDelivered',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderApiSlice.endpoints.deliverOrder.initiate(orderId); // Using the existing 'deliverOrder' endpoint from orderApiSlice
      return response.data; // Assuming response.data contains the updated order details
    } catch (error) {
      return rejectWithValue(error.response.data); // Assuming you handle errors appropriately in your service
    }
  }
);
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ORDERS_URL}/${orderId}`, {
        method: 'DELETE',
        headers: {
          // Add headers if required, like authorization headers, content-type, etc.
        },
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      // Assuming you don't need to return any data after deletion
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete order');
    }
  }
);
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;

export { markOrderAsDelivered }; // Exporting the new action creator
