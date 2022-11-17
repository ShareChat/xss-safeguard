const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const PORT = 3000;

const { PUBLIC_URL = '' } = process.env;

const INDEX_HTML = path.resolve(__dirname, '../build/index.html');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

// Serve generated assets
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../build'), {
    maxage: Infinity,
  })
);

// Serve static assets in /public
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../public'), {
    maxage: '30 days',
  })
);

app.get('*', (req, res) => {
  res.setHeader('content-type', 'text/html');
  fs.createReadStream(INDEX_HTML).pipe(res);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
