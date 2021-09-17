let {ApiKey} = require('../models/api-key');
let bcrypt = require('bcrypt');
const { ServiceError, checkRequired, validate } = require('../utils/service-error');


const generateApiKey=async ({body})=>{

    checkRequired(body,'domain');
    const {domain}=body;

    let existing= await ApiKey.findOne({domain:domain});
    console.log('existing',existing);
    if(existing)
        throw new ServiceError(400,"domain already present");

    let apiKey= await bcrypt.hash(domain, 5);
   
    const key= new ApiKey({domain,apiKey});
    const result=await key.save();

    return {success:true, apiKey};

}

const listApiKeys=async()=>{
    return await ApiKey.find();
}

module.exports={
    generateApiKey, 
    listApiKeys, 
}