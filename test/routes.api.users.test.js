const assert = require("assert");
const proxyquire = require("proxyquire");
const jwt = require('../lib/jwt');

const UsersServiceMock = require("../utils/mocks/users");
const authenticateMock = require("../utils/mocks/auth");

const testServer = require("../utils/testServer");


describe("routes - api - users", function () {

    let token;

    before(function (done) {

        token = jwt.generateToken({
            id: "5f46b2a641be90d325c2f34c",
        });

        done();

    });


    const route = proxyquire("../routes/user", {
        "../controllers/User": proxyquire("../controllers/User", {
            "../services/User": UsersServiceMock
        }),
        "../middleware/auth": authenticateMock
    });

    const request = testServer(route);

    describe("GET /users", function () {

        
        it("should respond with status 200", function (done) {

            request.get("/users").set({ 'x-access-token': token }).expect(200, done());
        })


        it("should respond with content type json", function (done) {

            request.get("/users").set({ 'x-access-token': token }).expect("Content-type", /json/, done());
        })


        it("should respond with not error", function (done) {

            request.get("/users").set({ 'x-access-token': token }).end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(err, null);
                done();
            });
        });

        it("should respond with the list of users", function (done) {


            request.get("/users").set({ 'x-access-token': token }).end((err, res) => {


                if (err) return done(err);
                //console.log(res)


                assert.deepEqual(res.body, {
                    data: {
                        users: UsersServiceMock.usersMock
                    }
                });
                done();
            });
        })
    });

    describe("POST /users", function () {

        it("should respond with status 201", function (done) {
            request.post('/users').set({ 'x-access-token': token }).send({ 'phone': '+57301587451', 'uuid': '6d79e0ab-17e4-4660-9408-a4907c36a1b2' }).expect(201, done());
        })

        it("should respond with the created user", function (done) {

            request.post("/users").set({ 'x-access-token': token }).send({ 'phone': '+573002183215', 'uuid': '6d79e0ab-17e4-4660-9408-a4907c36a1b2' }).end((err, res) => {

                if (err) return done(err);
                assert.deepEqual(res.body, {
                    data: {
                        user: UsersServiceMock.usersMock[0],

                    },
                    message: 'Usuario creado correctamente',
                });
                done();
            });
        })

    })
})