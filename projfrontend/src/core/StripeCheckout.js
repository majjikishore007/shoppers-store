import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty } from './helper/Carthelper';
import StripeCheckoutbutton from 'react-stripe-checkout';
import { API } from '../backend';

const StripeCheckout = ({
  products,
  setreload = (f) => f,
  reload = undefined,
}) => {
  const [data, setdata] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmoutn = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };
  const makepayment = (token) => {
    //
    console.log('MAKING PAYMENT');
    const body = {
      token,
      products,
    };
    const headers = {
      'content-type': 'application/json',
    };
    return fetch(`${API}/stripepayment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log('RESPONSE AT LINE 44', response);
        //calling other methods
        const { status } = response;
        console.log('STATUS:', status);
        //emty the cart
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutbutton
        stripeKey="pk_test_51INyHZKC5wLr4KhLmnOOclY2VCX3kXdd75Tjm7J4J4u4p0AyJaMvDrdii5oYolZcJPs0cHnZIzPloHNnoOq1ntfC00kJHl2doq"
        token={makepayment}
        amount={getFinalAmoutn() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">pay with stipe</button>
      </StripeCheckoutbutton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-info">signin</button>
      </Link>
    );
  };
  return (
    <div>
      <h2 className="text-white">Stripe check out {getFinalAmoutn()}</h2>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
