import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    //backend request
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setName('');
      }
    });
  };
  const successMessage = () => {
    if (success) {
      console.log('SUCCESS AT LINE 34');
      return <h4 className="text-success">category success created</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      console.log('FAILED AT LINE 40');
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };
  const myCategory = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the name of category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="for ex. summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info mb-2">
            Create category
          </button>
        </div>
      </form>
    );
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
          Admin home
        </Link>
      </div>
    );
  };

  return (
    <Base
      title="Create a new category"
      description="add a new category of Tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategory()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
