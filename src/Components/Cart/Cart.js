import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Import CSS file for styling
import PaymentDialog from '../PaymentDialog'; // Import the PaymentDialog component
import CartDialog from '../dialogBox/CartDialog';
import CartCounterBadge from '../CartCounterBadge';

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [cartItemsState, setCartItemsState] = useState(cartItems);
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const handlePopup = () => {
    setShowPopup(false);
  };
const handleCVVToggle = () => {
  setShowCVV(!showCVV);
};
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // State for total price

  // Update total price whenever cart items change
  useEffect(() => {
    const updatedTotalPrice = cartItemsState.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      return total + itemPrice * item.quantity;
    }, 0);
    setTotalPrice(updatedTotalPrice);
  }, [cartItemsState]); // Execute this effect when cartItemsState changes

  const removeFromCart = (productId) => {
    const updatedCart = cartItemsState.filter(item => item.id !== productId);
    setCartItemsState(updatedCart);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handlePayment = () => {
    // Simulate payment verification (for demo purposes)
    if (paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv) {
      setIsPaymentVerified(true);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        setIsPaymentVerified(false);
        navigate('/payment-confirmation');
      }, 5000); // Adjust the time according to your preference
    } else {
      alert('Please fill in all payment details.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value
    });
  };

  const showPaymentFieldsPopup = () => {
    setShowPaymentFields(true);
  };

  const handleClosePaymentFields = () => {
    setShowPaymentFields(false);
  };



  return (
    <div className="cart-page">
      {/* Display CartCounterBadge */}
      <CartCounterBadge cartItems={cartItemsState} />

      <h2>Shopping Cart</h2>
      {cartItemsState.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {/* Display cart items */}
          {cartItemsState.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                {/* Remove button */}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          {/* Button to show payment fields popup */}
          <button onClick={showPaymentFieldsPopup}>Pay Now</button>

          {/* Display total price */}
          <div className="total-price">
            <p>Total: ${totalPrice.toFixed(2)}</p>
          </div>

          {/* Display payment form */}
          {!isPaymentVerified && showPaymentFields && (
  <div className="popup">
    <div className="popup-content">
      <div className="payment-section">
        <h3>Payment Information</h3>
        <form onSubmit={handlePayment}>
          {/* Input fields for payment info */}
          <label>
            Card Number:
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            CVV:
            <div>
              <input
                type={showCVV ? 'text' : 'password'}
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleCVVToggle}>
                {showCVV ? 'Hide CVV' : 'Show CVV'}
              </button>
            </div>
          </label>
          <button type="submit">Verify Payment</button>
          <button type="button" onClick={handleClosePaymentFields}>Close</button>
        </form>
      </div>
    </div>
  </div>
)}


          {/* Display PaymentDialog component */}
          {showDialog && (
            <div className="popup">
              <div className="popup-content">
                <CartDialog
                  cartItems={cartItemsState}
                  total={totalPrice}
                  handleClose={handleCloseDialog}
                />
                <PaymentDialog 
                  cartItems={cartItemsState}
                  total={totalPrice}
                  handleClose={handleCloseDialog} 
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
