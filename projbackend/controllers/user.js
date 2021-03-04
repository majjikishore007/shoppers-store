const User = require('../models/user');
const Order = require('../models/order');
const user = require('../models/user');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'USER not found ',
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'your not authorized to this user',
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};
exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('user', '_id name ')
    .exec((err, order) => {
      if (err) {
        return res.status(404).json({
          error: 'No order is this account',
        });
      }
      res.json(order);
    });
};
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchaseList = [];
  req.body.order.products.forEach((product) => {
    purchaseList.push({
      _id: product_id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });
  //storing in db

  user.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchase) => {
      if (err) {
        return res.status(400).json({
          error: 'Unable to save the purchase list ',
        });
      }
      next();
    }
  );
};
