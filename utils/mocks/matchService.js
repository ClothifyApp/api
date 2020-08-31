const { matchsMock } = require("./matchs");
const { usersMock } = require("./users");
const sinon = require("sinon");

const findStub = sinon.stub();
const findByIdStub = sinon.stub();
const createdStub = sinon.stub();
const updatedOneStub = sinon.stub();
const deleteOneStub = sinon.stub();
const getUserMatchesStub = sinon.stub();

findStub.withArgs({}).resolves(matchsMock);
findByIdStub.withArgs("5f4315184e43d65bb2487e75").resolves(matchsMock[0]);
createdStub.resolves(matchsMock[1]);
updatedOneStub.resolves({ "nModified": 1 });
deleteOneStub.resolves({ "deletedCount": 1 });
getUserMatchesStub.resolves()



module.exports = {
    find : (query) => {
        return findStub(query);
    },
    findById: (id)=>{
        return findByIdStub(id);
    },
    create: (match) => {
        return createdStub(match);
    },
    update: () => {
        return updatedOneStub();
    },
    deleteOne: () => {
        return deleteOneStub();
    },
    getUserMatches:() => {
        return usersMock
    },
    findStub,
    findByIdStub,
    createdStub,
    updatedOneStub,
    deleteOneStub,
    getUserMatchesStub

};


