const assert = require('assert');
const proxyquire = require('proxyquire');


const garmentServiceMock = require("../utils/mocks/garmentService")


const {
    garmentsMock
} = require('../utils/mocks/garments')

describe("services - garments",function(){
    const garmentService = proxyquire("../services/Garment",{
        "../schema/Garment": garmentServiceMock
    });

    // describe("when list method is called",async function(){
        
    //     it("should call find method ", async function() {
    //         await garmentService.list({});
    //         assert.strictEqual(garmentServiceMock.findStub.called, true);
 
    //     });

    //     it("should return an array of garments", async function() {
            
    //         const garments = await garmentService.list({});
    //         assert.deepEqual(garments, garmentsMock);
 
    //     });
       
    // })

    describe("when getOne method is called",async function(){
        
        it("should call findById method", async function() {
            await garmentService.getOne("5f4318e7c66212ffa828c3fd");

            assert.strictEqual(garmentServiceMock.findByIdStub.called, true);
 
        });

        // it("should return a garment", async function() {
        //     const garment = await garmentService.getOne("5f4318e7c66212ffa828c3fd");
        //     assert.deepEqual(garment, garmentsMock[1]);
 
        // });
       
    });

    describe("when created method is called",async function(){
        
        it("should call create method", async function() {

            await garmentService.create();
            assert.strictEqual(garmentServiceMock.createdStub.called, true);
 
        });
       
    })

    describe("when update method is called",async function(){
        
        it("should call update method", async function() {

            await garmentService.update();
            assert.strictEqual(garmentServiceMock.updatedOneStub.called, true);
 
        });
       
    })

    describe("when delete method is called",async function(){
        
        it("should call delete method", async function() {
            
            await garmentService.delete();
            assert.strictEqual(garmentServiceMock.deleteOneStub.called, true);
 
        });
       
    })

})