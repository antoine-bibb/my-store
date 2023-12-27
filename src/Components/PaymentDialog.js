import React, { useState } from 'react';

const PaymentDialog = ({ handlePayment, handleClose }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value
    });
  };

  return (
    <div className="payment-dialog">
      <h3>Payment Information</h3>
      <form>
        <label>
          Card Number:
          <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handleInputChange} />
        </label>
        <label>
          Expiry Date:
          <input type="text" name="expiryDate" value={paymentInfo.expiryDate} onChange={handleInputChange} />
        </label>
        <label>
          CVV:
          <input type="text" name="cvv" value={paymentInfo.cvv} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handlePayment}>Verify Payment</button>
        <button type="button" onClick={handleClose}>Close</button>
      </form>
    </div>
  );
};

export default PaymentDialog;
