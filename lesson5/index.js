// Используйте наработки из домашнего задания прошлого урока для того, чтобы создать веб-версию приложения. При запуске она должна:
// * Показывать содержимое текущей директории;
// * Давать возможность навигации по каталогам из исходной папки;
// * При выборе файла показывать его содержимое.

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

const getStructure = require('./utils/getStructure');

const PORT = 3005;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running...`);

    for (let i = 0; i < os.cpus().length; i++) {
        console.log(`Forking process number ${i}`);
        cluster.fork();
    }
} else {

    console.log(`Worker ${process.pid} if running`);

    const server = http.createServer((req, res) => {

        res.writeHead(200, 'OK', {
            'Content-Type': 'text/html'
        });

        res.end(getStructure(req.url));
    });

    server.listen(PORT, () => {
        console.log(`server start on ${PORT} port`);
    });
};