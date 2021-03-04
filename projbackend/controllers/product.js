const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate('category')
    .exec((err, product) => {
      if (err) {
        return res.status(404).json({
          error: 'product not found',
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, feilds, file) => {
    if (err) {
      return res.status(404).json({
        error: 'problem with the image',
      });
    }
    console.log(feilds);
    //destructuring the feilds
    const { name, description, price, category, stock } = feilds;
    // console.log(name);
    if (!name || !description || !price || !category || !stock) {
      console.log('missing some details ');
      return res.status(404).json({
        error: 'ALL deatils must be included',
      });
    }

    let product = new Product(feilds);

    //handle file here
    if (file.photo) {
      if (file.photo.status > 3000000) {
        return res.status(400).json({
          error: 'file size is too big!',
        });
      }
      console.log(file.photo.path);
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save to the db

    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: 'saving in the db failed!',
        });
      }
      res.json(product);
    });
  });
};
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
exports.deleteProduct = (req, res) => {
  let product = req.product;

  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: `unable to remove product ${deletedProduct}`,
      });
    }
    res.json({
      message: `successfuly deleted the product ${deletedProduct}`,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, feilds, file) => {
    if (err) {
      return res.status(404).json({
        error: 'problem with the image',
      });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, feilds);

    //handle file here
    if (file.photo) {
      if (file.photo.status > 3000000) {
        return res.status(400).json({
          error: 'file size is too big!',
        });
      }
      console.log(file.photo.path);
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save to the db

    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: 'unable to update',
        });
      }
      return res.json(product);
    });
  });
};
exports.getAllproducts = (req, res) => {
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(404).json({
          err: 'no products are found',
        });
      }
      res.json(products);
    });
};
exports.getAllUniqueCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(404).json({
        error: 'No category found',
      });
    }
    res.json(categories);
  });
};
exports.UpdateStock = (req, res, next) => {
  let Myoperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(Myoperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: 'Bulk operation failed',
      });
    }
    next();
  });
};
