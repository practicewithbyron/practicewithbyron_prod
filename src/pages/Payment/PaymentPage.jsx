// import React, { useState } from "react";

// import { useParams } from "react-router-dom";
// import { PaymentPageSelection } from "./PaymentPageSelection";
// import { PaymentPageInput } from './PaymentPageInput';
// import { ReadCatalog } from "../../db/Read/ReadCatalog";
// import { Error } from "../Error/Error";
// import { Loading } from "../Loading/loading";

// import "../../App.css";
// import PayPalLogo from './PayPalLogo';
// import { CaptureOrder } from "../../db/Paypal/captureOrders";
// import { CreateOrder } from "../../db/Paypal/createOrder";


// export const PaymentPage = () => {
//     const [paypal, setPaypal] = useState(true);
//     const [creditcard, setCreditcard] = useState(false);
//     const [couponDiscount, setCouponDiscount] = useState(0);

    // const [isFetching, setIsFetching] = useState(true);
    // const [error, setError] = useState(null);
    // const [data, setData] = useState(null);

//     const [paypalError, setPaypalError] = useState(null);
//     const [orderID, setOrderID] = useState(null);


//     const {name} = useParams(); 

    // if(isFetching){
    //     ReadCatalog(name)
    //     .then(res => {
    //         setData(res.data.detail[0]);
    //     })
    //     .catch(err => {
    //         setError(err)
    //     })
    //     .finally(() => {
    //         setIsFetching(false)
    //     });  
    // }

//     const reset = () => {
//         setPaypal(false);
//         setCreditcard(false);
//     }

//     if(isFetching){
//         return(
//             <Loading/>
//         )
//     }
//     else if(error){
//         return(
//             <Error title={"Internal server error"} message={error.message}/>
//         )
//     }
//     else{
//         return(
//             <div className="flex-column center-content" style={{marginTop: "57px"}}>
//                 <div className="paymentPage-partition">
//                     <h1 className="paymentPage-title">Choose a Payment Method</h1>
//                     <PaymentPageSelection state={paypal} set={setPaypal} reset={reset} text="PayPal"/>
//                     <PaymentPageSelection state={creditcard} set={setPaypal} reset={reset} text="Credit Card (Not Available)"/>
//                 </div>
//                 <div className="paymentPage-partition">
//                     <h1 className="paymentPage-title">Provide A Coupon Code</h1>
//                     <PaymentPageInput setCouponDiscount={setCouponDiscount}/>

//                 </div>

//                 <div className="paymentPage-partition">
//                     <h1 className="paymentPage-title">Confirm your order</h1>
//                     {
//                         couponDiscount ? (
//                             <>
//                                 <div className="flex-row">
//                                     <h2 className="paymentPagePrice-text" style={{"marginRight": "auto"}}>Subtotal: </h2>
//                                     <h2 className="paymentPagePrice-text">£{data.detail}</h2>
//                                 </div>
//                                 <div className="flex-row">
//                                     <h2 className="paymentPagePrice-text" style={{"marginRight": "auto"}}>Coupon Discount: </h2>
//                                     <h2 className="paymentPagePrice-text">£{couponDiscount}</h2>
//                                 </div>
//                             </>
//                         ) : (
//                             <></>
//                         )
//                     }
//                     <div className="flex-row">
//                         <h2 className="paymentPagePrice-text" style={{"marginRight": "auto"}}>Total: </h2>
//                         <h2 className="paymentPagePrice-text">£{data.price - couponDiscount}</h2>
//                     </div>
//                     <button className="paymentPagePayPal-button" onClick={() => {
//                         CreateOrder(`${data.price - couponDiscount}`)
//                         .then(res => {
//                             setOrderID(res.data.id)
//                             window.location.href = res.data.links[1].href;
//                         })
//                         .catch(err => {
//                             console.log(err);
//                         })
//                     }}>
//                         <PayPalLogo/>
//                     </button>
//                 </div>

//             </div>
//         )
//     }

// }

import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { IsLoggedIn } from '../../IsLoggedIn';
import { Link, useParams } from 'react-router-dom';
import { ReadCatalog } from "../../db/Read/ReadCatalog.jsx";
import { Loading } from './../Loading/loading';
import { Error } from './../Error/Error';

import "../../App.css";
import "./PaymentPage.css";
import { TransactionCompletePage } from './TransactionCompletePage';

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

export const PaymentPage = () => {
  const [message, setMessage] = useState('');

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [isTransactionComplete, setTransactionComplete] = useState(true);

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
      <Error title={"Sorry"} message={`There was an retrieving data for the ${exam}`}/>
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
                  console.error(error);
                  setMessage(
                    `Could not initiate PayPal Checkout...${error}`,
                  );
                }
              }}
              onApprove={async (data, actions) => {
                console.log(data);
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
                    throw new Error(
                      `${errorDetail.description} (${orderData.debug_id})`,
                    );
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction =
                      orderData.purchase_units[0].payments.captures[0];
                      setMessage(
                      `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                    );
                    setTransactionComplete(true);
                  }
                } catch (error) {
                  console.error(error);
                  setMessage(
                    `Sorry, your transaction could not be processed...${error}`,
                  );
                }
              }}
            />
          </PayPalScriptProvider>
          <Message content={message} />
        </div>
        
      </div>
    );
  }
}