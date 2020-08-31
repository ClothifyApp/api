const assert = require("assert");
const proxyquire = require('proxyquire');
const userServiceMock = require("../utils/mocks/userService")
const jwt = require('../lib/jwt');
const { expect } = require('chai');

describe("middleware - auth", function () {

    const { authenticate }  = proxyquire("../middleware/auth",{
        "../services/User": proxyquire("../services/User",{
            "../schema/User" : userServiceMock
        })
    });

    it("should call next()", async function() {
        

        token = jwt.generateToken({
            id: "5f4312cdb1dc1d460422c571",
        });

        const request = {
            headers : {
                'x-access-token' : token
            }   
        }

        const authRequest = await authenticate(request,{},function(){
            return function(){}
        });

        expect(authRequest).to.be.an('function');    

    });


});