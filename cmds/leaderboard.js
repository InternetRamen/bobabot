
const Discord = require('discord.js')
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {

  const filtered = bot.points.array();

  // Sort it to get the top results... well... at the top. Y'know.
  const sorted = filtered.sort((a, b) => b.points - a.points);

  // Slice it, dice it, get the top 10 of it!
  const top10 = sorted.splice(0, 10);

  // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
    .setTitle("Leaderboard for the most active users!")
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setColor(0xb794fc);
  let place = 0;
  let desc = ""
  for(const data of top10) {
    let person;
    if (message.guild.members.get(data.user)) person = message.guild.members.get(data.user).user.username
    else if (!message.guild.members.get(data.user)) person = "This user has left the server!"
   
    place = place+1
    desc += `${place}   **${person}**\nPoints: ${data.points}\nLevel: ${data.level}\n\n`
  }
  embed.setDescription(desc)
  return message.channel.send({embed});


  
}



module.exports.help = {
  name:"leaderboard"
}