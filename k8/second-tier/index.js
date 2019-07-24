const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// true: can post extended objects

//To parse json data
app.use(bodyParser.json());


/*
Desc: responds with same "msg" to fist-tier
Input: {"msg": "input_message"}
Output: {"msg": "input_message"}
*/
app.post('/', (req, res) => {
    res.json({"msg": req.body.msg})
});

app.listen(3002);