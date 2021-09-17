

class Response{
    constructor(){
        this._status=0;
        this._body=null;
    }

    status(_status){
        this._status=_status;
        return this;
    }

    json(data){
        this._body=data;
        return this;
    }
}

module.exports={
    Response
};