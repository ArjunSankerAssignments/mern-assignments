//a require while loading the module 
//executes the code inside it
const {findPrimesEvent}=require('./primes');
let eventEmitter = require("events")

let e=findPrimesEvent(2,500000);

e.on('error',error=>{
    process.stdout.write(error.message);
});

e.on('done', data=>{
    process.stdout.write(`\rtotal primes between ${data.min} and ${data.max} is ${data.total}`)
});

e.on('progress', ({total, percent})=>{
    process.stdout.write(`\r${parseInt(percent)}%`);
    if(total >= 1000)
        e.emit("abort", true);
});

e.on('aborted', ({prime})=>{
    process.stdout.write(`\rlast prime found ${prime}`);
});
