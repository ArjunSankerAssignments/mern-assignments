const { User } = require('../models/user');
const { ServiceError, checkRequired, validate } = require('../utils/service-error');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PASSWORD_SECRET } = process.env;
console.log(PASSWORD_SECRET);

const register = async ({ body }) => {

   
    checkRequired(body, 'name', 'email', 'password');
    validate(body, (body) => {
        if (body.password.length < 5)
            return { key: "password", message: "password must be at least 5 characters" };
    });

    //is the current email already registered
    let user = await User.findOne({ email: body.email });
    if (user) {
        //if yes, report error
        throw new ServiceError(400, "duplicate email id");
    }

    //encrypt the password before storing it on the server
    const password = await bcrypt.hash(body.password, 10);

    if (!body.roles)
        body.roles = ['user'];  //user will have default role of 'user'
       
    //save the data in the database
    let newUser = new User({ ...body, password });
    let result = await newUser.save();
    
    return createJwtToken(newUser);

}

const getAllUsers = async () => {
    return await User.find({},{__v:false, password:false});
}

function createJwtToken(user) {
    
    let token = jwt.sign({ email: user.email, roles: user.roles }, process.env.PASSWORD_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    return { token, name: user.name };
}

const login = async ({ body }) => {

    checkRequired(body, "email", "password");
    validate(body, body => {
        if (body.password < 5)
            return { key: "password", message: "password must be at least 5 characters" };
    });



    let user = await User.findOne({ email: body.email });

    if (!user) //if no user is present
        throw new ServiceError(401, "invalid email/password");


    //compare current password with stored passed using bcrypt
    let match = await bcrypt.compare(body.password, user.password);
    if (!match)
        throw new ServiceError(401, "invalid email/password");


    return createJwtToken(user);

}


//this middleware is required before all routes
const verifyToken = (request, response, next) => {
    try {
        let token = request.headers.authorization; //get authorization header
        console.log('token', token);
        if (!token)
            throw new ServiceError(401, "Unauthorized: You need to login before you carrry out this action");

        token = token.split(' ')[1];
        console.log(token);

        let user = jwt.verify(token, process.env.PASSWORD_SECRET);
        console.log('token content', user);
        request.user=user; //add current user to the request
        request.tokenError=null;
    } catch (error) {
        request.tokenError= {status:401, message:error.message};
        request.user=null;
    }
    
    next();

}

//This middleware is required by selected routes only  and not by all routes
const authenticate=(request,response,next)=>{
    
    if(!request.user){
        //return the error 401 in case token is not present
        console.log('sending 401 with ', request.tokenError);
        
        response.status(401).json(request.tokenError);
    } else {
        next();
    }
} 


const authorize= (role) => (request,response,next)=>{
    
    if(!request.user)        
        return response.status(401).json(request.tokenError);

    role=role.toLowerCase();
    if(request.user.roles.find(r=> r.toLowerCase()===role)){
        return next();   
    }

    return response.status(403).json({message:`This action requires user with role: ${role} `});

}


module.exports = {
    register,
    getAllUsers,
    login,
    verifyToken,
    authenticate,
    authorize
};


