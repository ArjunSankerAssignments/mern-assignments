const { response } = require("express");

class HttpResponse{
    constructor(data, status=200){
        this.data=data;
        this.status=status;
    }
}


function handleRequest( requestHandler, renderPage=false ){

    return async (request,response)=>{

        try{

            let statusMap={
                get: 200,
                post:201,
                put:202,
                patch:202,
                delete:204
            }

            let data={
                body:request.body,
                ...request.params,  //add parameter like id
                ...request.query,   // add query like q
                request,            //in rare case you umay need 
                response            //direct access to request and response
            };
            
            console.log(request.body);
            const result=await requestHandler(data);

            let status= statusMap[request.method.toLocaleLowerCase()];
            response.status(status).json(result);

            if(renderPage)
                next();

            // if(result.data && result.status){
            //     response.status(result.status).json(result.data);
            // } else{
            //     let status= statusMap[request.method.toLocaleLowerCase()];
            //     response.status(status).json(result);
            // }
            

        }catch(error){
            response.status(error.status).json(error.details);
        }

    };
}

function handlePage(url, render=true, redirect=false){
    return async (request, response)=>{
        try{
            let data= await response.json();
            console.log(data);
            if(render)
                response.render(url, {data});
            if(redirect)
                response.redirect(url);
        }catch(err){
            response.status(err.status).json(err.details);
            console.log(err.details);
        }
    };
}

module.exports={HttpResponse, handleRequest, handlePage};