const server = require('../bin/www');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

// const controller = require('../controller/userController')
// const routes = require('../routes/index');

chai.use(chaiHttp);


describe("##################### Testing starts here ########################", () => {

    it('checking view api', (done) => {
        chai.request(server)
            .get('/users')
            .end((error, res) => {
                const data = res.body.data;
                expect(res.status).to.be.equal(200);
                // console.log(data[0]);
                expect(res.body.message).to.be.equal("Data fetched!!");
                expect(data).to.be.a('array');
                expect(data[0]).to.have.property('first_name');
                expect(data[0]).to.have.property('last_name');
                expect(data[0]).to.have.property('contact');
                expect(data[0]).to.have.property('email');
                expect(data[0]).to.have.property('address');
                expect(data[0]).to.have.property('status');
                done();
            });
    });

    it('checking view by ID api', (done) => {
        let id = 5;
        chai.request(server)
            .get(`/users/${id}`)
            .end((error, res) => {
                const data = res.body.data;
                // console.log(data);
                expect(res.body.message).to.be.equal("Data fetched!!");
                expect(data).to.be.a('array');
                expect(data[0]).to.have.property('first_name');
                expect(data[0]).to.have.property('last_name');
                expect(data[0]).to.have.property('contact');
                expect(data[0]).to.have.property('email');
                expect(data[0]).to.have.property('address');
                expect(data[0]).to.have.property('status');
                done();
            });
    });

    it('checking update user api', (done) => {
        let id = 5;
        let req = {
            body: ""
        }
        req.body = {
            email: "testdata05@yahoo.com",
            address: "Patna, Bihar 801305"
        }
        chai.request(server)
            .post(`/users/update/${id}`)
            .send(req.body)
            .end((error, res) => {
                // console.log(res.body);
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it('checking create user api', (done) => {
        let req = {
            body: ""
        }
        req.body = {
            "first_name": "test",
            "last_name": "data15",
            "contact": "8080175454",
            "email": "testData15@yahoo.in",
            "address": "Patna Bihar 801506"
        }
        chai.request(server)
            .post(`/users/create`)
            .send(req.body)
            .end((error, res) => {                
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it('checking delete user api', (done)=>{
        let id = 14;
        chai.request(server)
        .post(`/users/delete/${id}`)
        .end((error, res)=>{
            expect(res.status).to.be.equal(200);
            console.log(res.body);
            expect(res.body.message).to.be.equal('User data deleted');
            done();
        });
    });

    it('checking delete user api for non existing ID', (done)=>{
        let id = 14;
        chai.request(server)
        .post(`/users/delete/${id}`)
        .end((error, res)=>{
            expect(res.status).to.be.equal(400);
            console.log(res.body);
            expect(res.body.message).to.be.equal(`User not existed with ID ${id}`);
            done();
        });
    });
})