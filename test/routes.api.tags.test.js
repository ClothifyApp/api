const assert = require("assert");
const proxyquire = require("proxyquire");
const jwt = require('../lib/jwt');

const TagsServiceMock = require("../utils/mocks/tags");
const authenticateMock = require("../utils/mocks/auth");

const testServer = require("../utils/testServer");


describe("routes - api - tags", function () {

    
    const route = proxyquire("../routes/Tag", {
        "../controllers/Tag": proxyquire("../controllers/Tag",{
            "../services/Tag": TagsServiceMock
        }),
        "../middleware/auth" : authenticateMock
    });

    const request = testServer(route);

    describe("GET /tags", function () {

        it("should respond with status 200", function (done) {
            request.get("/tags").expect(200, done());
        })


        it("should respond with content type json", function (done) {
            request.get("/tags").expect("Content-type", /json/, done());
        })


        it("should respond with not error", function (done) {
            request.get("/tags").end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(err, null);
                done();
            });
        });

        it("should respond with the list of tags", function (done) {

            request.get("/tags").end((err, res) => {

                if (err) return done(err);
                
                assert.deepEqual(res.body, {
                    data: {
                        tags: TagsServiceMock.tagsMock
                    }
                });
                done();
            });
        })
    })
})