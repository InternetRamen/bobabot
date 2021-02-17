
const Discord = require('discord.js')
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {
if (message.author.id !== '345349646253817857') return;
let question = args.join(" ")
message.channel.send(`Added ${question} to the map...`)
bot.apply.ensure("Questions", [])
bot.apply.push("Questions", question)

}



module.exports.help = {
  name:"question"
}