const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.cmds = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Err: Could not find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
    let prop = require(`./cmds/${f}`);
    console.log(`${f} loaded!`);
    bot.cmds.set(prop.help.name, prop);
  });
});

const Enmap = require("enmap");

bot.points = new Enmap({ name: "points" });
bot.menu = new Enmap({ name: "menu" });
bot.inv = new Enmap({ name: "inventory" });
bot.currency = new Enmap({ name: "currency" });
bot.lastMessage = new Enmap({ name: "lastMessage" });
bot.offences = new Enmap({ name: "offences" });
bot.dailyCooldown = new Enmap({ name: "dailyCooldown" });
bot.apply = new Enmap({name: "apply"})
bot.suggestion = new Enmap({name: "suggestion"})
// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require("util").promisify(setTimeout);

bot.on("ready", async () => {
  console.log("Bot is online!");
  bot.user.setActivity("!help");
  bot.offences.forEach(obj => {
    let end = obj.mute;
    let userID = obj.userID;
    let user = bot.guilds.get("559180987586707487").members.get(userID);
    if (!user) return;
    let actu = user.user;
    if (end === 0) return;
    if (Date.now() - end <= 0) return bot.offences.set(userID, 0, "mute");
    let a = end - Date.now();

    setTimeout(function() {
      console.log('end')
      user.removeRole("678415763538968596");
            user.addRole("559186013205954604");
      bot.offences.set(userID, 0, "mute");
      user.user.send(
        "You have been unmuted. Please don't do what ever you've done again!"
      );
      let unmute = new Discord.RichEmbed()
        .setTitle("Unmute")
        .setDescription("A user has been unmuted.")
        .addField("User Information", `<@${actu.id}>\n${user.id}\n${actu.tag}`)
        .addField("Channel Information", `Unavaliable due to bot restart.`)
        .addField("Message Information", `Unavalible due to bot restart`)
        .addField("Reason", "Time's up")
        .addField("Action taken by", "Bot")
        .setColor(0x8fc9c9);
      bot.channels.get("676967679734710273").send({ embed: unmute });
    }, a);
  });

  wait(1000);

  // Load all invites for all guilds and save them to the cache.
  bot.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

bot.on("message", async message => {
  if (message.channel.type === "dm" && !message.content.startsWith("!apply")) return;
  if (message.author.bot) return;
  let prefix = process.env.PREFIX;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let cmdFile = bot.cmds.get(cmd.slice(prefix.length));
  if (!message.content.startsWith(prefix)) return;
  if (cmdFile) cmdFile.run(bot, message, args);
});

const stringSimilarity = require("string-similarity");

bot.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (message.content.toLowerCase().includes("moose")) message.channel.send("you...")
  let obj = {
    userID: message.author.id,
    time: Date.now(),
    content: message.content,
    offence: 0
  };
  if (message.channel.id === "676975014838272032" || message.channel.id === "678758955865997332" || message.channel.id === "586971204129259560") return;
  let objLast = bot.lastMessage.get(message.author.id);
  if (!objLast) return bot.lastMessage.set(message.author.id, obj);

  let lastTime = objLast.time,
    content = objLast.content;
  let offence = objLast.offence;
  let currentOffence = 0;
  let similarity = stringSimilarity.compareTwoStrings(message.content, content);
  if (similarity >= 0.9) {
    currentOffence += 2;
  }
  if (message.content.length <= 3) {
    currentOffence += 1;
  }
  if (lastTime - Date.now() < 500) {
    currentOffence += 2;
  }
  console.log(currentOffence);
  if (currentOffence >= 4) {
    if (offence === 11) {
      message.reply(
        `you have been flagged for spamming. If you spam again, you will be muted. Please type different messages, and don't do it too quickly.`
      ).then(m => {m.delete(6000)})
      bot.lastMessage.set(message.author.id, obj);
      bot.lastMessage.set(message.author.id, offence + 1, "offence");
      let flag = new Discord.RichEmbed()
        .setTitle("Flagged")
        .setDescription(
          "A user has been flagged for 'spamming'. Please review this."
        )
        .addField(
          "User Information",
          `<@${message.author.id}>\n${message.author.id}\n${message.author.tag}`
        )
        .addField(
          "Channel Information",
          `<#${message.channel.id}>\n${message.channel.id}\n${message.channel.name}`
        )
        .addField("Message Information", `${message.content}\n${message.id}`)
        .addField("Reason", "Spamming")
        .addField("Action taken by", "Bot")
        .setColor(0xf74747);
      bot.channels.get("676967679734710273").send({ embed: flag });
    } else if (offence >= 12 ){
      message.reply(
        `you have been muted for spamming. If you do not think this is correct. Feel free to appeal with a ticket.`
      ).then(m => {m.delete(6000)})
      message.member.addRole("678415763538968596");
      message.member.removeRole("559186013205954604")
      let mute = new Discord.RichEmbed()
        .setTitle("Mute")
        .setDescription("A user has been muted for 'spamming'.")
        .addField(
          "User Information",
          `<@${message.author.id}>\n${message.author.id}\n${message.author.tag}`
        )
        .addField(
          "Channel Information",
          `<#${message.channel.id}>\n${message.channel.id}\n${message.channel.name}`
        )
        .addField("Message Information", `${message.content}\n${message.id}`)
        .addField("Reason", "Spamming")
        .addField("Duration", "2h")
        .addField("Action taken by", "Bot")
        .setColor(0xf74747);
      bot.channels.get("676967679734710273").send({ embed: mute });
      bot.lastMessage.set(message.author.id, obj);
      let time = 7.2e+6;
      bot.offences.ensure(message.author.id, {
        mute: 0,
        warnings: 0,
    
        staffID: 0,
        userID: message.author.id
      });
      let offen = bot.offences.get(message.author.id);
      if (!offen) return message.channel.send("Error");
      
      bot.offences.set(message.author.id, Date.now() - time, "mute");
      setTimeout(function() {
        message.member.removeRole("678415763538968596");
        message.member.addRole("559186013205954604")
        bot.offences.set(message.author.id, 0, "mute");
        message.author.send(
          "You have been unmuted. Please don't do what ever you've done again!"
        );
        let unmute = new Discord.RichEmbed()
          .setTitle("Unmute")
          .setDescription("A user has been unmuted.")
          .addField(
            "User Information",
            `<@${message.author.id}>\n${message.author.id}\n${message.author.tag}`
          )
          .addField(
            "Channel Information",
            `<#${message.channel.id}>\n${message.channel.id}\n${message.channel.name}`
          )
          .addField("Message Information", `${message.content}\n${message.id}`)
          .addField("Reason", "Time's up")
          .addField("Action taken by", "Bot")
                   .setColor(0x8fc9c9)
        bot.channels.get("676967679734710273").send({ embed: unmute });
      }, time);
    } else {
          bot.lastMessage.set(message.author.id, Date.now(), "time")
       bot.lastMessage.set(message.author.id, message.content, "content")
 bot.lastMessage.set(message.author.id, offence + 1, "offence");
    }
  } else {
    bot.lastMessage.set(message.author.id, Date.now(), "time")
       bot.lastMessage.set(message.author.id, message.content, "content")
  }
});

