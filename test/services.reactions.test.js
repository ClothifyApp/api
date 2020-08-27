const assert = require('assert');
const proxyquire = require('proxyquire');


const reactionServiceMock = require("../utils/mocks/reactionService")


const {
    reactionsMock
} = require('../utils/mocks/reactions')

describe("services - reactions",function(){
    const reactionService = proxyquire("../services/Reaction",{
        "../schema/Reaction": reactionServiceMock
    });

    describe("when list method is called",async function(){
        
        it("should call find method ", async function() {
            await reactionService.list({});
            assert.strictEqual(reactionServiceMock.findStub.called, true);
 
        });

        it("should return an array of reactions", async function() {
            
            const reactions = await reactionService.list({});
            assert.deepEqual(reactions, reactionsMock);
 
        });
       
    })

    describe("when getOne method is called",async function(){
        
        it("should call findById method", async function() {
            await reactionService.getOne("5f43181066ecff7612ad2588");

            assert.strictEqual(reactionServiceMock.findByIdStub.called, true);
 
        });

        it("should return a reaction", async function() {
            const reaction = await reactionService.getOne("5f43181066ecff7612ad2588");
            assert.deepEqual(reaction, reactionsMock[0]);
 
        });
       
    })

    describe("when created method is called",async function(){
        
        it("should call create method", async function() {

            await reactionService.create();
            assert.strictEqual(reactionServiceMock.createdStub.called, true);
 
        });
       
    })

    describe("when update method is called",async function(){
        
        it("should call update method", async function() {

            await reactionService.update();
            assert.strictEqual(reactionServiceMock.updatedOneStub.called, true);
 
        });
       
    })

    describe("when delete method is called",async function(){
        
        it("should call delete method", async function() {
            
            await reactionService.delete();
            assert.strictEqual(reactionServiceMock.deleteOneStub.called, true);
 
        });
       
    })

})