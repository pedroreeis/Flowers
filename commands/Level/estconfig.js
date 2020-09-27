const discord = require("discord.js");

module.exports.run = async (bot, message, args, LevelConfig) => {

    let pessoa = message.author;

  if(args[0] == "fundo") {
    LevelConfig.findOne({
        userid: pessoa.id
    }, (err, dados) => {
        if (err) console.error(err);

        let link = args[1]
        if(!link) return message.reply('Coloque um link de IMG')
        dados.fundourl = link

        message.channel.send(`Fundo do comando EST alterado com sucesso!`)

    }) 

  }







};

module.exports.help = {
  name: "estconfig",
  aliases: ['configest', 'levelconfig']
};
