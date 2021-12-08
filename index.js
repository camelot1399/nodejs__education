// Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в формате «час-день-месяц-год». 
// Задача программы — создавать для каждого аргумента таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров (сколько осталось). 
// По истечении какого-либо таймера, вместо сообщения о том, сколько осталось, требуется показать сообщение о завершении его работы. Важно, чтобы работа программы основывалась на событиях.



const moment = require('moment');
const EventEmitter = require('events');
const now = moment();
const emitter  = new EventEmitter();

class DateX {
    constructor([hour, day, month, year]) {
        this.hour = hour;
        this.day = day;
        this.month = month;
        this.year = year;
    }
};

const finish = () => {
    return 'Поздаввляю, это конэц =)';
}

const timer = async (date) => {
    
    const dateX = moment(date);

    if (dateX === now) return emitter.emit('finish');

    await new Promise(resolve => setTimeout(resolve, 1000));
    let result = await moment(date).subtract(now);

    console.log(`Осталось ${result.format('DD')} дней ${result.format('h:mm:ss')}`);
    emitter.emit('timer', date);
}

emitter.on('timer', (date) => timer(date));
emitter.on('welcome', () => finish());

const run = async (string) => {
    const date = string.split('-');
    const dateX = new DateX(date)
    
    timer(dateX);
};

run('20-08-12-2022');