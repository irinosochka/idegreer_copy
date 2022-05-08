import React from 'react';
import UserCart from "../components/UserPanel/UserCart";
import '../pages/cartPage.css';

const CartPage = () => {
    return (
        <div className="shopping__cart">
            <div className="shopping__cart__header">
                <h3 className="cart_heading">Your shopping cart</h3>
                <h5 className="cart_action">Remove all</h5>
            </div>
            <UserCart/>
            <div className="shopping__cart__checkout">
                <div className="cart-total">

                </div>
            </div>
        </div>
    );
};

export default CartPage;