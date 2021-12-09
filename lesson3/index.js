// Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111, 
// а также сохраняет их в отдельные файлы с названием %ip-адрес%_requests.log.

const fs = require('fs');
const fsPromises = require('fs/promises');

const LOG_FILE = './logs/logs.log';
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

const finderIp = (file, ip) => {
    let str2 = '\\W+\\[\\w+\/\\w+\/\\w+:\\w+:\\w+:\\w+\\W+\\d+]\\W+(GET|POST)\\W+\\w+\\W+\\D+\\d+\.\\d+\\W+\\d+\\W+\\d+\\W+\\w+\/\\d+\.\\d+\.\\d+\\W';
    let ipConvert = ip.replace(/\./g, '\\.');
    let resultRegExp = ipConvert + str2;
    let regexp = new RegExp(resultRegExp, 'g')
    let fileName = `${ip}_requests.log`
    let count = 0;

    file.replace(regexp, (data) => {
        count++;
        writeToFile(LOGS + fileName, data);
    })

    return console.log(`По запросу ip: ${ip} нашел ${count} записей, добавил в файл: ${fileName}`);
}

fsPromises.readFile(LOG_FILE, 'utf-8').then((data) => {
    finderIp(data, '89.123.1.41');
    finderIp(data, '34.48.240.111');
}).catch((err) => {
    console.log(err);
});