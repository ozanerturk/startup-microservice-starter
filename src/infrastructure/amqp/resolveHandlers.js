const fs = require('fs');
const path = require('path');

module.exports = channel => {
    fs.readdirSync(path.join(__dirname, '../../usecases')).forEach(file => {
        //if exists
        if (fs.existsSync(path.join(__dirname, `../../usecases/${file}/handler.js`))) {
            let handler = require(`../../usecases/${file}/handler`);
            new handler(channel).register();
        }
    });
};