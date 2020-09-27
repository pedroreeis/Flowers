const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

    let usuario = message.mentions.users.first() || message.author
    
    if(usuario.presence.activities == "Spotify") {
    let spot = usuario.presence.activities[0]

    let Titulo = spot.details
    let Album = spot.assets.largeText
    let Autor = spot.state
    let capa = spot.assets.largeImageURL({ format: 'png', size: 1024 });
    
    // canvas
     const { createCanvas, loadImage } = require('canvas');
    const { MessageAttachment } = require('discord.js');

    const width = 410;
    const height = 230;
    const posX = 30; 

    const canvas = createCanvas(width, height); // cria a img que no caso é 1000x3000
    const ctx = canvas.getContext('2d'); // cria um ctx com o texto

    const fundo1 = await loadImage(`${capa}?width=410&height=230`);
    ctx.drawImage(fundo1, 0, 0, canvas.width, canvas.height);

    function blur(strength) {
      ctx.globalAlpha = 0.5;
  
      for (var y = -strength; y <= strength; y += 2) {
          for (var x = -strength; x <= strength; x += 2) {
              ctx.drawImage(canvas, x, y);
  
              if (x >= 0 && y >= 0)
                  ctx.drawImage(canvas, -(x-3), -(y-1));
          };
      };
  
      ctx.globalAlpha = 1.0;
  }

  blur(10)

    // texto titulo
    ctx.font = '15px Arial';
    ctx.fillStyle = '#DCDCDC';
    ctx.fillText(`${Titulo}`, canvas.width / 2.4, canvas.height / 2.5); // width = vertical height = horizontal

     // texto Autor
    ctx.font = '17px Exo2-Italic';
    ctx.fillStyle = '#DCDCDC';
    ctx.fillText(`${Autor}`, canvas.width / 2.4, canvas.height / 1.95); // width = vertical height = horizontal

     // texto Album
    //ctx.font = '20px arial';
  //  ctx.fillStyle = '#ffffff';
  //  ctx.fillText(`Do Album ${Album}`, canvas.width / 2.4, canvas.height / 2.2); // width = vertical height = horizontal
    

    // capa
    const capa1 = await loadImage(`${capa}?width=8&height=8`)
    ctx.drawImage(capa1, canvas.width / 10, canvas.height / 5, 130, 130)

    const attachment = new MessageAttachment(canvas.toBuffer(), 'spoti2.png'); // img.png eo nome

    await message.channel.send(attachment); // envia o atach
}else {
    message.reply('Não esta escutando spotify!')
}


}

module.exports.help = {
  name: "spotify",
  aliases: ['sp'],
  usage: "spotify [USER]"
};