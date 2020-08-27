
const usersMock = [
    {
        preferences: ["shoes", "tie"],
        phone: "+573002183215",
        uuid: "6d79e0ab-17e4-4660-9408-a4907c36a1b2"
    },
    {
        preferences: ["shirts", "hat"],
        phone: "+573002183216",
        uuid: "6863edbe-2808-41a3-953b-c7964abbd7b2"
    },
    {
        preferences: [],
        phone: "+573002183218",
        uuid: "38bb51db-339e-401e-9a8e-e897949a08de"
    },

];

const list = async() => {
    return Promise.resolve(usersMock);
}

const create = async() => {
    return Promise.resolve(usersMock[0]);
}


module.exports = {
    usersMock,
    list,
    create
}
