const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('./server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Books API', () => {
    it('should POST a book', (done) => {
        let body = { id: "1", title: "DevOps magic", author: "Peter Peterson" };
        chai.request(server)
            .post('/books')
            .send(body)
            .end((err, resp) => {
                if (err) {
                    return done(err)
                }
                expect(resp.statusCode).to.equal(201);
                done();
            });
    });

    it('should GET a single book', (done) => {
        chai.request(server)
            .get('/books/1')
            .end((err, resp) => {
                if (err) {
                    return done(err)
                }
                expect(resp.statusCode).to.equal(200);
                done();
            }); 
    });

    it('should GET all books', (done) => {
        chai.request(server)
            .get('/books')
            .end((err, resp) =>{
                if (err) {
                    return done(err)
                }
                expect(resp.statusCode).to.equal(200);
                expect(resp.body).to.be.a('array');
                done();
            });
    });
})