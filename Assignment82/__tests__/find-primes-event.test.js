const {findPrimesEvent} = require("../programs/primes");
const { expect } = require("@jest/globals");


describe('findPrimesEvent tests',()=>{

    it('findPrimesEvent(2,10) should emit 4 prime events',()=>{
            evnt=findPrimesEvent(2,10);
            let count = 0;
            evnt.on("prime", ()=>count++);
            evnt.on("done", ()=>expect(count).toBe(4));
        }
    );


    it('findPrimeEvent(0,100) should return 25 primes',()=>{
            evnt = findPrimesEvent(0,100);
            evnt.on("done", ({total})=>expect(total).toBe(25));
        }
    );

    it('findPrimesEvent(10,1) should throw an invalid range error',()=>{
            evnt = findPrimesEvent(10,1);
            evnt.on("error", e=>expect(e.message).toMatch(/Invalid Range*/));
        }
    );

    it('findPrimesEvent(-50,0) should return 0 primes',()=>{
            evnt = findPrimesEvent(-50,0);
            evnt.on("done", ({total})=>expect(total).toBe(0));
        }
    );

    it('findPrimesEvent(-50,2) should return 1 prime',()=>{
        evnt = findPrimesEvent(-50,2);
        evnt.on("done", ({total})=>expect(total).toBe(1));
    }
);

});