const { tagsMock } = require("./tags");
const sinon = require("sinon");

const findStub = sinon.stub();
const findByIdStub = sinon.stub();
const createdStub = sinon.stub();
const updatedOneStub = sinon.stub();
const deleteOneStub = sinon.stub();

findStub.withArgs({}).resolves(tagsMock);
findByIdStub.withArgs("5f4315184e43d65bb2487e75").resolves(tagsMock[0]);
createdStub.resolves(tagsMock[1]);
updatedOneStub.resolves({ "nModified": 1 });
deleteOneStub.resolves({ "deletedCount": 1 });


module.exports = {
    find : (query) => {
        return findStub(query);
    },
    findById: (id)=>{
        return findByIdStub(id);
    },
    create: (user) => {
        return createdStub(user);
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


