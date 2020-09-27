const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const bot = new Discord.Client({
	disableEveryone: true
  });
exports.run = async (bot, message, args, Config) => {

	if(args[0]) {	
	let comando = bot.commands.get(args[0])

		const embed = new MessageEmbed()
		.setTitle(`Como usar ?`)
		.setDescription(`
			Nome: ${comando.help.name}
			Aliases: ${comando.help.aliases}

			Como usar ? ${comando.help.usage}


			Entre [] obrigatorio, entre () opcional
		`)

		message.channel.send(embed)
	} else {

		Config.findOne({ guildID: message.guild.id}, function(erro, dados) {

			// Embed inicial
		
			const ajudaembed = new MessageEmbed()
			.setColor('#00BFFF')
			.setDescription('Aqui você verá um breve resumo dos meus comandos, \n para saber mais sobre cada comando use: `' + `${dados.prefix}ajuda [comando]` + '`.')
			.addField(`👮 Staffers (4)`, '`ban,kick,config,clear`', false)
			.addField(`⭕ Discord (8)`, '`serversall,rolesall,profile,emojisall,avatar,ajuda,serverinfo,userinfo`', false)
			.addField(`😁 Diversão (4)`, '`perfeito,gay,bolsonaro,miakhalifa`', false)
			.addField(`📖 Informativos (4)`, '`steam,clima,ontime,cep`', false)
			.addField(`<:mc:709434533837275207>  Minecraft (2)`, '`mcserver,mcskin`', false)
			.addField(`🎧 Musica (6)`, '`play,pause,volume,grave,retornar,spotify`', false)
			.addField(`🔶 Rank`, '`est,toprank`')
			.addField(`<:mtasa:709433831505133678> MTA (1)`, '`mta`', false)
			.addField(`✅ Total (${bot.commands.size})`, `[Servidor em que me deu origem](https://discord.gg/avTqBjy)`)
			.setFooter(`Está mensagem será apagada em 1 minuto!`)
			message.channel.send(ajudaembed).then(msg => msg.delete(60000));
			})
	}
		

	//Config.findOne({ guildID: message.guild.id}, function(erro, dados) {

	// Embed inicial

/*	const ajudaembed = new MessageEmbed()
	.setColor('#00BFFF')
	.setDescription('Aqui você verá um breve resumo dos meus comandos, \n para saber mais sobre cada comando use: `' + `${dados.prefix}ajuda [comando]` + '`.')
	.addField(`👮 Staffers (4)`, '`ban,kick,config,clear`', false)
	.addField(`⭕ Discord (8)`, '`serversall,rolesall,profile,emojisall,avatar,ajuda,serverinfo,userinfo`', false)
	.addField(`😁 Diversão (4)`, '`perfeito,gay,bolsonaro,miakhalifa`', false)
	.addField(`📖 Informativos (4)`, '`steam,clima,ontime,cep`', false)
	.addField(`<:mc:709434533837275207>  Minecraft (2)`, '`mcserver,mcskin`', false)
	.addField(`🎧 Musica (6)`, '`play,pause,volume,grave,retornar,spotify`', false)
	.addField(`🔶 Rank`, '`est,toprank`')
	.addField(`<:mtasa:709433831505133678> MTA (1)`, '`mta`', false)
	.addField(`✅ Total (${bot.commands.size})`, `[Servidor em que me deu origem](https://discord.gg/avTqBjy)`)
	.setFooter(`Está mensagem será apagada em 1 minuto!`)
	message.channel.send(ajudaembed).then(msg => msg.delete(60000));
	})*/
}	
module.exports.help = {
	name: "ajuda",
	aliases: ['help', 'comandos', 'commands'],
	usage: "ajuda (comando)"
  };