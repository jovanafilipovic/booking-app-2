const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
    id: String,
    itemType: String,
    name: String,
    address: String,
    municipality: String,
    sports: [String],
    images: [String]
});

module.exports = mongoose.model('Court', courtSchema);