const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({

    id: String,
    itemType: String,
    name: String,
});

module.exports = mongoose.model('Sport', sportSchema);