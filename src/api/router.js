"use strict";
import { Router } from 'express';
import util from './util.js';
const {funcStatistics, multiLayerStatistics} = util
const router = Router();

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




export default router;