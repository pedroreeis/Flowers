const discord = require("discord.js");
const fetch = require('node-fetch')
module.exports.run = async (bot, message, args) => {

	const pegarInfo = await require('node-fetch')(`http://177.54.145.52:30120/players.json`);
	const data = await pegarInfo.json();
	const players = data.map(d => d.name).reduce((a, b) => a + b);


  if(players) {
    message.channel.send('Servidor Online!')
  }else {
    if(Request.failed) return message.reply('Servidor OffLine')
    console.error();

  }


};

module.exports.help = {
  name: "status",
  aliases: ['teste', 'test', 'aliases', 'testes']
};
