"use strict";
const { mean, median, max, min, std, round } = require('mathjs');
const { performance } = require('perf_hooks');
const axios = require('axios');

const NUM_TEST = 30;



// URL of us-central function
const urlUsCentralFunc = 'https://us-central1-upheld-rookery-246419.cloudfunctions.net/function-1';

// URL of asia-east function
// TODO: change
const urlAsiaEastFunc = 'https://asia-east2-upheld-rookery-246419.cloudfunctions.net/function-2';

// URL of europe-west function
// TODO: change
const urlEuroWestFunc = 'https://europe-west1-upheld-rookery-246419.cloudfunctions.net/function-2';


/*
Desc: Assigns time to 100 millisecond bucket.
Input: Latency time
Output: Index of bucket
*/
const assignBucket = (time) => {
    time = time / 100;
    let rounded = Math.ceil(time);
    switch(rounded) {
        case 1: 
            return 0;
        case 2:
            return 1;
        case 3:
            return 2;
        case 4:
            return 3
        case 5:
            return 4
        case 6:
            return 5
        case 7:
            return 6
        case 8:
            return 7
        case 9:
            return 8
        default:
            return 9

    }
}

/*
Desc: match function location to URL
Input: function location
Output: function URL
*/
const matchFuncURL = (loc) => {
    switch(loc) {
        case 'us-central':
            return urlUsCentralFunc;
        case 'asia-east':
            return urlAsiaEastFunc;
        case "europe-west":
            return urlEuroWestFunc;
        default:
            throw("Function location does not match existing URL");
    }
}




/*
Desc: Calculates Latency Statistics for Google Cloud Function Servers
Input: 'us-central', 'asia-east', or `europe-west`
Output:
{ 
   testName: 'second test'
   infrastructure: 'function',
   location: 'us-central',
   mean: 0.0531,
   median: 0.0312,
   max: 1.2,
   min: 0.1,
   std: 0.4,
   lst: [0.32, 0.13, 0.4, ...]
}
*/
const funcStatistics = async (location, testName) => {
    const lst = [];
    const hundredBucket = new Array(10).fill(0);
    let bucketIndex;
    let timeDiff;
    for(let i = 0; i < NUM_TEST; i ++){
        let t0 = performance.now();
        let result = await axios.get(matchFuncURL(location))
        let t1 = performance.now();
        timeDiff = round(t1 - t0,2 );
        lst.push(timeDiff);
        bucketIndex = assignBucket(timeDiff);
        hundredBucket[bucketIndex] += 1;

    }

    return {
        testName: testName,
        infrastructure: 'function',
        location: location,
        mean: round(mean(lst), 2),
        median: round(median(lst), 2),
        max: max(lst),
        min: min(lst),
        std: round(std(lst), 2),
        lst: hundredBucket
    };

}




// IP of us-central k8
const IP_us = "http://35.188.77.79:80"

// IP of asia-east k8
// TODO: change
const IP_asia = "http://35.188.77.79:80" 

// IP of europe-west k8
const IP_europe = "http://35.188.77.79:80" 


/*
Desc: match multiLayer location to IP
Input: function location
Output: multiLayer service IP
*/
const matchMultiIP = (loc) => {
    switch(loc) {
        case 'us-central':
            return IP_us;
        case 'asia-east':
            return IP_asia;
        case "europe-west":
            return IP_europe;
        default:
            throw("MultiLayer location does not match existing IP");
    }
}



/*
Desc: Calculates Latency Statistics for Multilayer App
Input: 'us-central', 'asia-east', or `europe-west`
Output: 
{ 
   testName: 'second test',
   infrastructure: 'multiLayer',
   location: 'us-central',
   mean: 0.0531,
   median: 0.0312,
   max: 1.2,
   min: 0.1,
   std: 0.4,
   lst: [0.32, 0.13, 0.4, ...]
}
*/
const multiLayerStatistics = async (location, testName) => {
    const lst = [];
    const hundredBucket = new Array(10).fill(0);
    let bucketIndex;
    let timeDiff;
    for(let i = 0; i < NUM_TEST; i ++){
        let t0 = performance.now();
        let result = await axios.post(matchMultiIP(location), {
            msg: "ping"
        });
        let t1 = performance.now();
        timeDiff = round(t1 - t0,2);
        lst.push(timeDiff);
        bucketIndex = assignBucket(timeDiff);
        hundredBucket[bucketIndex] += 1;

    }

    return {
        testName: testName,
        infrastructure: 'multiLayer',
        location: location,
        mean: round(mean(lst), 2),
        median: round(median(lst), 2),
        max: max(lst),
        min: min(lst),
        std: round(std(lst), 2),
        lst: hundredBucket
    };

}

module.exports = {
    funcStatistics,
    multiLayerStatistics

}
// export default {
//     funcStatistics: funcStatistics,
//     multiLayerStatistics: multiLayerStatistics,
// }
