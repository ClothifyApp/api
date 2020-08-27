const { reactionsMock } = require("./reactions");
const sinon = require("sinon");

const findStub = sinon.stub();
const findByIdStub = sinon.stub();
const createdStub = sinon.stub();
const updatedOneStub = sinon.stub();
const deleteOneStub = sinon.stub();


findStub.withArgs({}).resolves(reactionsMock);
findByIdStub.withArgs("5f43181066ecff7612ad2588").resolves(reactionsMock[0]);
createdStub.resolves(reactionsMock[1]);
updatedOneStub.resolves({ "nModified": 1 });
deleteOneStub.resolves({ "deletedCount": 1 });


module.exports = {
    find : (query) => {
        return findStub(query);
    },
    findById: (id)=>{
        return findByIdStub(id);
    },
    create: (reaction) => {
        return createdStub(reaction);
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


