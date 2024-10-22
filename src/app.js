const express = require('express');
const cors = require('cors');
const mg = require('morgan')


const app = express();



app.set('port', process.env.PORT || 3018);

app.use(cors());
app.use(mg('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



module.exports = app;