const parse = require('csv-parse');
const assert = require('assert');

export const cargarCsv = (csv) => {
    return new Promise((resolve, reject) => {
        const output = [];

        const parser = parse({
            delimiter: ["\t"],
            relax_column_count: true
        });

        parser.on('readable', function () {
            let record;
            while (record = parser.read()) {
                output.push(record);
            }
        });

        parser.on('error', function (err) {
            console.error(err.message);
            resolve(Error(err.message));
        });

        parser.on('end', function () {
            console.log('csvParser');
            console.log(output);
            resolve(output);
        });

        parser.write(csv);
        parser.end();
    });
};

