import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { PaymentPageSelection } from "./PaymentPageSelection";
import { PaymentPageInput } from './PaymentPageInput';
import { ReadCatalog } from "../../db/Read/ReadCatalog";
import { Error } from "../Error/Error";
import { Loading } from "../Loading/loading";

import "../../App.css";
import PayPalLogo from './PayPalLogo';


export const PaymentPage = () => {
    const [paypal, setPaypal] = useState(true);
    const [creditcard, setCreditcard] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const {name} = useParams(); 

    console.log(name);

    if(isFetching){
        ReadCatalog(name)
        .then(res => {
            setData(res.data.detail[0]);
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setIsFetching(false)
        });  
    }

    const reset = () => {
        setPaypal(false);
        setCreditcard(false);
    }

    if(isFetching){
        return(
            <Loading/>
        )
    }
    else if(error){
        return(
            <Error title={"Internal server error"} message={error.message}/>
        )
    }
    else{
        return(
            <div className="flex-column center-content" style={{marginTop: "57px"}}>
                <div className="paymentPage-partition">
                    <h1 className="paymentPage-title">Choose a Payment Method</h1>
                    <PaymentPageSelection state={paypal} set={setPaypal} reset={reset} text="PayPal"/>
                    <PaymentPageSelection state={creditcard} set={setPaypal} reset={reset} text="Credit Card (Not Available)"/>
                </div>
                <div className="paymentPage-partition">
                    <h1 className="paymentPage-title">Provide A Coupon Code</h1>
                    <PaymentPageInput setCouponDiscount={setCouponDiscount}/>

                </div>

                <div className="paymentPage-partition">
                    <h1 className="paymentPage-title">Confirm your order</h1>
                    {
                        couponDiscount ? (
                            <>
                                <div className="flex-row">
                                    <h2 className="paymentPagePrice-text" style={{"marginRight": "auto"}}>Subtotal: </h2>
                                    <h2 className="paymentPagePrice-text">£{data.detail}</h2>
                                </div>
                                <div className="flex-row">
                                    <h2 className="paymentPagePrice-text" style={{"marginRight": "auto"}}>Coupon Discount: </h2>
                                    <h2 className="paymentPagePrice-text">£{couponDiscount}</h2>
                                </div>
                            </>
                        ) : (
                            <></>
                        )
                    }
                    <div className="flex-row">
                        <h2 className="paymentPagePrice-text" style={{"marginRight": "auto"}}>Total: </h2>
                        <h2 className="paymentPagePrice-text">£{data.price - couponDiscount}</h2>
                    </div>
                    <button className="paymentPagePayPal-button">
                        <PayPalLogo/>
                    </button>
                </div>

            </div>
        )
    }

}