// const primes= require('./primes');
// console.log('primes',primes);


const {findPrimes} = require('./primes');


function findAndPrintPrimes(max){

    let start= Date.now();
    console.log('finding primes between 2 and ',max);

    findPrimes(2,max, (error,primes)=>{
        if(error){
            return console.log('error',error.message);
        }
        //handle the result
        let end= Date.now();
        console.log('total primes between 2 and ',max, ' is ',primes.length);
        console.log('total time taken is',(end-start),'ms');
        console.log();
    });
    
}

function testfindAndPrintPrime(){
    findAndPrintPrimes(200000);
    findAndPrintPrimes(2000);
    findAndPrintPrimes(-100);
}

testfindAndPrintPrime();