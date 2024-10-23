const express = require('express');
const cors = require('cors');
const mg = require('morgan');
const { getNumberEnv } = require('./App/Config/Config');


const app = express();



app.set('port', getNumberEnv('PORT'));

app.use(cors());
app.use(mg('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



module.exports = app;