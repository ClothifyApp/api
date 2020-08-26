
const garmentsMock = [
    {
        name: "Blue Big Shirt X1",
        description: "A huge shirt for a spectacular price",
        photos : ["blue-shirt-x1.jpg"],
        tags : ["5f42fd9ceb45d87f0b9e7834","5f42fda8fd21d28d5b7a608b"],
        userId: "5f42fdbe20e1c0f98fbea1a1"
    },
    {
        name: "Green Shoes XL Women",
        description: "Spectacular shoes for women",
        photos : ["shoes-x2.png"],
        tags : ["5f42fe0704eea8689284bba1"],
        userId: "5f42fe17f79c0924da7adbc5"
    },
];

const list = async () => {
    return Promise.resolve(garmentsMock);
}


module.exports = {
    garmentsMock,
    list
}
