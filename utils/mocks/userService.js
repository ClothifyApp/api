const { usersMock } = require("./users");
const sinon = require("sinon");

const findStub = sinon.stub();
const findByIdStub = sinon.stub();
const createdStub = sinon.stub();
const updatedOneStub = sinon.stub();
const deleteOneStub = sinon.stub();

findStub.withArgs({}).resolves(usersMock);
findByIdStub.withArgs("5f4312cdb1dc1d460422c571").resolves(usersMock[0]);

createdStub.withArgs({
    phone: "+57324587212",
    uuid: "4564cvcvsfddfw456",
}).resolves(usersMock[1]);

updatedOneStub.resolves({ "nModified": 1 });

deleteOneStub.resolves({ "deletedCount": 1 });


module.exports = {
    find: (query) => {
        return findStub(query);
    },
    findById: (id) => {
        return findByIdStub(id);
    },
    create: (user) => {
        return createdStub(user);
    },
    updateOne: (id, user, photo, country, preferences) => {
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


