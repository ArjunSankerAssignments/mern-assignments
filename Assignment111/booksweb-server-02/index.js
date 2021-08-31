const {configureExpress}=require('./src/app');

//IIFE ---> Immediately invokable function expression



(function start(){

    const app=configureExpress(__dirname);
    const port=5000;
    const server = app.listen(port,()=>console.log(`server started: http://localhost:${port}/`));
    server.on('error',(error)=>console.log(`server error: ${error}`));

})();

