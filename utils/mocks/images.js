
const urlMocks = [
    {
        url: "https://clothify.s3-us-west-2.amazonaws.com/x212_1.jpg"
    },
    {
        url: "https://clothify.s3-us-west-2.amazonaws.com/erer323.jpg"
    }

];

const upload = async() => {
    return Promise.resolve(urlMocks[0]);
}



module.exports = {
    urlMocks,
}
