import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base.js';
import Card from './Card';
import { loadCart } from './helper/Carthelper';
import StripeCheckout from './StripeCheckout';
import PaymentB from './paymentBraintree';
const Cart = () => {
  const [products, setproducts] = useState([]);
  const [reload, setreload] = useState(false);
  useEffect(() => {
    setproducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addtoCart={false}
              removefromCart={true}
              setreload={setreload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h1>
          <StripeCheckout
            products={products}
            setreload={setreload}
            reload={reload}
          />
        </h1>
      </div>
    );
  };
  return (
    <Base title="Cart page" description="">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>Cart is Empty</h3>
          )}
        </div>
        <div className="col-6">
          <PaymentB products={products} setreload={setreload} reload={reload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
