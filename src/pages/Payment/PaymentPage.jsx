import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { IsLoggedIn } from '../../IsLoggedIn';
import { Link, useParams } from 'react-router-dom';
import { ReadCatalog } from "../../db/Read/ReadCatalog.jsx";
import { Loading } from './../Loading/loading';
import { Error } from './../Error/Error';
import { TransactionCompletePage } from './TransactionCompletePage';
import Cookies from 'js-cookie';
import { UpdateUserCatalog } from '../../db/Update/updateUserCatalog';
import { Notification } from '../../Notification';
import { TriggerNotification } from '../../TriggerNotification';

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
      <Error title={"Sorry"} message={`There was an error retrieving data for the ${exam.exam}`}/>
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
          <div id="errorContainer" className="notShowing animate__animated">
            <Notification type="error" title="Error" message={error}/>
          </div>
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
                  const response = await fetch('https://practicewithbyronpython-api.azure-api.net/PracticeWithByron-python/v1.0.0/orders', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Ocp-Apim-Subscription-Key': 'ff1ce5d1c42047a3b1f01aeea1e5cfd7'
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({
                        value: "10.99"
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
                  setError(
                    `Could not initiate PayPal Checkout...${error}`,
                  );
                  TriggerNotification("errorContainer");
                }
              }}
              onApprove={async (data, actions) => {
                try {
                  const response = await fetch(
                    `https://practicewithbyronpython-api.azure-api.net/PracticeWithByron-python/v1.0.0/orderscapture`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Subscription-Key': 'ff1ce5d1c42047a3b1f01aeea1e5cfd7'
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
    
                  if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                  } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    setError("Payment failed, please try again");
                    TriggerNotification("errorContainer");
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    UpdateUserCatalog(exam.exam, Cookies.get("jwtToken"))
                    .then(() => {
                      //Add to log file or something to keep a track of this working
                      setTransactionComplete(true);
                    })
                    .catch(err => {
                      console.log(err);
                      //Same here, also show some error message
                    })
                    
                  }
                } catch (error) {
                  setError(
                    `Sorry, your transaction could not be processed...${error}`,
                  );
                  TriggerNotification("errorContainer");
                }
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    );
  }
}