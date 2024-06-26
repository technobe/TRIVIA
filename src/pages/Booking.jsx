import React, { useState } from 'react';
import "../styles/Booking.scss"; // Import the CSS file

export default function Booking() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [paymentStatus, setPaymentStatus] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessingPayment(true);

    // Simulate API call to payment gateway
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment validation (basic validation for demonstration)
      if (paymentDetails.cardNumber && paymentDetails.expiryDate && paymentDetails.cvv) {
        // Payment successful
        setPaymentStatus('Payment successful');
      } else {
        throw new Error('Payment details are incomplete');
      }
    } catch (error) {
      setPaymentStatus('Payment failed: ' + error.message);
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <div className="container">
      <h2>Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            required
            disabled={processingPayment}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleInputChange}
            required
            disabled={processingPayment}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            required
            disabled={processingPayment}
          />
        </div>
        <button type="submit" disabled={processingPayment}>
          {processingPayment ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  );
}
