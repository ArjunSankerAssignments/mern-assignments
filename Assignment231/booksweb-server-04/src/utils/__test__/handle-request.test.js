const { handleRequest } = require('../express-utils');
const { Response } = require('../express-fakes');
const { ServiceError } = require('../service-error');
describe('handle request tests', () => {


    it('should return an async function', () => {

        let result = handleRequest();
        expect(typeof (result)).toBe('function');

        expect(result() instanceof Promise).toBe(true);

    });

    it('should return status 200 for success GET call', async () => {

        const dummyData = ["one", "two", "three"];
        //returns a Promise that returns dummy data
        const getDummyData = () => Promise.resolve(dummyData);

        let routeHandler = handleRequest(getDummyData);

        //call the routeHandler. with request and response object
        //current function doesn't use anything from request
        const request = { method: "GET" };  //dummy request
        const response = new Response(); //fake response

        await routeHandler(request, response);

        expect(response._status).toBe(200);
        expect(response._body).toBe(dummyData);

    });

    it('should return status 404 if handler throw ServiceError', async () => {

        const error = new ServiceError(404, "Not Found", { id: 1 });

        const requestHandler = () => Promise.reject(error);

        const request = { method: "GET" };

        const response = new Response();

        let routeHandler = handleRequest(requestHandler);

        await routeHandler(request, response);

        expect(response._status).toBe(404);
        expect(response._body.id).toBe(1);


    });


    const getResponseObject = () => {

        let response = {
            status: jest.fn(), //mock function
            json: jest.fn()   //mock function
        }
        //status function should return itself
        response.status.mockReturnThis();

        response.json.mockReturnThis();
        return response;
    };


    it('should return 201 for successful post call', async () => {

        const service = jest.fn(); // a mock function

        const response = getResponseObject();

        let request = { method: 'POST' }
        let routeHandler = handleRequest(service);

        await routeHandler(request, response);

        //is my service ever called?
        expect(service).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(201);


    });

    it('should return 200 and expected data for success GET call', async () => {

        const dummyData = { title: 'The Accursed God', id: 1 };

        const service = jest.fn();

       // service.mockImplementation(() => Promise.resolve(dummyData));
       service.mockResolvedValue(dummyData);

        let request = { method: "get" };
        let response = getResponseObject();

        let requestHandler = handleRequest(service);

        await requestHandler(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(dummyData);


    });


    it('should return 404 and expected data for success GET call', async () => {

        //const dummyData={title:'The Accursed God',id:1};
        const error = new ServiceError(404, 'No Such Book', { id: 1 });

        const service = jest.fn();

        //service.mockImplementation(()=>Promise.resolve(dummyData));

        service.mockRejectedValue(error); //service.mockImplementation(()=>Promise.reject(error));

        let request = { method: "get" };
        let response = getResponseObject();

        let requestHandler = handleRequest(service);

        await requestHandler(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
        //  expect(response.json).toHaveBeenCalledWith(error.details);


    });








});