const assert = require("assert");
const proxyquire = require("proxyquire");
const jwt = require('../lib/jwt');

const MatchsServiceMock = require("../utils/mocks/matchs");
const authenticateMock = require("../utils/mocks/auth");

const testServer = require("../utils/testServer");


describe("routes - api - matchs", function () {

    let token;

    before(function (done) {

        token = jwt.generateToken({
            id: "5f46b2a641be90d325c2f34c",
        });

        done();

    });


    const route = proxyquire("../routes/Match", {
        "../controllers/Match": proxyquire("../controllers/Match", {
            "../services/Match": MatchsServiceMock
        }),
        "../middleware/auth": authenticateMock
    });

    const request = testServer(route);

    describe("GET /match", function () {

        
        it("should respond with status 200", function (done) {

            request.get("/match").set({ 'x-access-token': token }).expect(200, done());
        })


        it("should respond with content type json", function (done) {

            request.get("/match").set({ 'x-access-token': token }).expect("Content-type", /json/, done());
        })


        it("should respond with not error", function (done) {

            request.get("/match").set({ 'x-access-token': token }).end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(err, null);
                done();
            });
        });

        it("should respond with the list of matchs", function (done) {


            request.get("/match").set({ 'x-access-token': token }).end((err, res) => {


                if (err) return done(err);
                //console.log(res)


                assert.deepEqual(res.body, {
                    data: {
                        matches: MatchsServiceMock.matchsMock
                    }
                });
                done();
            });
        })
    });

    describe("POST /match", function () {

        it("should respond with status 201", function (done) {
            request.post('/match').set({ 'x-access-token': token, user: {
                id: "5f4312cdb1dc1d460422c571",
                preferences: [ 'shoes', 'tie' ],
                phone: '+573002183215',
                uuid: '6d79e0ab-17e4-4660-9408-a4907c36a1b2'
            }}).send({
                secondUser: "5f4bf130713edff99623dc2a",
                garments: [
                    "5f4bf13eeff105d5ff2bbd16"
                ]
            }).expect(201, done());
        })

        // it("should respond with the created match", function (done) {

        //     request.post("/match").set({ 'x-access-token': token, 'user': {
        //         id: "5f4312cdb1dc1d460422c571",
        //         preferences: [ 'shoes', 'tie' ],
        //         phone: '+573002183215',
        //         uuid: '6d79e0ab-17e4-4660-9408-a4907c36a1b2'
        //     }}).send({
        //         secondUser: "5f4bf130713edff99623dc2a",
        //         garments: [
        //             "5f4bf13eeff105d5ff2bbd16"
        //         ]
        //     }).end((err, res) => {

        //         if (err) return done(err);
        //         assert.deepEqual(res.body, {
        //             data: {
        //                 matches: MatchsServiceMock.matchsMock[0],

        //             },
        //             message: 'Match creado correctamente',
        //         });
        //         done();
        //     });
        // })

    })
})