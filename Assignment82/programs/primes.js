let {delay} = require("../lib/utils.js");
let EventEmitter=require('events');

function isPrimeSync(number) {
    if (number < 2) return false;
    for (let i = 2; i < number; i++)
        if (number % i === 0)
            return false;
    return true;
}


const findPrimesAsync = async (min,max)=>{

    if(max<=min)
        throw new Error(`Invalid Range ${min} to ${max}`);
    //if(max<2)
      //  throw new Error(`Invalid Range ${min} to ${max}`);
    
    let primes = [];
    let count = 0;
    for(let lo=min; lo<=max; lo++){
        if(isPrimeSync(lo))
            primes.push(lo);
        if(count%1000 === 0)
            await delay(100)
        count+=1;
    }
    return primes;
}


// findPrimesAsync(0,100000)
//     .then(primes=>console.log("Primes Length", primes.length))
//     .catch(e=>console.log(e));
// console.log("Printing Primes");

function findPrimesEvent(min, max) {

    let emitter=new EventEmitter();
    
    let lo = min;
    let hi = Math.min(max, min + 1000);  //hi will be min+1000 or max whichever is less
    //let primes = [];
    let total=0;
    let abortRequested=false;
    let lastPrimeFound=NaN;

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

        for (let i = lo; i <= hi; i++) {
            if (isPrimeSync(i)){
                //primes.push(i);
                lastPrimeFound=i;
                total++;
                emitter.emit('prime', {min,max,index:total,prime:i}); //repeated everythime we find a prime
            }
        }

        let percent=parseInt( (lo-min)/(max-min)*100);

        if(abortRequested){
            clearInterval(iid);
            emitter.emit('aborted',{min,max,percent,total,lastPrimeFound})
            return ;
        }


        lo = hi;
        hi = Math.min(max, lo + 1000);
       
        emitter.emit('progress',{min,max,percent}); //repeated afer every 1000 calculation

    }, 10); //repeat this after every 100 ms

    emitter.on('abort',()=>{
        abortRequested=true;
    });


   return emitter;
}

module.exports={
    findPrimesAsync,
    findPrimesEvent
}