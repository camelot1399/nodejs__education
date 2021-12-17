#!/usr/bin/node

//Lesson 4
// В домашнем задании вам нужно будет применить полученные знания к программе,
// которую вы написали по итогам прошлого урока.
//
// Для этого превратите её в консольное приложение, по аналогии с разобранным примером
// и добавьте следующие функции:
// * Возможность передавать путь к директории в программу. Это актуально,
//      когда вы не хотите покидать текущую директорию, но вам необходимо просмотреть файл,
//      находящийся в другом месте;
// * В содержимом директории переходить во вложенные каталоги;
// * При чтении файлов искать в них заданную строку или паттерн.

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const EventEmitter = require('events');
const emitter  = new EventEmitter();

emitter.on('getListWithPath', (pathFile) => getList(pathFile))
emitter.on('getListWithoutPath', (pathName) => getList(process.cwd()))

inquirer.prompt([
    {
        name: 'isPath',
        type: 'confirm',
        message: 'Указать путь до файла? ',
    }
]).then(({ isPath }) => {
    if (isPath) {
        inquirer.prompt([
            {
                name: 'pathName',
                type: 'input',
                message: 'Введите путь до файла: ',
            }
        ]).then(({ pathName }) => {
            emitter.emit('getListWithPath', pathName);
        });
    } else {
        emitter.emit('getListWithoutPat');
    }
});

function getList(executionDir) {
    const isFile = (filename) => fs.lstatSync(filename).isFile();
    const list = fs.readdirSync(executionDir);

    inquirer.prompt([
        {
            name: 'dirOrFile',
            type: 'list',
            message: 'Выберете файл: ',
            choices: list,
        }
    ]).then(({ dirOrFile }) => {
        const fullPath = path.join(executionDir, dirOrFile);

        if (isFile(fullPath)) {
            const data = fs.readFileSync(fullPath, 'utf-8');
            console.log(data);
        } else {
            emitter.emit('getListWithPath', fullPath);
        }
    });
} 