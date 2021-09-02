//const { request, response } = require("express");
const express=require("express");

require('dotenv').config();
const {DB_USER,DB_PASSWORD,DB_URL2}=process.env;

const mongoose = require('mongoose');
const {UserModel} = require( '../../db/user');

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL2}?retryWrites=true&w=majority`;


const getUserRouter = ()=>{
    let router=express.Router();

    router
        .route("/")
        .get(async (request, response)=>{
            console.log('inside user list route');
            try{
                await mongoose.connect(uri);
                console.log('connected');
                let userList = await UserModel.find({});
                
                let newUserList = userList.map(u=>u.username);
                console.log(newUserList);
                //response.send(JSON.parse());
                response.send(newUserList);
                mongoose.connection.close();
            }catch(err){
                console.log(err.message);
            }
        });

    router
        .route("/login")
        .post(async (request, response)=>{
            
            let reqUser = request.body;
            console.log(reqUser);
            console.log('inside user login route');

            try{
                await mongoose.connect(uri);
                console.log('connected');
                let user = await UserModel.find({"username":reqUser.username});
                //console.log(typeof(user[0].password));
                
                if(user != undefined && user.length>0){
                    if(String(user[0].password) === reqUser.password)
                        response.send("Login Sucessfull");
                    else    
                        response.send("Wrong Password");
                }else{
                    response.send("Wrong User Name");
                }
                mongoose.connection.close();
            }catch(err){
                console.log(err.message);
            }
        });

        router
        .route("/register")
        .post(async (request, response)=>{
            
            let reqUser = request.body;
            console.log(reqUser);
            console.log('inside user register route');
            let newUser = new UserModel();

            newUser.username = reqUser.username;
            newUser.password = reqUser.password;

            console.log(newUser);
            try{
                await mongoose.connect(uri);
                console.log('connected');
                await UserModel.create(newUser);
                //console.log(typeof(user[0].password));
                
                response.send("User Registration sucessfull");
                mongoose.connection.close();
            }catch(err){
                console.log(err.message);
            }
        });
    
    return router;
}

module.exports=getUserRouter;