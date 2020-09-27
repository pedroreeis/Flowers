const {bot} = require('../index');
const config = require("../config.json");
const Config = require('../lib/mongodb');
const LevelConfig = require('../levelsys/databaselevel')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://miapikatadoendo:020207Pedro@databasequeendev-iodj9.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true }, (err) => {
        if (err) return console.error(err);
        console.log('CONNECTED TO MONGODB!');
    });

bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready for action!`);
    console.clear()
    if (config.activity.streaming == true) {
        bot.user.setActivity(config.activity.game, {
            url: ''
        });
    } else {
        bot.user.setActivity(config.activity.game, {
            type: 'WATCHING'
        }); //PLAYING, LISTENING, WATCHING
        bot.user.setStatus('dnd'); // dnd, idle, online, invisible
    }

   // await bot.guilds.keyArray().forEach(id => {
       await bot.guilds.cache.keyArray().forEach(id => {


        Config.findOne({
            guildID: id
        }, (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newConfig = new Config({
                    guildID: id,
                    prefix: config.prefix,
                    idlogs: 0,
                    welcomeid: 0
                });

                return newConfig.save();
            }
        });

    });

    bot.users.cache.keyArray().forEach(id => {


        LevelConfig.findOne({
            userid: id
        }, (err, user) => {
            if(err) console.error(err);

            if(!user) {
                const newConfig = new LevelConfig({
                    userid: id,
                    level: 1,
                    xp: 0,
                    totalXp: 0,
                })

                return newConfig.save();
            }
        }
        )
    })
});

