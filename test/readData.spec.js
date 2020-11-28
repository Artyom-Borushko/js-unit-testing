'use strict';

const path = require('path');
// instead of relative path with '../../'
// it is better to use path.resolve
//const readData = require('../lib/readData');
const readData = require(path.resolve('lib/readData'));
const chai =  require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('readData', () => {
    it('should read data from properties file', async () => {
        let data = await readData('test/test-data/test.properties');
        expect(data.data).to.be.equal('data from properties file');
    });

    it('should read data from csv file', async () => {
        let data = await readData('test/test-data/test.csv');
        expect(data[0].join('')).to.be.equal('data from csv file');
    });

    it('should read data from json file', () => {
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