// const primes= require('./primes');
// console.log('primes',primes);


const {findPrimesAsync} = require('./primes');


async function findAndPrintPrimes(max){

    try{

        let start= Date.now();
        console.log('finding primes between 2 and ',max);
        let primes=await findPrimesAsync(2,max);
        let end= Date.now();
        console.log('total primes between 2 and ',max, ' is ',primes.length);
        console.log('total time taken is',(end-start),'ms');
        console.log();

    }catch(error){
        console.log('error',error.message)
    }
   
    
}

let  testfindAndPrintPrime= ()=>{

    findAndPrintPrimes(200000);
    findAndPrintPrimes(2000);
     findAndPrintPrimes(-100);
}


testfindAndPrintPrime();

//you can't await in global area
//await findAndPrintPrimes(2,10000);

//but you can use it as a normal promise


findAndPrintPrimes(2,10000).then(()=>console.log('done'));