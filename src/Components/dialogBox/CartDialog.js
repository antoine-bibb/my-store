import React from 'react';

const CartDialog = ({ cartItems, total, handleClose }) => {
  return (
    <div className="cart-dialog">
      <div className="cart-dialog-content">
        <h3>Items Added to Cart:</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <p>Total: ${total.toFixed(2)}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default CartDialog;
