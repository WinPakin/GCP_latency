"use strict";
const express = require('express');
const router = express.Router();
const {funcStatistics, multiLayerStatistics} = require('./util.js');
const axios = require('axios');

/*
Desc: Tester
Input: msg
Output: Hello <<msg>>
*/
router.get('/test/:msg', function(req, res){
    res.json({msg: `Hello: ${req.params.msg}`});
})


/*
Desc: Latency Statistics for Google Cloud Function Servers
Input:
    1) :infrastructure = function or multiLayer
    2) :location = 'us-central', 'asia-southeast', or `europe-west`
Output: 
{ 
   testName: 'second test'
   infrastructure: 'function',
   location: 'us-central'
   mean: 0.0531,
   median: 0.0312,
   max: 1.2,
   min: 0.1,
   std: 0.2, 
   lst: [0.32, 0.13, 0.4, ...]
}
*/
router.get('/:infrastructure/:location/:testName', 
       (req, res) => {
           if(req.params.infrastructure === "function"){
            funcStatistics(req.params.location, req.params.testName).then(
                (data) => { res.json(data) }
                    )
           }else if(req.params.infrastructure === "multiLayer" ){
            multiLayerStatistics(req.params.location, req.params.testName).then(
                (data) => { res.json(data) }
                    )
           }else{
               throw("infrastructure name not valid!")
           }

            }
    )

/*
Desc: Latency Statistics for REST and gRPC APIs
Input:
    1) :testName = any string
    2) :apiType = 'REST' or 'gRPC' 
Output: 
{
    "testName": "postman",
    "apiType": "REST",
    "mean": 2.47,
    "median": 1.24,
    "max": 15.34,
    "min": 0.43,
    "std": 3.2,
    "lst": [
        20, 3, ..., 0
    ]
}
*/
router.get('/:testname/:apitype',
    (req, res) => {
        axios.post(GO_TEST_SERVER_IP, {
            testName: req.params.testname,
            apiType: req.params.apitype
          })
          .then(function (response) {
            res.send(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
        // res.send("got it")
    }
)

const GO_TEST_SERVER_IP = 'http://testserv-service:80/gotest';
// const GO_TEST_SERVER_IP = 'http://localhost:5002/gotest';
module.exports = router;