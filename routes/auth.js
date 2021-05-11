const router = require('express').Router();
const { login, createUser } = require('../controllers/user');

const {
  validateSigIn,
  validateSigUp,
} = require('../middlewares/Validation');

router.post('/signin', validateSigIn, login);

router.post('/signup', validateSigUp, createUser);

module.exports = router;
