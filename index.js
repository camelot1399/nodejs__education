// Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в формате «час-день-месяц-год». 
// Задача программы — создавать для каждого аргумента таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров (сколько осталось). 
// По истечении какого-либо таймера, вместо сообщения о том, сколько осталось, требуется показать сообщение о завершении его работы. Важно, чтобы работа программы основывалась на событиях.



const moment = require('moment');
const EventEmitter = require('events');

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

const startTimer = (date) => {
    setTimeout(() => timer(date), 1000);
}

const timer = (date) => {
    const now = moment();

    if (moment(date) === now) return emitter.emit('finish');
    
    let result = moment(date).subtract(now);
    console.log(`Осталось ${result.format('DD')} дней ${result.format('h:mm:ss')}`);

    emitter.emit('startTimer', date);
}

emitter.on('startTimer', (date) => startTimer(date));
emitter.on('finish', () => finish());

const run = (string) => {
    const date = string.split('-');
    const dateX = new DateX(date)
    
    timer(dateX);
};

run('00-01-01-2022');