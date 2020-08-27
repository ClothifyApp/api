const assert = require("assert");
const proxyquire = require("proxyquire");
const jwt = require('../lib/jwt');

const GarmentsServiceMock = require("../utils/mocks/garments");
const authenticateMock = require("../utils/mocks/auth");

const testServer = require("../utils/testServer");


describe("routes - api - garments", function () {

    let token;

    before(function (done) {

        token = jwt.generateToken({
            id: "5f46b2a641be90d325c2f34c",
        });

        done();

    });

    const route = proxyquire("../routes/Garment", {
        "../controllers/Garment": proxyquire("../controllers/Garment",{
            "../services/Garment": GarmentsServiceMock
        }),
        "../middleware/auth" : authenticateMock
    });

    const request = testServer(route);

    describe("GET /garments/full", function () {

        it("should respond with status 200", function (done) {
            request.get("/garments/full").set({ 'x-access-token': token }).expect(200, done());
        })


        it("should respond with content type json", function (done) {
            request.get("/garments/full").set({ 'x-access-token': token }).expect("Content-type", /json/, done());
        })


        it("should respond with not error", function (done) {
            request.get("/garments/full").set({ 'x-access-token': token }).end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(err, null);
                done();
            });
        });

        it("should respond with the full list of garments", function (done) {

            request.get("/garments/full").set({ 'x-access-token': token }).end((err, res) => {

                if (err) return done(err);
                
                assert.deepEqual(res.body, {
                    data: {
                        garments: GarmentsServiceMock.garmentsMock
                    }
                });
                done();
            });
        })
    })
})