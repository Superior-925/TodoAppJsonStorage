
//global modules
const express = require('express');
const cors = require('cors');
//const timeout = require('connect-timeout'); //to use as "top-level" middleware -> not recommended!!!

//local modules
const config = require('./config.json')[process.env.NODE_ENV];
const route = require('./route');

//init app
const app = express();

//top level middlewares
app.use(cors());

app.use('/', route);

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function(req, res) {
  res.status(404).send('PAGE NOT FOUND!');
});

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});


