"use strict";
const { performance } = require('perf_hooks');
const axios = require('axios');
import util from '../src/api/util';
const {funcStatistics, multiLayerStatistics} = util

/* 
Test all the function locations 
and locations that do not match exsisting functions.
*/

funcStatistics("us-central","func_One")
    .then( res => {console.log(res)})
    .catch( err => {console.log(err)});


funcStatistics("asia-southeast","func_Two")
    .then( res => {console.log(res)})
    .catch( err => {console.log(err)});


funcStatistics("europe-west","func_Three")
    .then( res => {console.log(res)})
    .catch( err => {console.log(err)});

// Error
funcStatistics("wrong","func_Error")
    .then( res => {console.log(res)})
    .catch( err => {console.log(`ERROR: ${err}`)});


/* 
Test all the multiLayer Service locations 
and locations that do not match exsisting functions.
*/

multiLayerStatistics("us-central","Multi_One")
    .then( res => {console.log(res)})
    .catch( err => {console.log(err)});


multiLayerStatistics("asia-southeast","Multi_Two")
    .then( res => {console.log(res)})
    .catch( err => {console.log(err)});


multiLayerStatistics("europe-west","Multi_Three")
    .then( res => {console.log(res)})
    .catch( err => {console.log(err)});

// Error
multiLayerStatistics("wrong","Multi_Error")
    .then( res => {console.log(res)})
    .catch( err => {console.log(`ERROR: ${err}`)});

