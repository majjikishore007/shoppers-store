import { API } from '../../backend';

export const createCategory = (userId, token, category) => {
  console.log(`LINE NUMBER 4`);
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
//get a category
///category/:categoryId
export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: 'GET',
  })
    .then((response) => {
      // console.log('RES :', response);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

//get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET',
  })
    .then((response) => {
      console.log('RESPONSE AT 28' + response);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
// delete category
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//update category
export const updateCategory = (userId, token, categoryId, category) => {
  // /category/:categoryId/:userId
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: category,
  })
    .then((response) => {
      // console.log('RES AT 76';
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// products calls
//create products
export const createProduct = (userId, token, product) => {
  console.log('PRODUCT', product);
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
//get allproducts
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: 'GET',
  })
    .then((response) => {
      console.log('RESPONSE AT LINE 58' + response);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
//delete products
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get a products

export const getProduct = (productId) => {
  console.log('GET A PRODUCT', productId);
  return fetch(`${API}/product/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      // console.log('RES :', response);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

//update products
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
