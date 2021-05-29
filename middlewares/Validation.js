const { celebrate, Joi } = require('celebrate');
const errorMessages = require('../errors/ErrorMessages');

const {
  wrongName, wrongAbout, wrongLink, wrongAuth, wrongMail, wrongPassword,
} = errorMessages;

const link = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(new Joi.ValidationError(wrongAuth)),
    name: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError(wrongName)),
  }).unknown(true),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError(wrongAbout)),
    director: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError(wrongAbout)),
    duration: Joi.number().required()
      .error(new Joi.ValidationError(wrongAbout)),
    year: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError(wrongAbout)),
    description: Joi.string().min(2).required()
      .error(new Joi.ValidationError(wrongAbout)),
    image: Joi.string().pattern(link).required()
      .error(new Joi.ValidationError(wrongLink)),
    trailer: Joi.string().pattern(link).required()
      .error(new Joi.ValidationError(wrongLink)),
    thumbnail: Joi.string().pattern(link).required()
      .error(new Joi.ValidationError(wrongLink)),
    nameRU: Joi.string().min(2).required()
      .error(new Joi.ValidationError(wrongAbout)),
    nameEN: Joi.string().min(2).required()
      .error(new Joi.ValidationError(wrongAbout)),
    movieId: Joi.number().required()
      .error(new Joi.ValidationError(wrongAbout)),
  }).unknown(true),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }).unknown(true),
});

const validateSigIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(new Joi.ValidationError(wrongAuth)),
    password: Joi.string().required().min(4)
      .error(new Joi.ValidationError(wrongAuth)),
  }).unknown(true),
});

const validateSigUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .error(new Joi.ValidationError(wrongName)),
    email: Joi.string().required().email()
      .error(new Joi.ValidationError(wrongMail)),
    password: Joi.string().required().min(4)
      .error(new Joi.ValidationError(wrongPassword)),
  }).unknown(true),
});

module.exports = {
  validateUser,
  validateMovie,
  validateSigIn,
  validateSigUp,
  validateDeleteMovie,
};
