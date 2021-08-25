
function isPrimeSync(number) {
    if (number < 2) return false;
    for (let i = 2; i < number; i++)
        if (number % i === 0)
            return false;
    return true;
}

function findPrimesSync(min, max) {
    let primes = [];
    for (let i = min; i < max; i++)
        if (isPrimeSync(i))
            primes.push(i);

    return primes;
}

function findPrimes(min, max, cb) {

    let lo = min;
    let hi = Math.min(max, min + 1000);  //hi will be min+1000 or max whichever is less
    let primes = [];

    let iid = setInterval(() => {

        if (max <= min) {
           return  cb(new Error(`Invalid Range ${min}-${max}`));  //return the error
        }

        if (lo >= max) { //job is over
            //console.log('clearing interval...');
            clearInterval(iid); //stop interval
            return cb(null, primes);  //inform the client about the primes
        }

        for (let i = lo; i < hi; i++) {
            if (isPrimeSync(i))
                primes.push(i);
        }

        lo = hi;
        hi = Math.min(max, lo + 1000);

    }, 10); //repeat this after every 100 ms


}


function findPrimesAsync(min, max) {

    return new Promise(function (resolve, reject) {
        let lo = min;
        let hi = Math.min(max, min + 1000);  //hi will be min+1000 or max whichever is less
        let primes = [];

        let iid = setInterval(() => {

            if (max <= min) {
                //cb(new Error(`Invalid Range ${min}-${max}`));  //return the Error
                return reject(new Error(`Invalid Range ${min}-${max}`));
            }

            if (lo >= max) { //job is over
                //console.log('clearing interval...');
                clearInterval(iid); //stop interval
                //cb(null, primes);  //inform the client about the primes
                return resolve(primes);
            }

            for (let i = lo; i < hi; i++) {
                if (isPrimeSync(i))
                    primes.push(i);
            }

            lo = hi;
            hi = Math.min(max, lo + 1000);

        }, 10); //repeat this after every 100 ms

    });
}

let EventEmitter=require('events');

function findPrimesEvent(min, max) {

    let emitter=new EventEmitter();
    
    let lo = min;
    let hi = Math.min(max, min + 1000);  //hi will be min+1000 or max whichever is less
    //let primes = [];
    let total=0;
    let lastPrime = 0;
    let abortRequested = false;

    emitter.on("abort", ()=>{
        abortRequested=true;
    })

    let iid = setInterval(() => {

        if (max <= min) {
            //cb(new Error(`Invalid Range ${min}-${max}`));  //return the Error
            //return reject(new Error(`Invalid Range ${min}-${max}`));
            clearInterval(iid);
            emitter.emit('error', new Error(`Invalid Range ${min} to ${max}`)); //emitted only once
            
            return;
        }

        if (lo >= max) { //job is over
            //console.log('clearing interval...');
            clearInterval(iid); //stop interval
            //cb(null, primes);  //inform the client about the primes
            //return resolve(primes);
            return emitter.emit('done', {min,max,total});  //emitted only once
        }

        for (let i = lo; i < hi; i++) {
            if (isPrimeSync(i))
                //primes.push(i);
                total++;
                emitter.emit('prime', {min,max,index:total,prime:i}); //repeated everythime we find a prime
                lastPrime = i;
        }

        if(abortRequested){
            console.log("In Primes abort");
            clearInterval(iid);
            emitter.emit("aborted", {min, max, prime:lastPrime});
            return;
        };

        lo = hi;
        hi = Math.min(max, lo + 1000);
        let percent= (lo-min)/(max-min)*100
        emitter.emit('progress',{total, percent}); //repeated afer every 1000 calculation

    }, 10); //repeat this after every 100 ms


   return emitter;
}






// module.export.isPrimeSync=isPrimeSync;
// module.exports.findPrimesSync=findPrimesSync;
// mdoule.exports.findPrimes=findPrimes;


//create an object and add the funciton here ES5
// module.exports={
//     isPrimeSync:isPrimeSync,
//     findPrimes:findPrimes,
//     findPrimesSync:findPrimesSync
// }

//ES2015 --> IF the key and value in an object is going to be same you  can write just the name

module.exports = {
    isPrimeSync,    //isPrimeSync:isPrimeSync
    findPrimes,  //findPrimes:findPrimes
    findPrimesAsync,    //findPrimesAsync:findPrimesAsync
    findPrimesEvent
}

