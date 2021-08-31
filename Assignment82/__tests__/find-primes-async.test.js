const { expect } = require('@jest/globals');
const {findPrimesAsync} = require('../programs/primes');

describe('findPrimesAsync tests',()=>{

    it('findPrimeAsync(2,10) should return 4 primes',()=>
        findPrimesAsync(2,10).then(primes=>expect(primes.length).toBe(4))
    );


    it('findPrimeAsync(0,100) should return 25 primes',()=>
        findPrimesAsync(0,100).then(primes=>expect(primes.length).toBe(25))
    );

    it('findPrimeAsync(10,1) should throw an invalid range error',()=>
        findPrimesAsync(10,1).catch(e=>expect(e.message).toMatch(/Invalid Range*/))
    );

    it('findPrimeAsync(-50,0) should return 0 primes',(done)=>{
        findPrimesAsync(0,100000).then(primes=>expect(primes.length).toBe(9592))
        done();
    }
    );

});