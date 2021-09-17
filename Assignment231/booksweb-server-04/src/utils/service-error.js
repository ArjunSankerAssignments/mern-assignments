

class ServiceError extends Error {

    constructor(status, message, params){
        super(message);
        this.status=status;
        this.details={...params,status, message};
    }

    static from(error, status=400){
        if(error.status && error.message && error.details) 
            return error;

        return new ServiceError(status, error.message, error);
    }
}

const checkRequired=(model,...keys)=>{

    let missingKeys=[];
    
    
    for(key of keys) {
        if(!model[key]){
           missingKeys.push(key);
        }
    }

    if(missingKeys.length>0) 
        throw new ServiceError(400,"Missing Required Keys", {missingKeys});

    return true;

}

const validate=(object, fn)=>{

    let error=fn(object);

    if(error){
        throw new ServiceError(400, error.message, error);
    }
}



module.exports={ServiceError,checkRequired,validate};