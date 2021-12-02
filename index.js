let colors = require('colors');
let [start, end] = process.argv.slice(2);
let currentIndex = 0;

function primeNumbers(startRange, endRange) {
    let start = +startRange;
    let end   = +endRange;
    
    if (checkOnErrors()) return false;
    
    createPrimeNumbers(start, end);

}

function createPrimeNumbers(start, end) {
    let startPoint;
    
    if (start <= 1) startPoint = 2
    else startPoint = start;
        
    Metka:
    for (let i = startPoint; i < end; i++) {

        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                continue Metka;
            }
        }

        logger(i);
    }
    
};

function logger(number) {
    sendLog(number, currentIndex);

    if (currentIndex !== 2) currentIndex++;
    else currentIndex = 0;    
}

function sendLog(number, index) {
    switch (index) {
        case 1:
            console.log(colors.yellow(number));
            break;
        case 2:
            console.log(colors.red(number));
            break;
        default:
            console.log(colors.green(number));
    }
}

function checkOnErrors() {
    if (isNaN(start)) {
        console.log(colors.red('Начало диапазона не является числом'));
        return true;
    };

    if (isNaN(end)) {
        console.log(colors.red('Конец диапазона не является числом'));
        return true;
    };

    if (!start || !end) {
        console.log(colors.red('Нет входных данных, укажите входные параметры при запуске программы'));
        return true;
    }

    if (end < start) {
        console.log(colors.red('Конец диапазона не может быть меньше начала'));
        return true;
    };

    return false;
}

primeNumbers(start, end);