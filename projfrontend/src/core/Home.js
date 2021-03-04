import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base.js';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        seterror(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home page" description="welcome to the TshirtStote">
      <div className="row text-center mb-4">
        <h1 className="text-white mb-4">A cool collection of Tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
