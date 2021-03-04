import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper/index';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handelChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('on submit ruuning');
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch();
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="from-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handelChange('name')}
                type="text"
                value={name}
              />
            </div>
            <div className="from-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handelChange('email')}
                type="email"
                value={email}
              />
            </div>
            <div className="from-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handelChange('password')}
                type="password"
                value={password}
              />
            </div>
            <button
              className="btn btn-success btn-block form-control mt-3"
              onClick={onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    console.log('sucess message');
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? '' : 'none' }}
          >
            your account has been created successfully
            <Link to="/signin">login here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    console.log('error message');
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base title="signup page" description="signup here ">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
    </Base>
  );
};

export default Signup;
