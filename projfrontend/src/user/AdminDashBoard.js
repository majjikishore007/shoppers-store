import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">AdminNavigation</h4>
        <Link to="/admin/create/category" className="nav-link text-success">
          Create categories
        </Link>
        <Link to="/admin/create/product" className="nav-link text-success">
          Create products
        </Link>
        <Link to="/admin/categories" className="nav-link text-success">
          Manage categories
        </Link>
        <Link to="/admin/products" className="nav-link text-success">
          Manage products
        </Link>
        <Link to="/admin/orders" className="nav-link text-success">
          Manage orders
        </Link>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success text-success">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success text-success">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger text-danger">Admin area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base title="AdminDashBoard" className="container bg-success p-4">
      <div className="row">
        <div className="col-3"> {adminLeftSide()}</div>
        <div className="col-9"> {adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
