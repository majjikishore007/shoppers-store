import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';
import '../header.css';
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    console.log(history.location.pathname);
    return { color: '#50DBB4' };
  } else {
    return { color: 'white' };
  }
};
const menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab(history, '/')} className="nav-link" to="/">
            Home
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={currentTab(history, '/cart')}
              to="/cart"
            >
              Cart
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={currentTab(history, '/user/dashboard')}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={currentTab(history, '/admin/dashboard')}
              to="/admin/dashboard"
            >
              AdminDashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={currentTab(history, '/signup')}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={currentTab(history, '/signin')}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push('/');
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(menu);
