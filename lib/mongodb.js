const mongoose = require('mongoose');

const config = new mongoose.Schema({

    guildID: String,
    prefix: String,
    idlogs: String,
    welcomeid: String

});


module.exports = mongoose.model('FlowerData', config);