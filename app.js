const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes');
const auth = require('./middlewares/auth');
require('dotenv').config();
const { errors } = require('./middlewares/errors');

const app = express();

const { PORT = 3000 } = process.env;

const { requestLogger, errorLogger } = require('./middlewares/errorlog');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 204,
};

app.use(express.json(), cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.json());

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(require('./routes/auth'));

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors);

app.listen(PORT, () => {

});
