"use strict";
import express from 'express';
import { urlencoded, json } from 'body-parser';
import routerApi from './api/router.js';
import { PORT } from '../config.js';
var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

/*
Desc: Test to see if server is running
Input: None
Output: "Hello world!"
*/
app.get('/', function(req, res){
    res.send("Hello world!");
 });


app.use('/api', routerApi);
app.listen(PORT);


