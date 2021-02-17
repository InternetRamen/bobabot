const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {
  let mUser = message.mentions.users.first();
  if (!mUser) mUser = message.author;
  console.log(mUser.id);
     bot.currency.ensure(mUser.id, {
    userID: message.author.id,
    pearls: 0,
    whitepearls: 0,
    prestige: 0
    
  })
  let object = bot.currency.get(mUser.id)
  console.log(object);
  let embed = new Discord.RichEmbed()
    .setTitle(`${mUser.tag}'s stats`)
    .setDescription(
      `Pearls: ${object.pearls}\nWhite Pearls: ${object.whitepearls}`
    )
 .setColor(0xb794fc);
  message.channel.send({ embed: embed });
 

};

module.exports.help = {
  name: "bal"
}