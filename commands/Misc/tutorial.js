const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  return message.channel.send('Teste!');

};

module.exports.help = {
  name: "teste",
  aliases: ['tut', 'test', 'aliases', 'helloworld']
};
