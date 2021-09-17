import http from './http';

export  class UserService{
    static instance=new UserService();

    login= async(loginUser)=>{
        try{
            let response=await http.post("users/login",loginUser);
            //console.log('response', response.data);
            console.log(response.data.name);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username",  response.data.name);
            return {success:true,data:response.data};


        }catch(error){
            //console.log('error',error);
            return {success:false,error, status:error.response.status};
        }
        
    }

    logout=()=>{
        localStorage.removeItem("username");
        localStorage.removeItem("token");
    }

    getToken=()=>localStorage.getItem("token");

    getUserName=()=>localStorage.getItem("username") ;
}