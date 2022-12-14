const mongoose = require('mongoose');

async function init({ config }) {
    try {
        let conn = await mongoose.connect(config.MONGODB_URI, { dbName: config.MONGODB_DB_NAME });
        if (conn.connection.readyState === 1) {
            console.log('Connected to MongoDB');
        }
    } catch (e) {
        console.error(e);
    }
};
module.exports = { init };