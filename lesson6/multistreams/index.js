// const worker_threads = require('worker_threads');
const { Worker } = require('worker_threads');

const generatePassword = (passwordSize) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: passwordSize,
        });

        worker.on('message', resolve);
        worker.on('error', reject);
    });
};

(async () => {
    const passwordSize = 4;
    const password = await generatePassword(passwordSize);

    console.log(password);
})();