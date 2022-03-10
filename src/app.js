const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const corsOptions = require('./services/cors');
const router = require('./routes/router');

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('combined'));

app.use(express.json());

app.use('/v1', router);

module.exports = app;
