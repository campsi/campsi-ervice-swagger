/**
 * Created by christophe on 16/11/17.
 */
//During the test the env variable is set to private
process.env.NODE_CONFIG_DIR = './test/config';
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const debug = require('debug')('campsi:test');
const chai = require('chai');
const chaiHttp = require('chai-http');
const CampsiServer = require('campsi');
const config = require('config');

let campsi;
let server;
chai.use(chaiHttp);
chai.should();

const services = {
    Swagger: require('../lib'),
};

describe('Swagger API', () => {
    beforeEach((done) => {
        //Before each test we empty the database
        campsi = new CampsiServer(config.campsi);
        campsi.mount('swagger', new services.Swagger(config.services.swagger));

        campsi.on('campsi/ready', () => {
            server = campsi.listen(config.port);
            done();
        });

        campsi.start()
            .catch((err) => {
                debug('Error: %s', err);
            });
    });

    afterEach((done) => {
        server.close(() => {
            done();
        });
    });
    /*
     * Test the /GET providers route
     */
    describe('/GET swagger/swagger.json', () => {
        it('it should return a swagger file', (done) => {
            chai.request(campsi.app)
                .get('/swagger/swagger.json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
    });
    describe('/GET swagger', () => {
        it('it should return an html file', (done) => {
            chai.request(campsi.app)
                .get('/swagger')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });
});
