import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Import the check and times icons
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { useDispatch } from 'react-redux';
import { markOrderAsDelivered } from '../../slices/ordersApiSlice';
import { confirmAlert } from 'react-confirm-alert'; // Import the confirm alert library
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the CSS for the confirm alert
import { deleteOrder } from '../../slices/ordersApiSlice'; // Import the deleteOrder action from your Redux slice


const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  
  const handleDeliverOrder = (orderId) => {
    // Dispatch an action to mark the order as delivered
    dispatch(markOrderAsDelivered(orderId));
    // After dispatching the action, the order state will update automatically
  };
  const handleDeleteOrder = (orderId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this order?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Dispatch an action to delete the order
            dispatch(deleteOrder(orderId));
            // After dispatching the action, the order state will update automatically
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
               <th>STATUS</th>
              <th>DETAILS</th> {/* New column for the green checkmark */}
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                      {/* Display a checkmark if the order is delivered */}
                <td>
      {order.isDelivered ? (
        <FaCheck style={{ color: 'green' }} />
      ) : (
        <FaTimes style={{ color: 'red' }} />
      )}
    </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <Button
                      variant='primary'
                      className='btn-sm'
                      onClick={() => handleDeliverOrder(order._id)}
                    >
                      Mark as Delivered
                    </Button>
                  )}
                </td>
          
      
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
                  <td>
                    {/* New button for deleting an order */}
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </Button>
                  </td>
                  </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
