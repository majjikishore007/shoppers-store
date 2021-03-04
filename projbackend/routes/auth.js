var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');
//validation
//my routes
router.post(
  '/signup',
  [
    check('name', 'Name must be 3characters long').isLength({ min: 3 }),
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password is too weak').isLength({ min: 3 }),
  ],
  signup
);

router.post(
  '/signin',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'PASSWORD is required').isLength({ min: 1 }),
  ],
  signin
);

router.get('/signout', signout);

module.exports = router;
