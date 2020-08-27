const { garmentsMock } = require("./garments");
const sinon = require("sinon");

const findStub = sinon.stub();
const findByIdStub = sinon.stub();
const createdStub = sinon.stub();
const updatedOneStub = sinon.stub();
const deleteOneStub = sinon.stub();



findStub.withArgs({}).resolves(garmentsMock);
findByIdStub.withArgs("5f4318e7c66212ffa828c3fd").resolves(garmentsMock[1]);
createdStub.resolves(garmentsMock[1]);
updatedOneStub.resolves({ "nModified": 1 });
deleteOneStub.resolves({ "deletedCount": 1 });

module.exports = {
    find : (query) => {
        return findStub(query);
    },
    findById: (id)=>{
        return findByIdStub(id);
    },
    create: (garment) => {
        return createdStub(garment);
    },
    updateOne: () => {
        return updatedOneStub();
    },
    deleteOne: () => {
        return deleteOneStub();
    },
    findStub,
    findByIdStub,
    createdStub,
    updatedOneStub,
    deleteOneStub
};


