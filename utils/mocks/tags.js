
const tagsMock = [
    {
        name: "shirt"
    },
    {
        name: "shoes"
    },
    {
        name: "skirts"
    }
];

const list = async () => {
    return Promise.resolve(tagsMock);
}


module.exports = {
    tagsMock,
    list
}
