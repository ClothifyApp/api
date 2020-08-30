
const matchsMock = [
    {
        firstUser: "5f4bf11f6863803540a96489",
        secondUser: "5f4bf130713edff99623dc2a",
        garments: [
            "5f4bf13eeff105d5ff2bbd16"
        ]
    },
    {
        firstUser: "5f4bf1366fae7c1745e90022",
        secondUser: "5f4bf126b8280246e10b8f6c",
        garments: [
            "5f4bf1465878dd2fb2dd313a",
            "5f4bf15416ccb6df33d8fd4b"
        ]
    }
];

const list = async() => {
    return Promise.resolve(matchsMock);
}

const create = async() => {
    return Promise.resolve(matchsMock[0]);
}


module.exports = {
    matchsMock,
    list,
    create
}
