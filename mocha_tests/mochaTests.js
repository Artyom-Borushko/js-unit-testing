'use strict'
const proxyquire =  require('proxyquire');
const path = require('path');
const chai =  require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const readData = require(path.resolve('lib/readData'));
chai.use(chaiAsPromised);
const test = require('../lib/fileDataManager');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            expect([1,2,3].indexOf(4)).to.be.equal(-1);
        });
    });
});
let myPromise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve('Success!');
    }, 250);
});

describe('ReadData', function() {
    it('should read data from properties file', async () => {
        let data = await readData('test/test-data/test.properties');
        expect(data.data).to.be.equal('data from properties file');
    });

    it('should read data from csv file', async () => {
        let data = await readData('test/test-data/test.csv');
        expect(data[0].join('')).to.be.equal('data from csv file');
    });

    it('should read data from json file', () => {

        // stubbed test
        // const ymlStub = {};
        // let stub = proxyquire('../lib/fileDataManager', { 'js-yaml': ymlStub });
        // ymlStub.safeLoad = function (file) { return 'Stubbed value from file'};
        // let data = stub.loadYmlFile('test/test-data/test.json');
        // expect(data).to.be.equal('Stubbed value from file');
        
        // // original test
        let data = readData('test/test-data/test.json');
        expect(data.data).to.be.equal('data from json file');
    });

    it('should read data from yml file', () => {
        let data = readData('test/test-data/test.yml');
        expect(data.data).to.be.equal('data from yml file');
    });

    it('should read data from xlsx file', () => {
        let data = readData('test/test-data/test.xlsx');
        expect(data).to.be.equal('data from xlsx file');
    });
});

describe('myPromise', function() {
   it('should return "Success!" eventually', () => {
       expect(myPromise).to.eventually.be.equal('Success!');
   });
});

