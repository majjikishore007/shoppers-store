import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/Carthelper';
import Imghelper from './helper/Imghelper';
import { isAuthenticated } from '../auth/helper/index';

const Card = ({
  product,
  addtoCart = true,
  removefromCart = false,
  setreload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setredirect] = useState(false);
  const [count, setcount] = useState(product.count);
  const cardTitle = product ? product.name : 'A photo from pexels';
  const cardDescription = product ? product.description : 'default';
  const cardPrice = product ? product.price : 'default';

  const additemToCart = () => {
    // console.log("TOKEN :",isAuthenticated().token);
    if (isAuthenticated()) {
       addItemToCart(product, () => setredirect(true));
    }
    else {
      showPopup();
    }
  };
  const showPopup = () => {
     return (
        <div className="alert alert-danger mt-3">
            <h4>Please signin</h4>
          </div>  
      )
  }
  const getaRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={additemToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          add to cart
        </button>
      )
    );
  };
  const ShowRemovefromCart = () => {
    return (
      removefromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setreload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getaRedirect(redirect)}
        <Imghelper product={product}></Imghelper>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{ShowRemovefromCart(removefromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
