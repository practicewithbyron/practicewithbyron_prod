import React from "react";

import "../../App.css";
import { CheckInputIsntEmpty } from "../../validation/inputValidation";
import { ErrorMessage } from "../LoginPage/ErrorMessage";

export const PaymentPageInput = (setCouponDiscount) => {
    return (
        <div id="coupon-container" className="flex-column">
            <div className="flex-row paymentPageInput-container">
                <input id="paymentPageCoupon" className="paymentPage-input" type="text" placeholder="coupon-code"/>
                <button className="paymentPageInput-button" onClick={() => {
                    const input = document.getElementById("paymentPageCoupon");
                    
                    //Check db for coupons
                    const doesCouponExist = false;
                    if(!doesCouponExist || CheckInputIsntEmpty(input.value)){
                        ErrorMessage("coupon-container", "Coupon not found");
                    }
                    else {
                        setCouponDiscount(input.value);
                    }
                }}>Apply</button>
            </div>
        </div>

    )
}