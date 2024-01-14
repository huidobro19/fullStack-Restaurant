/* pages/checkout.js */

import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";
import AppContext from "../components/context";
import Cart from "../components/cart";

function Checkout() {
  // get app context
  const {isAuthenticated} = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  //const isAuthenticated  = true;
  
  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    "pk_test_51OW065BzuIt1hSm17dntj33fLJrNX1skEvtRnvUq6i7q8wrznU1JuvCdRtGMPLzneViVy8DZk625KXwYze8hqkc700yP2iGowM"
  );

  return (

    <div className="justify-content-center align-items-center" >

      <Row style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 className="text-center" style={{ margin: 20 }}>Checkout</h1>

        <hr className="bg-body-secondary" style={{ height: '2px' , marginBottom:"50px"}} />

        <Cart isAuthenticated={isAuthenticated} />

        
      </Row>

      <hr className="bg-body-secondary" style={{ height: '2px' , marginBottom:"50px"}} />
      
      <Row style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Row>

    </div>
  );
  // }
}
export default Checkout;
