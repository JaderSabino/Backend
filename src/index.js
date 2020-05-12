const express = require('express');
const cors = require('cors');
const compression = require('compression');

const routes = require('./routes.js');

require('./database');

const app = express();

app.disable('x-powered-by');
app.use(cors({origin: '*', Methods: 'GET,PUT,POST,DELETE'}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000);