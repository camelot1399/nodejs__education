const fs = require('fs');
const path = require('path');

const getStructure = (url) => {
    const filePath = path.join(__dirname, '../', url);

    console.log(url);

    const isFile = (filename) => fs.lstatSync(filename).isFile();

    if (isFile(filePath)) {
        const result = fs.readFileSync(filePath, 'utf-8');

        return result;
    } else {
        const files = fs.readdirSync(filePath);
        let result = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>node lesson 5</title>
                        </head>
                        <body>
                        <ul>`;
        files.forEach(el => {
            if (url !== '/') result += `<li><a href="${url}/${el}" >${el}</a></li>\n`; 
            else result += `<li><a href="${el}" >${el}</a></li>\n`;
        })

        result += `</ul>
                        </body>
                    </html>`;

        return result;
    }   
}

module.exports = getStructure;