// Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111, 
// а также сохраняет их в отдельные файлы с названием %ip-адрес%_requests.log.

const fs = require('fs');
const fsPromises = require('fs/promises');

const LOG_FILE = './logs/logs.log';
const FILE_1   = './logs/89.123.1.41_requests.log';
const FILE_2   = './logs/34.48.240.111_requests.log';
const LOGS    = './logs/';

const writeToFile = (file, data) => {
    fs.appendFile(
        file,
        data + '\n',
        {
            encoding: 'utf-8',
        },
        console.log
    );
};

fsPromises.readFile(LOG_FILE, 'utf-8').then((data) => {
    data.replace(/89\.123\.1\.41\W+\[\w+\/\w+\/\w+:\w+:\w+:\w+\W+\d+]\W+(GET|POST)\W+\w+\W+\D+\d+\.\d+\W+\d+\W+\d+\W+\w+\/\d+\.\d+\.\d+\W/g, (data) => {
        writeToFile(FILE_1, data);
    })
    data.replace(/34\.48\.240\.111\W+\[\w+\/\w+\/\w+:\w+:\w+:\w+\W+\d+]\W+(GET|POST)\W+\w+\W+\D+\d+\.\d+\W+\d+\W+\d+\W+\w+\/\d+\.\d+\.\d+\W/g, (data) => {
        writeToFile(FILE_2, data);
    })
}).catch((err) => {
    console.log(err);
});