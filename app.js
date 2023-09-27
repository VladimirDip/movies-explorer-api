require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
// const cors = require('./middlewares/cors');
const routes = require('./routes');
const error = require('./middlewares/serverError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DEV_DATABASE, PORT, ALLOWEDCORS } = require('./utils/configConstants');

const app = express();

// app.use(cors);

app.use(helmet());
app.use('*', cors(ALLOWEDCORS));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(DEV_DATABASE, { useUnifiedTopology: true });

app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
