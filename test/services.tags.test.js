const assert = require('assert');
const proxyquire = require('proxyquire');


const tagServiceMock = require("../utils/mocks/tagService")


const {
    tagsMock
} = require('../utils/mocks/tags')

describe("services - tags",function(){
    const tagService = proxyquire("../services/Tag",{
        "../schema/Tag": tagServiceMock
    });

    describe("when list method is called",async function(){
        
        it("should call find method ", async function() {
            await tagService.list({});
            assert.strictEqual(tagServiceMock.findStub.called, true);
 
        });

        it("should return an array of tags", async function() {
            
            const tags = await tagService.list({});
            assert.deepEqual(tags, tagsMock);
 
        });
       
    })

    describe("when getOne method is called",async function(){
        
        it("should call findById method", async function() {
            await tagService.getOne("5f4315184e43d65bb2487e75");

            assert.strictEqual(tagServiceMock.findByIdStub.called, true);
 
        });

        it("should return a tag", async function() {
            const tag = await tagService.getOne("5f4315184e43d65bb2487e75");
            assert.deepEqual(tag, tagsMock[0]);
 
        });
       
    });

    describe("when created method is called",async function(){
        
        it("should call create method", async function() {

            await tagService.create();
            assert.strictEqual(tagServiceMock.createdStub.called, true);
 
        });
       
    })

    describe("when update method is called",async function(){
        
        it("should call update method", async function() {

            await tagService.update();
            assert.strictEqual(tagServiceMock.updatedOneStub.called, true);
 
        });
       
    })

    describe("when delete method is called",async function(){
        
        it("should call delete method", async function() {
            
            await tagService.delete();
            assert.strictEqual(tagServiceMock.deleteOneStub.called, true);
 
        });
       
    })

})