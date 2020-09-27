const discord = require("discord.js");
const token = require("./token.json").token;
const bot = new discord.Client({
  disableEveryone: true
});
const lib = require("./lib/functions");


const mongoose = require('mongoose');
const Config = require('./lib/mongodb');
const LevelConfig = require('./levelsys/databaselevel')

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
bot.afk = new Map();

lib.setup(bot);

module.exports.bot = bot;

bot.on("guildMemberAdd", async (member) => {
  Config.findOne({ guildID: member.guild.id}, function(erro, dados) {  
  
    let canalid = dados.welcomeid  

    if(canalid == "0") return;
    let canal = bot.channels.cache.get(canalid)

      let embed = new discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription(`O membro ${member}, entrou no servidor. De parabéns a ele!`)

      canal.send(embed)
  })
});

bot.on("guildMemberRemove", async (member) => {
  Config.findOne({ guildID: member.guild.id}, function(erro, dados) {  


      let canalsid = dados.welcomeid
      if(canalsid == "0") return;
      let canals = bot.channels.cache.get(canalsid)

      let embed = new discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`O membro ${member}, saiu no servidor.`)

      canals.send(embed)
  })
});

bot.on("messageUpdate",  async  (oldMessage, newMessage) => {
  Config.findOne({ guildID: oldMessage.guild.id}, function(erro, dados) {  

    let canalsid = dados.idlogs
    if(canalsid == "0") return;
    let canals = bot.channels.cache.get(canalsid)
    if(oldMessage.content.includes("https://")) return 0;

    let embed = new discord.MessageEmbed()
    .setTitle(`${oldMessage.guild.name}`)
    .setDescription(`👤 Autor: ${oldMessage.author} \n `)
    .addField('💬 Mensagem Antiga:', `\`\`\`yaml\n${oldMessage}\n\`\`\``, true)
    .addField('💬 Mensagem Nova:', ` ${newMessage}`, false)

    canals.send(embed)
})
})

bot.on("messageDelete", async (message) => {

  Config.findOne({ guildID: message.guild.id}, function(erro, dados) {  

    let canalid = dados.idlogs
    if(canalid == "0") return;
    let canal = bot.channels.cache.get(canalid)

    let embed = new discord.MessageEmbed()
    .setAuthor(`${message.guild.name}`)
    .setTitle('Mensagem Apagada')
    .setDescription(`👤 Autor: ${message.author}`)
    .addField('💬 Mensagem Deletada:', `${message.content}`, true)
    canal.send(embed)
})


})



bot.login(token);
