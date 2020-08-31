const assert = require('assert');
const proxyquire = require('proxyquire');


const userServiceMock = require("../utils/mocks/userService")


const {
    usersMock
} = require('../utils/mocks/users')

describe("services - users",function(){
    const userService = proxyquire("../services/User",{
        "../schema/User": userServiceMock
    });

    describe("when list method is called",async function(){
        
        it("should call find method", async function() {
            await userService.list({});
            assert.strictEqual(userServiceMock.findStub.called, true);
 
        });

        it("should return an array of users", async function() {
            const users = await userService.list({});
            assert.deepEqual(users, usersMock);
 
        });
       
    })

    describe("when getOne method is called",async function(){
        
        it("should call findById method", async function() {
            await userService.getOne("5f4312cdb1dc1d460422c571");
            assert.strictEqual(userServiceMock.findByIdStub.called, true);
 
        });

        it("should return an user", async function() {
            const user = await userService.getOne("5f4312cdb1dc1d460422c571");
            assert.deepEqual(user, usersMock[0]);
 
        });
       
    })

    describe("when created method is called",async function(){
        
        it("should call create method", async function() {

            const user = {
                phone: "+57324587212",
                uuid: "4564cvcvsfddfw456",
            };

            await userService.create(user);
            assert.strictEqual(userServiceMock.createdStub.called, true);
 
        });
       
    })

    describe("when update method is called",async function(){
        
        it("should call update method", async function() {

            await userService.update();
            assert.strictEqual(userServiceMock.updatedOneStub.called, true);
 
        });
       
    })

})