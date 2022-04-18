import React, { useContext, useEffect } from 'react';
import './CatalogueItem.css';
import amazon from '../../images/amazon.png';
import uber from '../../images/uber.png';
import walmart from '../../images/walmart.png';
import starbucks from '../../images/starbucks.png';
import { LoginContext } from '../../contexts/LoginContext';
import { CartContext } from '../../contexts/CartContext';

const CatalogueItem = ({ catalogue }) => {

    const {
        item,
        redeemptionPoint,
        redeemptionAmount
    } = catalogue

    /**
     *  Fetch the login and cart details from Context
     */
    const { isLoggedIn } = useContext(LoginContext);
    const { addToCart } = useContext(CartContext);
    
    /**
     * return the image of item
     * @param item 
     */
    const getItemImage = (item) => {


        /**
         *  the below condition matches the string in a given word.
         *  /i will perform case-insensitive match
         * 
         **/ 

        if (item.match(/amazon/i) != null) {
            return amazon;
        } else if (item.match(/starbucks/i) != null) {
            return starbucks;
        } else if (item.match(/walmart/i) != null) {
            return walmart;
        } else if (item.match(/uber/i) != null) {
            return uber;
        }

    }


    const performCartOperation = (e) => {
        e.preventDefault();
        addToCart(catalogue);
    }

    return (
        
        <div className="catalogue-item">

            <div className="card-item">

                <div className="row">
                    <div className="col-md-3">
                        <img src={getItemImage(item)} />
                        <br /><br />
                        <div className="item-worth">
                            <h5>
                                <i className="fas fa-rupee-sign" style={{ color: "green" }}></i>&nbsp;
                                {redeemptionAmount}
                            </h5>

                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-8">
                        <h5 style={{color:"#0e912c"}}> {item}</h5>
                        <hr></hr>
                        <h6>
                            Redeemption Points : {redeemptionPoint}
                        </h6><br />
                        {
                            isLoggedIn ? (
                                <div>
                                    <button className="btn btn-success cart-button" onClick={performCartOperation}>
                                        <i className="fas fa-cart-plus"></i>&nbsp;
                                        Add to cart
                                    </button>

                                </div>
                            ) : (<div></div>)
                        }

                    </div>

                </div>

            </div>
            <br></br><br></br>

        </div>
    );
}

export default CatalogueItem;