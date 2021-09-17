//import {checkRequired} from '../service-error';
const {checkRequired} = require('../service-error');

describe('checkRequired functionality tests',()=>{

    let model={name:'Vivek',email:'test@email.com'};

    it('should return true if model contains all keys',()=>{
 
        expect(checkRequired(model,"name","email")).toBe(true);
 
    });

    it('should throw ServiceError if key is missing',()=>{

        expect(()=>checkRequired(model,"name","email","phone")).toThrow(/Missing Required Key/);

    });
})