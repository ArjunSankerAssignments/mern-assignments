const UserService = require('../user-service');
const UserModel = require('../../models/user');
const bcrypt=require('bcrypt');




jest.mock("../../models/user", () => {

    //return a module object that contains User object
    
    return {   //The Module

        User:{ //Contains User
            findOne:jest.fn()
        }    
    
    }
    
});

describe('Login Service Tests', () => {

    beforeEach(()=>{
        //reset the mock implmentation before every call
        UserModel.User.findOne.mockReset();
    })

    it('should return error if password is not supplied', () => {

        return UserService
            .login({ body: { email: 'test@example.com' } })
            .catch(error => {
                expect(error.details.missingKeys[0]).toBe("password");
            });

    }); 

    it('should return error if password is less than 5 chars', () => {

        return UserService
            .login({ body: { email: 'test@example.com', password: 'hi' } })
            .catch(error => {
                expect(error.message).toMatch(/password must be at least 5 characters/);
                expect(error.status).toBe(400);
            });
    });

 
  

    it('should return error for invalid email', () => {

        //when ever anyone calls User.findOne reject with null value
        //we are not really connecting to a database
        UserModel.User.findOne.mockReturnValue(null);

        let body={email: 'test@example.com', password:'hello123'};
        
        return UserService
                        .login({body})
                        .catch(error=>{
                            expect(error.status).toBe(401);
                            expect(error.message).toMatch(/invalid email/);
                        });

                         

    });

    it('should return error for invalid password', async () => {

        const password='right-password';
        let user={ 
                    email: 'test@example.com', 
                    name:'Vivek'
                };

        user.password=await bcrypt.hash(password,10);

        UserModel.User.findOne.mockResolvedValue(user);

        try{
            let token=await UserService.login({body:{email:user.email, password:'wrong'+password}});           
            throw new Error("I shouldn't reach here");
        }catch(e){
            expect(e.message).not.toBe("I should not reach here");
            expect(e.status).toBe(401);
            expect(e.message).toContain("invalid email/password");
        }


    });


    it('should return valid result with name for successful login', async() => {

        const password='right-password';
        let user={ 
                    email: 'test@example.com', 
                    name:'Vivek'
                };

        user.password=await bcrypt.hash(password,10);
        
        UserModel.User.findOne.mockResolvedValue(user);

        let response= await UserService.login({body:{email:user.email, password}});

        expect(response.token).not.toBeNull();
        expect(response.name).toBe(user.name);


    });


});