import React from 'react'
import { Link } from "react-router-dom";
import { checkout } from '../functions/cart';

function ShoppingCart() {

    const handleCheckout = async () => {

        const resp = await checkout();
    }

    return (
        <div style={{ "text-align": "center" }}>
            <h1>Shopping Cart</h1>

            <h3>book</h3>
            <p>Price: $50.00</p>
            <p>Quantity: 1</p>
            <br />
            <h3>T-Shirt</h3>
            <p>Price: $20.00</p>
            <p>Quantity: 2</p>

            <button onClick={handleCheckout} >
                Proceed to Checkout
            </button>

        </div>
    )
}

export default ShoppingCart;