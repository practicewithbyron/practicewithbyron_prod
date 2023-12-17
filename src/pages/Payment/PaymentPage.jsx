import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { IsLoggedIn } from '../../IsLoggedIn';
import { Link, useParams } from 'react-router-dom';
import { ReadCatalog } from "../../db/Read/ReadCatalog.jsx";
import { Loading } from './../Loading/loading';
import { Error } from './../Error/Error';
import { TransactionCompletePage } from './TransactionCompletePage';
import { UpdateUserCatalog } from '../../db/Update/updateUserCatalog';
import { Notification } from '../../Notification';
import { JWTValidation } from '../../validation/jwtValidation.js';

import "../../App.css";
import 'animate.css';
import "./PaymentPage.css";


export const PaymentPage = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [isTransactionComplete, setTransactionComplete] = useState(false);

  const exam = useParams();

  if(isFetching){
    ReadCatalog(exam.exam)
    .then(res => {
      console.log(res);
      setData(res.data.detail[0]);
    })
    .catch(err => {
      setError(err)
    })
    .finally(() => {
      setIsFetching(false)
    });  
  }

  useEffect(() => {
    IsLoggedIn(`payment/${exam.exam}`);
  }, [exam.exam])

  useEffect(() => {
    IsLoggedIn(`payment/${exam.exam}`);
  }, [])

  var clientID = "AZpDtgm8VQsXV03gURgpIkxH5eP4MAxxVCqgWMjuCV1qbsdv4oJYInftxx2y9_rtbtjwSHIClJY-piq4"

  var isLive = false;

  if(isLive){
    clientID = "AbNzg2jm2tPpeXVhiMRFcJRXi3Jk42SChRvA-DNXZWelre2dveiSx6p6LfMjh9jZ1Xqkwl8iyVINsBhs"
  }

  const initialOptions = {
    'client-id': clientID,
    'enable-funding': ['paypal', 'venmo', 'paylater', 'card'],
    'data-sdk-integration-source': 'integrationbuilder_sc',
    'currency': 'USD'
  };

  if(isFetching){
    return (
      <Loading/>
    )

  }
  else if(error)
  {
    return (
      <Error title={"Sorry"} message={"An error has occurred. Please refresh the page and try again."}/>
    )
  }
  else if(!data) // If the api request was successful but the exam doesn't exist.
  {
    return (
      <Error title={"Oops"} message={`This exam doesn't exist`}/>
    )
  }
  else if(isTransactionComplete)
  {
    return(
      <TransactionCompletePage/>
    )
  }
  else{
    return (
      <div className="flex-column complete-center full-height page-margin full-width paymentPage-container">
        <div className='paymentPage-widget' style={{paddingBottom: "10px"}}>
          <h1 className='paymentPage-title'>Checkout 🛒</h1>
          <h2 className='paymentPagePrice-text'>Practice Exam Questions for the {exam.exam} & more</h2>
          <h3 className='paymentPage-subtitle'>Your purchase includes: </h3>
          <ul>
            <li className='paymentPage-listItem'>✅ 100% Original questions relating to the exam</li>
            <li className='paymentPage-listItem'>✅ Money back guarentee if you don't pass</li>
            <li className='paymentPage-listItem'>✅ Unlimited access</li>
            <li className='paymentPage-listItem'>✅ Comprehensive progression statistics</li>
            <li className='paymentPage-listItem'>✅ Extensive learning tools</li>
          </ul>
        </div>
  
        <div className="paymentPage-widget">
          <h1 className="paymentPage-title">
            Confirm Your Order
          </h1>
          <div className="flex-row">
            <h2 className='paymentPagePrice-text'>Total</h2>
            <h2 className='paymentPagePrice-text' style={{marginLeft: "auto"}}>${data.price}</h2>
          </div>
        </div>
  
        <div className="flex-row paymentPageTandC-container">
          <input type="checkbox" className='paymentPageTandC-checkbox' onChange={() => {
            // This can be overriden via inspect html
            const buttonContainer = document.getElementById("paymentPagePaypalButtonContainer");
            buttonContainer.classList.toggle("disabled");
          }}/>
          <p style={{marginRight: "5px"}}>I agree to the </p>
          <Link to="/tandc"> terms and conditions</Link>
        </div>
        <div id="paymentPagePaypalButtonContainer" className='disabled'>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{
                shape: 'rect',
                color: 'gold',
                layout: 'vertical', //default value. Can be changed to horizontal
              }}
              createOrder={async () => {
                try {
                  const response = await fetch('https://practicewithbyron-python.azurewebsites.net/orders', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      "Access-Control-Allow-Origin": "*",
                      "Subscription": "aef2e9fb-1f86-423a-99bd-f44f67316387"
                  },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({
                        value: "14.99"
                    }),
                  });
    
                  const orderData = await response.json();
    
                  if (orderData.id) {
                    return orderData.id;
                  } else {
                    const errorDetail = orderData?.details?.[0];
                    const errorMessage = errorDetail
                      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                      : JSON.stringify(orderData);
    
                    throw new Error(errorMessage);
                  }
                } catch (error) {
                  Notification("error", "Could not initiate PayPal checkout. Please try again!")
                }
              }}
              onApprove={async (data, actions) => {
                // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjRmYTAxY2YxZDNkOTg4YmQ4MmM2MCIsImVtYWlsIjoiYTJAYS5jb20iLCJjYXRhbG9nIjpbIlBDRVAtNDEtMDEiXSwiZXhwIjoxNjk4NjgzMDkyLCJhZG1pbiI6IkZhbHNlIn0.caHXn-F-E3IqRZECTy_mrl8YR5ErWsU61HHkprRUJH0"
                try {
                  if (!JWTValidation("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjRmYTAxY2YxZDNkOTg4YmQ4MmM2MCIsImVtYWlsIjoiYTJAYS5jb20iLCJjYXRhbG9nIjpbIlBDRVAtNDEtMDEiXSwiZXhwIjoxNjk4NjgzMDkyLCJhZG1pbiI6IkZhbHNlIn0.caHXn-F-E3IqRZECTy_mrl8YR5ErWsU61HHkprRUJH0"))
                  {
                    Notification("error", "Login Timeout", "Login has timed out. Taking you to the login page...")
                    await new Promise(resolve => setTimeout(resolve, 3500)); 
                    window.location.reload();
                  }
                  else{
                    const response = await fetch(
                      `https://practicewithbyron-python.azurewebsites.net/orderscapture`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          "Access-Control-Allow-Origin": "*",
                          "Subscription": "aef2e9fb-1f86-423a-99bd-f44f67316387"
                        },
                        body: JSON.stringify({
                          orderID: data.orderID
                        })
                      },
                    );
      
                    const orderData = await response.json();
                    // Three cases to handle:
                    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    //   (2) Other non-recoverable errors -> Show a failure message
                    //   (3) Successful transaction -> Show confirmation or thank you message
      
                    const errorDetail = orderData?.details?.[0];
  
                    // We want to be able to check whether the jwt has expired just before they pay 
                    // (clicked the button but the money hasn't gone through)
      
                    if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                      // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                      // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                      return actions.restart();
                    } else if (errorDetail) {
                      // (2) Other non-recoverable errors -> Show a failure message
                      Notification("error", "Payment Failed", "Please try again");
                      
                    } else {
                      // (3) Successful transaction -> Show confirmation or thank you message
                      // Or go to another URL:  actions.redirect('thank_you.html');
                      UpdateUserCatalog(exam.exam, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjRmYTAxY2YxZDNkOTg4YmQ4MmM2MCIsImVtYWlsIjoiYTJAYS5jb20iLCJjYXRhbG9nIjpbIlBDRVAtNDEtMDEiXSwiZXhwIjoxNjk4NjgzMDkyLCJhZG1pbiI6IkZhbHNlIn0.caHXn-F-E3IqRZECTy_mrl8YR5ErWsU61HHkprRUJH0")
                      .then(() => {
                        //Add to log file or something to keep a track of this working
                        setTransactionComplete(true);
                      })
                      .catch(error => {
                        Notification("error", "Transaction Failure", "Your transaction could not be processed. Don't worry it will be processed in a moment...")
                      })
                    }
                  }

                } catch (error) {
                  Notification("error", "Error", "Oops an error has occured. Please try again!");
                }
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    );
  }
}