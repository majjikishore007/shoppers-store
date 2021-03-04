import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper/index';

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setvalues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    photo: '',
    categories: [],
    category: '',
    loading: false,
    error: '',
    getaRedirect: false,
    formData: '',
  });
  const {
    name,
    description,
    price,
    stock,
    category,
    categories,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;
  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setvalues({ ...values, error: data.error });
      } else {
        setvalues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    //refresing the errors
    setvalues({ ...values, error: '', loading: true });
    console.log('FORM DATA: ', formData);
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setvalues({ ...values, error: data.error });
      } else {
        setvalues({
          ...values,
          name: '',
          description: '',
          price: '',
          photo: '',
          stock: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? '' : 'none' }}
      >
        <h4>{createdProduct} created successfully</h4>
      </div>
    );
  };
  const errorMessage = () => {};

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    //based on whatever the name is the values are given
    setvalues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group  mb-4">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange('photo')}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange('name')}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group my-3">
        <textarea
          onChange={handleChange('description')}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange('price')}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group my-3">
        <select
          onChange={handleChange('category')}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((c, index) => (
              <option key={index} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange('stock')}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );
  return (
    <Base
      title="Add Product"
      description="products are being added here"
      className="container bg-success p-4 mb-5 "
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
