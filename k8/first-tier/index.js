const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
// true: can post extended objects

//To parse json data
app.use(bodyParser.json());

/*
Desc: forwards "msg" to second-tier
Input: {"msg": "input_message"}
Output: {"msg": "input_message"}
*/
app.post('/', (req, res) => {
    console.log(req.body.msg);
    axios.post('http://cluster-service:3002', {
        "msg": req.body.msg
    })
    .then(
        response => {
          res.json({"msg": response.data.msg});  
        })
    .catch( err => {
        res.json({"msg": `ERROR: ${err}`});
    })
});

app.listen(3001);