const mongoose = require('mongoose');

const config = new mongoose.Schema({

    userid: String,
    level: String,
    xp: String,
    totalXp: String,

});


module.exports = mongoose.model('LevelData', config);