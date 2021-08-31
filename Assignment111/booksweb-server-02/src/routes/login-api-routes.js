//const { request, response } = require("express");
const express=require("express");

let UserList = [
    {
        name:"abcd",
        pass:"1234"
    }
];

const getUserRouter = ()=>{
    let router=express.Router();

    router
        .route("/")
        .get((request, response)=>{
            console.log("Inside Login api");
            response.send("Login Page");
        })
        .post((request, response)=>{
            let loginDetails = request.body;

            let user = UserList.find(u=>u.name===loginDetails.userName.trim()); 
            if(user === undefined)
                response.send("Invalid Username");
            else{
                if(user.pass === loginDetails.pass.trim())
                    response.send("Login Successful");
            }
        });

    router
        .route("/newUser")
        .get((request, response)=>{
            console.log("New Registration");
            response.send("Registration Page");
        })
        .post((request, response)=>{
            let regDetails=request.body;

            UserList.push({
                name:regDetails.userName.trim(),
                pass:regDetails.pass.trim()
            });

            console.log(UserList);
            response.send("Registration Sucsessful");
        });
    
    return router;
}

module.exports=getUserRouter;