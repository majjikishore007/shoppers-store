import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { getAllOrders } from '../core/helper/OrderHelper';
const UserDashBoard = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
        console.log('PRODUCTS : ' + orders);
      }
    });
  };

  return <Base title=" Your Profile"></Base>;
};

export default UserDashBoard;
