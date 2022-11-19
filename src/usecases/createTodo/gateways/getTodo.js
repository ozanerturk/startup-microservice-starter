const mongoose = require('mongoose');

module.exports = async function (name) {
    return await mongoose.connection.db.collection("todos").findOne({ name: name });
};