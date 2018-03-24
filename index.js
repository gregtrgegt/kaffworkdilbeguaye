const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let purple = botconfig.purple;
let xp = require("./xp.json");
let cooldown = new Set();
let cdseconds = 5; 

bot.on('ready', function() {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Momiti Commu ^&^", {type: "PLAYING"});

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(`Désolé, le joueur **${args[0]}** n'éxiste pas.`);
    message.delete(1)
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la permission!");
    message.delete(1)
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${args[0]} à été expulser du discord.`);
    message.delete(1)

    let kickChannel = message.guild.channels.find(`name`, "modo");
    if(!kickChannel) return message.channel.send(`Le salon de modération n'éxiste pas.`);

    message.guild.member(kUser).kick(kReason);
    message.guild.channels.find('name','modo').send({
                    embed: {
                      type: 'rich',
                      description: '',
                      fields: [{
                        name: 'Action :',
                        value: "Kick",
                        inline: true
                      }, {
                        name: 'Joueur',
                        value: kUser,
                        inline: true
                    },{
                        name: 'Modérateur :',
                        value: `<@${message.author.id}>`,
                        inline: true
                    }],

                      color: 0x6213F4,
                    }
                    });
    message.delete(1)

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(`Désolé, le joueur n'éxiste pas.`);
    message.delete(1)
    if(!args[0]) return message.channel.send("Tu as oublier de préciser qui tu veux ban.")
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Je ne peut pas ban cette personne!");
    message.delete(1)
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu ne peux pas ban cette personne!");
    message.delete(1)


    let incidentchannel = message.guild.channels.find(`name`, "modo");
    if(!incidentchannel) return message.channel.send(`Le salon de modération n'éxiste pas.`);

    message.guild.member(bUser).ban(bReason);
    message.guild.channels.find('name','modo').send({
                    embed: {
                      type: 'rich',
                      description: '',
                      fields: [{
                        name: 'Action :',
                        value: "Ban",
                        inline: true
                      }, {
                        name: 'Joueur',
                        value: bUser,
                        inline: true
                    },{
                        name: 'Modérateur :',
                        value: `<@${message.author.id}>`,
                        inline: true
                    }],

                      color: 0x6213F4,
                    }
                    });
    message.delete(1)


    return;
  }

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setTitle("**Informations sur le serveur**")
    .setColor(0x6213F4)
    .setThumbnail(sicon)
    .addField("**Nom du serveur**", message.guild.name)
    .addField("**Date de création**", message.guild.createdAt)
    .addField("**Membres total**", message.guild.memberCount);

    message.channel.send(serverembed);
  }



  if(cmd === `${prefix}clear`){

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.send("Désolé, tu n'as pas la permission pour utiliser cette commande.");
  if(!args[0]) return message.channel.send("Oublie pas de dire combien de messages tu veux clear");
  message.delete(1)

  let clearChannel = message.guild.channels.find(`name`, "modo");
    if(!clearChannel) return message.channel.send(`Le salon de modération n'éxiste pas.`);

	message.guild.channels.find('name','modo').send({
                    embed: {
                      type: 'rich',
                      description: '',
                      fields: [{
                        name: 'Action :',
                        value: "Clear",
                        inline: true
                      }, {
                        name: 'Nombre de message :',
                        value: args[0],
                        inline: true
                    },{
                        name: 'Modérateur :',
                        value: `<@${message.author.id}>`,
                        inline: true
                    }],

                      color: 0x6213F4,
                    }
                    });
	message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`${args[0]} messages ont été supprimés.`).then(msg => msg.delete(5000));	
    message.delete(1)
  });  
}

	if(cmd === `${prefix}warn`){

    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.channel.send(`Désolé, le joueur n'éxiste pas.`);
    message.delete(1)
    if(!args[0]) return message.channel.send("Tu as oublier de préciser qui tu veux warn.")
    message.delete(1)

    let incidentchannel = message.guild.channels.find(`name`, "modo");
    if(!incidentchannel) return message.channel.send(`Le salon de modération n'éxiste pas.`);

    message.guild.channels.find('name','modo').send({
                    embed: {
                      type: 'rich',
                      description: '',
                      fields: [{
                        name: 'Joueur :',
                        value: message.mentions.members.first().displayName,
                        inline: true
                      }, {
                        name: 'Action :',
                        value: "Warn",
                        inline: true
                    },{
                        name: 'Modérateur :',
                        value: `<@${message.author.id}>`,
                        inline: true
                    }],

                      color: 0x6213F4,
                    }
                    });

    message.delete(1)


    return;
  }

});

	bot.on("message", message => {

		let xpAdd = +1;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level UP")
    .setDescription(" ")
    .setColor(0x6213F4)
    .addField("Tu es désormais niveau", curlvl + 1);

    message.channel.send(lvlup);
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

    let prefix = botconfig.prefix;

  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
  	message.delete();
  	return message.channel.send("Tu dois attendre avant de renvoyer un message.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")) {
  	cooldown.add(message.author.id);
 }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
  	cooldown.delete(message.author.id)
  }, cdseconds * 1000)


	if(cmd === `${prefix}level`){

    if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setTitle(message.author.username)
  .setDescription(" ")
  .setColor(0x6213F4)
  .addField("Niveau", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} pour level up`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed);
}

		});


	bot.on("message", message => {

		let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

		if(cmd === `${prefix}sondage`){

    if(message.member.hasPermission("ADMINISTRATOR")) {
  		let args = message.content.split(" ").slice (1);
  		let thingToEcho = args.join(" ")
  		var embed = new Discord.RichEmbed()
  		.setDescription("Sondage")
  		.setColor(0x6213F4)
  		.addField(thingToEcho, "Réponds avec :heavy_check_mark: ou :x:");

  		message.guild.channels.find("name", "sondage").sendEmbed(embed)
  		.then(function (message) {

  			message.react("✔")
  			message.react("❌")

  		}).catch(function() {

  		});

  	} else {
  		return message.reply("Tu n'as pas la permission.")
  	}
  }

  	if(cmd === `${prefix}msg`){

  		if(message.member.hasPermission("ADMINISTRATOR")) {

  			let messageof = args.join(" ");

  		message.guild.members.map(m => m.createDM().then(channel => { channel.send(messageof) }).catch() ) 

  	} else {
  		message.channel.send("Tu n'as pas la permission")
  	}
	}

	if(cmd === `${prefix}msgg`){

  		if(message.member.id === "216549919375228930") {

  			let messageof = args.join(" ");

  		message.guild.members.map(m => m.createDM().then(channel => { channel.send(messageof) }).catch() ) 

  	} else {
  		message.channel.send("Tu n'as pas la permission")
  	}
	}

	});

bot.login(process.env.BOT_TOKEN);
