function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

exports.run = async (bot, message, Config) => {

 const Discord = require("discord.js");
	
	if(message.author.id !== '640195412648788018') return message.channel.send("Este comando só esta disponivel á desenvolvedores!")
	try{
		 const code = message.content.slice(1).trim().split(" ").slice(1).join(" ")
 		if (!code) return message.channel.send('Coloque algum codigo para eu poder executar!')

		let evaled = eval(code)
    	
		if (typeof evaled !== "string")
  	    evaled = require("util").inspect(evaled);

  	if (evaled.length > "2000" && evaled.length < "4000") {

  	} else if (evaled.length > "4000" && evaled.length < "6000") {

  	} else {
     let sucess = new Discord.MessageEmbed()
     .setDescription(`

     Entrada \n \`\`\`md\n${code}\n\`\`\` \n Saida \n \`\`\`yaml\n${evaled}\n\`\`\``
     )

     message.channel.send(sucess)
 	}
			
	}catch(err){
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}

}
module.exports.help = {
	name: "eval",
	aliases: ['e', 'exec'],
	usage: "eval [code]"
  };