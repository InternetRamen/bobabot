const Discord = require('discord.js')
const prompt = require('../prompt.js')
const pprompt = require('../pprompt.js')
module.exports.run = async (bot, message, args) => {
  let title = await prompt(message, "what do you want to name your post?")
  let imageURL = await pprompt(message, "please send the image you want to post.")

  
  let embed = new Discord.RichEmbed()
    .setTitle(title)
    .setImage(imageURL)
  .setFooter("Are you sure you want to post this?")
    .setColor('RANDOM')
let response = await prompt(message, embed)
if (response.toLowerCase() === "no") return message.channel.send("Canceled. Please try again.")
 if (response.toLowerCase() === "yes") {
   message.channel.send("Posted.")
  let actualEmbed = new Discord.RichEmbed()
    .setTitle(title)
    .setImage(imageURL)
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor('RANDOM')
  bot.channels.get('677501434954252298').send({embed: actualEmbed})
 } else {
   message.channel.send("Please respond with yes or no!")
 }

}





module.exports.help = {
  name:"post"
}