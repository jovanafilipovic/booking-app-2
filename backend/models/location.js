const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    id: String,
    itemType: String,
    name: String,
});

module.exports = mongoose.model('Location', locationSchema);