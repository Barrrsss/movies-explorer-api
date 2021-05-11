const router = require('express').Router();

const {
  updateUserInfo,
  getUserId,
} = require('../controllers/user');

const {
  validateUser,
} = require('../middlewares/Validation');

router.get('/users/me', getUserId);
router.patch('/users/me', validateUser, updateUserInfo);

module.exports = router;
