const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: 'category not found',
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'not able to save category in db',
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  console.log('GET a CATEGORY');
  return res.json(req.category);
};
exports.getAllCategoriers = (req, res) => {
  console.log('GET ALL CATEGORIES');
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'No categories found',
      });
    }
    res.json(categories);
  });
};
exports.updateCategory = (req, res) => {
  console.log('UPDATE category LINE 44');
  const category = new Category(req.body);
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: 'failed to update',
      });
    }
    console.log('UPDATED CATE:54', updatedCategory);
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete this category${category}`,
      });
    }
    res.json({
      message: `SUCESS fully deleted ${category}`,
    });
  });
};