bot.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.channel.id === "676975014838272032" || message.channel.id === "684545147924774932") return;
  if (message.author.bot) return;
  if (message.content.length < 4) return;
  bot.points.ensure(message.author.id, {
    user: message.author.id,
    points: 0,
    level: 1
  });
  bot.points.inc(message.author.id, "points");
  const curLevel = Math.floor(
    0.2 * Math.sqrt(bot.points.get(message.author.id, "points"))
  );
  if (bot.points.get(message.author.id, "level") < curLevel) {
    let embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setDescription(
        `${message.author.tag}, you are now level **${curLevel}**`
      )
      .setColor(0xb794fc);
    message.channel.send({ embed: embed });
    bot.points.set(message.author.id, curLevel, "level");
  const obj = require('./levels.js')
    if (obj[`lvl${curLevel}`]) {
      console.log("Success")
      message.member.addRole(obj[`lvl${curLevel}`].role)
    }
  }
});


// bot.on("message", async message => {
//   if (message.channel.type === "dm") return;
// var badwordsArray = require('badwords/array');
//   let okayWords = [
//     "pawn"
//   ]
//   let aBWA = badwordsArray.filter(word => !okayWords.includes(word));

//   let messageArray = message.content.toLowerCase().split(" ")
//   if (aBWA.some(v => messageArray.includes(v.toLowerCase()))) {

//     message.delete()
//     message.channel.send("No swearing, uwu").then(m=>m.delete(2000))

// }

// });

bot.on("guildMemberAdd", member => {
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = bot.users.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    const logChannel = member.guild.channels.find(
      channel => channel.name === "invite-join-logs"
    );
    // A real basic message with the information we need.
    logChannel.send(
      `${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`
    );
  });
  let embed = new Discord.RichEmbed()
    .setTitle("Welcome to Boba Bar!")
    .setDescription(
      "Thank you for choosing Boba Bar out of the countless servers there are on Discord."
    );
  member.send({ embed: embed });
});

bot.login(process.env.TOKEN);
