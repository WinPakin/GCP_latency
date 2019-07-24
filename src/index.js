"use strict";
import express from 'express';
import { urlencoded, json } from 'body-parser';
import routerApi from './api/router.js';
import { PORT } from '../config.js';
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


