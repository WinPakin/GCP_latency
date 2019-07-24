"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded, json } = bodyParser;
const port = require('../config');
const { PORT } = port;
const routerApi = require('./api/router.js');

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static(__dirname + '/dist/latency-angular'));

/*
Desc: Test to see if server is running
Input: None
Output: "Hello world!"
*/
// app.get('/', function(req, res){
//     res.send("Hello world!");
//  });


app.use('/api', routerApi);
app.listen(PORT);


