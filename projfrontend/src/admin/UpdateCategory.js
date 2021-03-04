import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';
import { updateCategory, getCategory } from './helper/adminapicall';

const UpdateCategory = ({ match }) => {
  const [category, setcategory] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError('');
    setcategory(event.target.value);
  };
  const preload = (categoryId) => {
    console.log('CATEGORY ID:', categoryId);
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setcategory(data.name);
      }
    });
  };
  useEffect(() => {
    preload(match.params.categoryId);
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    //backend request
    updateCategory(user._id, token, match.params.categoryId, category).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError(false);
          setSuccess(true);
          console.log(category + 'NAME OF CATEGORY');
          setcategory('');
        }
      }
    );
  };
  const successMessage = () => {
    if (success) {
      console.log('SUCCESS AT LINE 34');
      return <h4 className="text-success">updated category successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      console.log('FAILED AT LINE 40');
      return <h4 className="text-success">Failed to update Category</h4>;
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
            value={category}
            autoFocus
            required
            placeholder="for ex. summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info mb-2">
            updateCategory
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
      title="Update category"
      description="make an update to the category here"
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

export default UpdateCategory;
