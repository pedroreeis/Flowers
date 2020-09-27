exports.run = async (bot, message, args) => {

    const { createCanvas, loadImage } = require('canvas');
    const { MessageAttachment } = require('discord.js');

    const width = 385;
    const height = 485;
    const posX = 30; 

    const canvas = createCanvas(width, height); // cria a img que no caso é 1000x3000
    const ctx = canvas.getContext('2d'); // cria um ctx com o texto

	let usuario = message.mentions.users.first() || message.author

    const fundo1 = await loadImage('https://media.discordapp.net/attachments/688774339008790606/700332918064676914/dprofile.png?width=377&height=475');
    ctx.drawImage(fundo1, 0, 0, canvas.width, canvas.height);

    //carrega 1 img, que no caso eo avatar do membro
    const avatar = await loadImage(usuario.avatarURL({ format: 'png', dynamic: true, size: 1024 })) //carrega o avatarURL
    ctx.drawImage(avatar, height - 360, posX+20, height - 375, height - 378)//posiciona o avatar

    //carrega 2 img
    const image2 = await loadImage('https://media.discordapp.net/attachments/681503728792371233/700334414999322635/redondo.png?width=475&height=475')
    ctx.drawImage(image2, height - 360, posX+20, height - 375, height -375)//posiciona o redondo

	// texto 1
	ctx.font = '18px arial';
    ctx.fillStyle = '#696969';
    ctx.fillText(`Conversar com ${usuario.username}`, canvas.width / 6.1, canvas.height / 1.22); // width = vertical height = horizontal

    //ctx.fillStyle = '#A9A9A9';

   	// texto 3
	ctx.font = '18px arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${usuario.username}#${usuario.discriminator}`, canvas.width / 3.3, canvas.height / 2.78); // width = vertical height = horizontal

    const attachment = new MessageAttachment(canvas.toBuffer(), 'pf.png'); // img.png eo nome
    await message.channel.send(attachment); // envia o atach
}
module.exports.help = {
    name: "profile",
    aliases: ['perfil'],
    usage: "profile [USER]"
  };