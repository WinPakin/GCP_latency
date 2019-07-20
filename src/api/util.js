"use strict";
import { mean, median, max, min, std, lst, random } from 'mathjs';

/*
Desc: Calculates Latency Statistics for Google Cloud Function Servers
Input: 'us-central', 'asia-southeast', or `europe-west`
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
    for(let i = 0; i < 10; i ++){
        lst.push(random(10,30));
    }

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 200)
      });
    
    let result = await promise;

    return {
        testName: testName,
        infrastructure: 'function',
        location: location,
        mean: mean(lst),
        median: median(lst),
        max: max(lst),
        min: min(lst),
        std: std(lst),
        lst: lst
    };

}

/*
Desc: Calculates Latency Statistics for Multilayer App
Input: 'us-central', 'asia-southeast', or `europe-west`
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
    for(let i = 0; i < 10; i ++){
        lst.push(random(10,30));
    }

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 200)
      });
    
    let result = await promise;

    return {
        testName: testName,
        infrastructure: 'multiLayer',
        location: location,
        mean: mean(lst),
        median: median(lst),
        max: max(lst),
        min: min(lst),
        std: std(lst),
        lst: lst
    };

}


export default {
    funcStatistics: funcStatistics,
    multiLayerStatistics: multiLayerStatistics,
}
