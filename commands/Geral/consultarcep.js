const Discord = require("discord.js");
var superagent = require('superagent')
module.exports.run = async (bot, message, args) => {

  let CEP = args[0]
  if(!CEP) return message.reply('Coloque algum CEP')
  let {body} = await superagent
  .get(`https://viacep.com.br/ws/${CEP}/json/`)
  
  let cepembed = new Discord.MessageEmbed()
  .setAuthor(`Consultor de CEP`)
  .setDescription(`
  
    Rua: ${body.logradouro}
    Bairro: ${body.bairro}
    Cidade: ${body.localidade}
    Estado: ${body.uf}

  `)

  message.channel.send(cepembed)


};

module.exports.help = {
  name: "consultarcep",
  aliases: ['cepconsultar', 'consultorcep', 'cep'],
  usage: "consultarcep [CEP]"
};
