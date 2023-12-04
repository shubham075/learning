const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require("../bin/www");
const expect = chai.expect;
const controller = require("../routes/users");

chai.use(chaiHttp);
let user = 'shubham';
let password = '123456';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjIsImlhdCI6MTY2NzQ3OTU3MH0.LTSJsWN_zHMz0LzxAyWcssrPrvlmTs-aQayZDVeBtxw';


describe("######################### Testing ########## requests ####################", () => {

    it('check Login form GET request', (done) => {
        chai.request(server)
            .get(`/loginform`)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it('GET request for register form test', (done) => {
        chai.request(server)
            .get('/registerform')
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });


    it('checking login form POST request', (done) => {
        let req = {
            body: ""
        }
        req.body = {
            user: user,
            lpassword: password
        }
        chai.request(server)
            // .get(`/loginform?user=${user}&password=${password}`)
            // .send({ "user": `${user}`, "lpassword": `${password}` })
            .post(`/loginform`)
            .send(req.body)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it('checking login form POST request with wrong credentials', (done) => {
        chai.request(server)
            // .get(`/loginform?user=${user}&password=${password}`)
            .post(`/loginform`)
            .send({ "user": "shubham", "lpassword": "1234566" })
            .end((error, res) => {
                expect(res.status).to.be.equal(401);
                done();
            });
    });

    it("Checking home page after login", (done) => {
        // let req = {
        //     session:''
        // }
        // req.session = {
        //     jwt:token
        // }
        chai.request(server)
            .get(`/admin`)
            // .send(req.session)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it('checking search post request', (done) => {
        let req = {
            body: ''
        }
        req.body = {
            search: "shubham"
        }
        chai.request(server)
            .post('/admin/search', controller.find)
            .send(req.body.search)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it("Testing userInfo by ID -- GET request", (done) => {
        let id = 2;
        chai.request(server)
            .get(`/admin/userInfo/${id}`, controller.viewUser)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                console.log(controller.view);
                // expect(res.body).to.have.property('id');
                done();
            });
    });

    it("Testing addUser GET request", (done) => {
        chai.request(server)
            .get('/admin/adduser', controller.addUserForm)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it("Testing POST request for addUser", (done) => {
        let req = {
            body: ""
        }
        req.body = {
            first_name: "test",
            last_name: "data01",
            contact: "123456897",
            email: "testdata01@gmail.com"
        }
        chai.request(server)
            .post('/admin/adduser', controller.create)
            .send(req.body)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                expect(req.body).to.be.an("object");
                expect(req.body).to.have.keys("first_name", "last_name", "contact", "email");
                // console.log(Object.keys(req.body).length);
                expect(Object.keys(req.body).length).to.be.equal(4);
                done();
            });

    });

    it("Testing GET request for edit user", (done) => {
        let id = 100;
        chai.request(server)
            .get(`/admin/edituser/:${id}`, controller.edit)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it("Testing POST request for update user", (done) => {
        let id = 56;
        let req = {
            body: ""
        }
        req.body = {
            first_name: "shubham",
            last_name: "prakash",
            contact: "8709489583",
            email: "prakash@gamil.com"
        }
        chai.request(server)
            .post(`/admin/edituser/${id}`, controller.update)
            .send(req.body)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it("testing GET request for delete by Id", (done) => {
        let id = 113;

        chai.request(server)
            .get(`/admin/deleteuser/${id}`, controller.delete)
            .end((error, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

});



