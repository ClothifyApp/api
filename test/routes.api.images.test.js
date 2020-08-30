const assert = require("assert");
const proxyquire = require("proxyquire");
const jwt = require('../lib/jwt');

const ImageServiceMock = require("../utils/mocks/images");
const authenticateMock = require("../utils/mocks/auth");

const testServer = require("../utils/testServer");


describe("routes - api - images", function () {

    let token;

    before(function (done) {

        token = jwt.generateToken({
            id: "5f46b2a641be90d325c2f34c",
        });

        done();

    });


    const route = proxyquire("../routes/Image", {
        "../controllers/Image": proxyquire("../controllers/Image", {
            "../services/Image": ImageServiceMock
        }),
        "../middleware/auth": authenticateMock
    });

    const request = testServer(route);



    describe("POST /image", function () {

        it("should respond with status 201", function (done) {
            request.post('/image').set({ 'x-access-token': token }).send({'image':'clothify.png'}).expect(201, done());
        })

    
    })
})