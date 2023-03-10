const chai = require('chai');
const moment = require('moment/moment');
const expect = chai.expect;
const request = require('supertest');
const createObject = require('../data/create-object.json');

describe('POST', () => {
    const baseUrl = 'https://api.restful-api.dev/objects'
    const date = new Date()
    describe('Add an object', function () {
        it('Should get status code 415', function (done) {
            request(baseUrl)
                .post('/')
                .send('()')
                .set('Accept', 'application/json')

                .expect(function (response) {
                    expect(response.statusCode).to.equal(415)
                })
            done()
        })
        // 415 payload format is not supported
        it('Should  not create a object and get status code 415', function (done) {
            request(baseUrl)
                .post('/')
                .send('')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(function (response) {
                    expect(response.statusCode).to.equal(415)
                })
            done()
        })
        it('Should create an new object with partial data', function (done) {
            request(baseUrl)
                .post('/')
                .send({
                    "name": "some dev test",
                    "data": {
                        "year": 2023
                    }
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(function (response) {
                    // structure
                    expect(response.status).to.equal(200)
                    expect(response.body).to.be.an('object')
                    expect(response.body).to.have.property('id')
                    expect(response.body).to.have.property('name')
                    expect(response.body).to.have.property('createdAt')
                    expect(response.body).to.have.property('data')
                    expect(response.body.id).to.be.an('string')
                    expect(response.body.name).to.be.a('string')
                    expect(response.body.createdAt).to.be.an('string')
                    expect(response.body.data).to.be.an('object')
                    expect(response.body.data).to.have.property('year')

                    // data
                    // expect((response.body.createdAt).isValid()).to.be.true
                    expect(response.body.data.year).to.equal(2023)
                    expect(response.body.name).to.equal('some dev test')
                    expect(response.body.data.year).to.eql(2023)
                    const createdDate = moment(response.body.createdAt).format('YYYY_MM_DD')

                    expect(moment(date).format('YYYY_MM_DD')).to.eql(createdDate)
                })
                .end(function (err) {
                    if (err) {
                        throw err;
                    }
                    done();
                });

        });
        it('Should have a properties for created object', function (done) {

            request(baseUrl)
                .post('/')
                .send(createObject)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(function (response) {
                    expect(response.status).to.equal(200)
                    expect(response.body).to.be.an('object')
                    expect(response.body).to.have.property('id')
                    expect(response.body).to.have.property('name')
                    expect(response.body).to.have.property('createdAt')
                    expect(response.body).to.have.property('data')
                    expect(response.body.id).to.be.an('string')
                    expect(response.body.name).to.be.a('string')
                    expect(response.body.createdAt).to.be.an('string')
                    expect(response.body.data).to.be.an('object')
                    expect(response.body.data).to.have.property('year')
                })
                .end(function (err) {
                    if (err) {
                        throw err;
                    }
                    done();
                });

        });
        it('Should create an new object with full data', function (done) {
            const cpuModel = createObject.data['CPU model']
            const hardDiskSpace = createObject.data['Hard disk size']

            request(baseUrl)
                .post('/')
                .send(createObject)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(function (response) {
                    const responseCpuModel = response.body.data['CPU model']
                    const responseHardDiskSpace = response.body.data['Hard disk size']

                    expect(response.status).to.equal(200)
                    expect(response.body).to.be.an('object')
                    expect(response.body).to.have.property('id')
                    expect(response.body).to.have.property('name')
                    expect(response.body).to.have.property('createdAt')
                    expect(response.body).to.have.property('data')
                    expect(response.body.id).to.be.an('string')
                    expect(response.body.name).to.be.a('string')
                    expect(response.body.createdAt).to.be.an('string')
                    expect(response.body.data).to.be.an('object')
                    expect(response.body.data).to.have.property('year')

                    expect(response.body.name).to.equal(createObject.name)
                    expect(response.body.data.year).to.equal(createObject.data.year)
                    expect(response.body.data.price).to.equal(createObject.data.price)
                    expect(responseCpuModel).to.eql(cpuModel)
                    expect(responseHardDiskSpace).to.eql(hardDiskSpace)
                    const createdDate = moment(response.body.createdAt).format('YYYY_MM_DD')

                    expect(moment(date).format('YYYY_MM_DD')).to.eql(createdDate)
                })
                .end(function (err) {
                    if (err) {
                        throw err;
                    }
                    done();
                });

        });

    })
})