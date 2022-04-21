import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import { CartContext } from '../../contexts/CartContext';
import CartItems from './CartItems';

function CartPage() {
    //rk: usecontext to get user detail and cartItems, to get  isloggedIn status and return appropriate page
    const { isLoggedIn, loggedInUser } = useContext(LoginContext);
    const { cartItems } = useContext(CartContext);

    return (
        <div className="container">
            {
                isLoggedIn ? (
                    <div>
                        {
                            cartItems.length > 0 ? (
                                <div>
                                    <span style={{ float: "right", fontSize: "16px", fontWeight: "bold" }}>
                                        Available Points :- {loggedInUser.availableRedeemPoints}
                                    </span>
                                    <h4>My Cart ({cartItems.length})</h4>


                                    <hr></hr>

                                    <CartItems />
                                </div>

                            ) : (
                                    <div>
                                        <h4>My Cart ({cartItems.length})</h4>
                                        <hr></hr>
                                        No items in cart.
                                        <br></br>
                                        <h5 className="mt-5" style={{justifyContent:"center", textAlign:"center"}}>
                                            Select items from catalogue. &nbsp;
                                            <Link className="btn btn-outline-success" to="/rewards">
                                                <i className="fas fa-gift" />&nbsp; Rewards Catalogue
            
                                            </Link>
                                        </h5>
                                    </div>
                                )
                        }
                    </div>
                ) : (
                        <div>
                            <h4>My Cart</h4>
                            <hr></hr>
                            <h5 style={{ color: "red" }}>Please Sign In to add items in the cart.</h5>
                            <Link type="button" className="btn btn-primary" to="/login">
                                <i className="fas fa-sign-in-alt"></i>&nbsp;Sign in
                        </Link>
                        </div>
                    )
            }
        </div>
    );
}

export default CartPage;