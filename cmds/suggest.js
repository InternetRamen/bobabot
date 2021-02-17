
const Discord = require('discord.js')
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {
  let suggestion = args.join(" ")
  if (!suggestion) return;
  let suggest = new Discord.RichEmbed()
    .setTitle("Suggestion")
    .setDescription(suggestion)
    .setColor("RANDOM")
    .setFooter(`Suggestion by ${message.author.username}`)
  bot.channels.get('696813560260591802').send({embed: suggest}).then(async m => {
    await m.react('✅')
    m.react("❌")
    
    bot.suggestion.set(m.id, {
    author: message.author.id,
    messageID: m.id,
      content: suggestion
    })
    
    
  })

message.channel.send("Nice suggestion!")
  
}



module.exports.help = {
  name:"suggest"
}