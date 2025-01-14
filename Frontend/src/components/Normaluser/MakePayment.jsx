import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

export default function MakePayment() {
    const token = localStorage.getItem('token');
    
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51PSt3t08e0elFpfHmHJWuYMBDN6lH4lv70KB97nICq2JMHLsYnpa16lqDaOYORRASMTgbTxLewb1KJScLwHrRKc800H5Fy4RNi");
        
        const productData = {
            contentType: "LocalNews",   
            price: 5000                 
        };

        // Sending product data to backend
        const response = await axios.post(
            "https://quick-public.onrender.com/api/v1/payment", 
            { product: productData },   
            { headers: {token} }  // Use authorization token in headers
        );

        // Handle Stripe redirection to checkout page
        const result = stripe.redirectToCheckout({ sessionId: response.data.id });

        if (result.error) {
            console.error("Stripe checkout failed:", result.error);
        }
    };

    return (
        <div>
            <button onClick={makePayment}>Proceed for Payment</button>
        </div>
    );
}
