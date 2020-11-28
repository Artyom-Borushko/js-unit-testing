'use strict';

const path = require('path');
const properties = require ('properties');
const csv = require('node-csv').createParser();
const yaml = require('js-yaml');
const XLSX = require('xlsx');
const fs = require('fs');
class fileDataManager {

    byExtension (fileName) {
        const loadFile = {
            '.json': this.loadJsonFile,
            '.csv': this.loadCsvFile,
            '.yml': this.loadYmlFile,
            '.xlsx': this.loadXlsxFile,
            '.properties': this.loadPropertiesFile
        };
        let ext = path.extname(fileName);
        return loadFile[ext](fileName);
    };

    loadPropertiesFile (fileName) {   
        return new Promise((resolve, reject) => {
            properties.parse(fileName, { path: true }, function (error, obj) {
                if (error) return console.error (error);
                resolve(obj);
            });
        });
    };

    loadCsvFile (fileName) {
        return new Promise((resolve, reject) => {
            csv.parseFile(fileName, function(error, data) {
                if (error) return console.error (error);
                resolve(data);
            });
        });
    };

    loadJsonFile (fileName) {
        return require(path.resolve(fileName));
    }

    loadYmlFile (fileName) {

        try {
            const doc = yaml.safeLoad(fs.readFileSync(fileName, 'utf8'));
            return doc;
          } catch (e) {
            console.log(e);
          };
    };

    loadXlsxFile (fileName) {
        return XLSX.readFile(fileName).Strings[0].t;
    }
}

module.exports = new fileDataManager();