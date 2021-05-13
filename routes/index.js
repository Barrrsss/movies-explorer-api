const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const auth = require('./auth');
const NotFound = require('../errors/NotFound');

router.use('/', auth, userRouter);
router.use('/', auth, movieRouter);

router.use((req) => {
  throw new NotFound(`По адресу ${req.path} ничего нет или неправильный тип запроса`);
});

module.exports = router;
