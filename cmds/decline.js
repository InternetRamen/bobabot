const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("You need the manage server permission!")
  let id = args[0]
  let obj = bot.suggestion.get(id)
  if (!obj) return message.channel.send("That is not a valid suggestion!")
  bot.channels.get("696813560260591802").fetchMessage(id).then(m => {
    let embed = new Discord.RichEmbed()
      .setTitle("Suggestion")
      .setDescription(obj.content)
      .setColor("RANDOM")
      .setFooter(`Suggestion Declined!`)
    m.edit({embed: embed})
    
  })
  bot.suggestion.delete(id)
message.channel.send("Success!")
    message.guild.members.get(id).send("Your suggestion was accepted!")
  

};

module.exports.help = {
  name: "decline"
}