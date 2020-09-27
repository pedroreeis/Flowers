const {bot} = require('../index');
const Config = require('../lib/mongodb');
const Discord = require('discord.js')
const LevelConfig = require('../levelsys/databaselevel')

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    Config.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err);







        let prefix = guild.prefix;
        let args = message.content.slice(prefix.length).trim().split(' ');
        let cmd = args.shift().toLowerCase();
        let command;
    
        // return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
        // return message.reply(`you have been removed from the afk list!`).then(msg => msg.delete(5000));

        if(message.content.includes(bot.user.id)) {
            const mencionoembed = new Discord.MessageEmbed()
            .setColor('CYAN')
            .setDescription('💁‍♀️| Olá, meu prefixo neste servidor é `' + `${prefix}` + '`, use `' + `${prefix}ajuda` + '` para saber o que eu posso fazer!')
            message.channel.send(mencionoembed)
        }
    
 
        if (!message.content.startsWith(prefix)) return;
    
        if (bot.commands.has(cmd)) {
            command = bot.commands.get(cmd);
        } else {
            command = bot.commands.get(bot.aliases.get(cmd));
        }
    
	if(!command) return message.reply('Este comando não existe!')
        if (command) command.run(bot, message, args, Config, LevelConfig);
    
        // let cmd = bot.commands.get(command.slice(prefix.length));
        // if (cmd) cmd.run(bot, message, args);
    });



LevelConfig.findOne({
    userid: message.author.id
}, (err, dados) => {
    if (err) console.error(err);

   // const generateXp = Math.ceil(Math.random() * array.length);
    dados.xp++
    dados.totalXp++
   // console.log(message.author.username, dados.xp)
    dados.save();

    //if(dados.xp >= dados.level * 70) {
    if(dados.xp >= dados.level * 30) {
        dados.level++
        dados.xp = 0

        console.log(`${message.author.username}, passou para o level ${dados.level}`)
        return;
    }
})    
      
});