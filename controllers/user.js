const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const ConflictingRequest = require('../errors/ConflictingRequest');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((({ _id }) => User.findById(_id)))
    .then((user) => {
      res.send(user.toJSON());
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Ошибка при создании пользователя');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictingRequest('Пользователь с таким E-mail уже существует');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const id = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(id, { email, name }, { new: true, runValidators: true, upsert: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequest('Данные пользователя не корректны');
      }
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователь с таким Id не существует');
    })
    .then(({ _id }) => {
      User.findById(_id)
        .then((user) => res.send(user))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequest('Неправильный id');
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateUserInfo,
  login,
  getUserId,
};
