
// === File: client/src/components/Payment.jsx ===
import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
  const [amount, setAmount] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert('Razorpay SDK failed to load');

    const { data } = await axios.post('http://localhost:5000/api/payment/create-order', { amount });

    const options = {
      key: 'rzp_test_a3U6moP1LVql3W', // Replace with your Razorpay Key ID
      amount: data.order.amount,
      currency: 'INR',
      name: 'CodeForGood',
      description: 'Test Transaction',
      order_id: data.order.id,
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Revanth',
        email: 'test@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'CodeForGood Dev'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="container mt-5">
      <h2>Make a Payment</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="form-control my-2"
      />
      <button className="btn btn-primary" onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
}

export default Payment;