const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {
  let mUser = message.mentions.users.first();
  if (!mUser) mUser = message.author;
  console.log(mUser.id);
     bot.inv.ensure(mUser.id, "")
  let object = bot.inv.get(message.author.id)
  if (object === "") object = "none"
  let embed = new Discord.RichEmbed()
    .setTitle(`${mUser.tag}'s inventory`)
    .setDescription(
      object
    )
 .setColor(0xb794fc);
  message.channel.send({ embed: embed });
 

};

module.exports.help = {
  name: "inv"
}