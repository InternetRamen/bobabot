
const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {
 let person = message.mentions.users.first()
  if (!person) person = message.author
  let obj = bot.points.ensure(person.id, {
      user: person.id,
      points: 0,
      level: 1
    });
  let embed = new Discord.RichEmbed()
  .setTitle(`${person.username}'s level and points.`)
  .setDescription(`Level: ${obj.level}\nPoints: ${obj.points}`)  
  .setColor(0xb794fc)
  message.channel.send({embed: embed})
}



module.exports.help = {
  name:"level"
}