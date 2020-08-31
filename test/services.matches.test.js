const assert = require('assert');
const proxyquire = require('proxyquire');

const matchServiceMock = require("../utils/mocks/matchService")

const {
    matchsMock
} = require('../utils/mocks/matchs')


describe("services - matchs",function(){
    const matchService = proxyquire("../services/Match",{
        "../schema/Match": matchServiceMock
    });

    describe("when list method is called",async function(){
        
        it("should call find method ", async function() {
            await matchService.list({});
            assert.strictEqual(matchServiceMock.findStub.called, true);
 
        });

        it("should return an array of tags", async function() {
            
            const matchs = await matchService.list({});
            assert.deepEqual(matchs, matchsMock);
 
        });
       
    })

    describe("when getOne method is called",async function(){
        
        it("should call findById method", async function() {
            await matchService.getOne("5f4315184e43d65bb2487e75");

            assert.strictEqual(matchServiceMock.findByIdStub.called, true);
 
        });

        it("should return a match", async function() {
            const match = await matchService.getOne("5f4315184e43d65bb2487e75");
            assert.deepEqual(match, matchsMock[0]);
 
        });
       
    });

    describe("when created method is called",async function(){
        
        it("should call create method", async function() {

            await matchService.create();
            assert.strictEqual(matchServiceMock.createdStub.called, true);
 
        });
       
    })

    describe("when update method is called",async function(){
        
        it("should call update method", async function() {

            await matchService.update();
            assert.strictEqual(matchServiceMock.updatedOneStub.called, true);
 
        });
       
    })

    describe("when delete method is called",async function(){
        
        it("should call delete method", async function() {
            
            await matchService.delete();
            assert.strictEqual(matchServiceMock.deleteOneStub.called, true);
 
        });
       
    })

})