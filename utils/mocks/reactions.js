
const reactionsMock = [
    {
        userId: "5f4300e8160e47b0bf4ec712",
        type: "superlike",
        garmentId : "5f430108358920b3dee8ed69",

    },
    {
        userId: "5f4301178a83334e27bb1fa4",
        type: "dislike",
        garmentId : "5f4301219ce5fb919baa171f",

    }
];

const list = async () => {
    return Promise.resolve(reactionsMock);
}


module.exports = {
    reactionsMock,
    list
}
