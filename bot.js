const Discord = require("discord.js");
const client = new Discord.Client()
const bot = new Discord.Client()
const randomWordFR = require('random-word-fr');

var prefix = "!";

function sendError(message, description) {
	message.channel.send({embed: {
		color: 15158332,
		description: ':x: ' + description
	}})
}

function sendValid(message, description) {
	message.channel.send({embed: {
		color: 0x3CED0B,
		description: ':fearful:  ' + description
	}})
}

client.on('ready', function() {
  console.log("Yeah j'suis prêt frero!");
  client.user.setStatus("dnd");
  client.user.setGame("JimmCommunity | 🎮", "https://www.twitch.tv/jimm");
});

client.on("message", msg => {
    if (msg.content.startsWith("!kick")) {
        msg.delete(1)
        let args = msg.content.split('!kick ')
        let member = msg.mentions.members.first()
        if (args[1]!=null) {
            if (!member) {
                sendError(msg, args[1] + " n'est pas sur le discord.");
            }else{
        if (msg.member.hasPermission("KICK_MEMBERS")) {		
            if (msg.mentions.members.first().kickable) {
                sendValid(msg, msg.mentions.members.first().displayName + " a été kick du serveur discord.");
                msg.mentions.members.first().kick().then(member => {
                }).then(msg.guild.channels.find('name','admin-logs').send({
                    embed: {
                      type: 'rich',
                      description: '',
                      fields: [{
                        name: 'Joueur :',
                        value: msg.mentions.members.first().displayName,
                        inline: true
                      }, {
                        name: 'Action :',
                        value: "Kick",
                        inline: true
                    },{
                        name: 'Kick par :',
                        value: msg.author.username,
                        inline: true
                    }],
                    
                      color: 0x32A402,
                    }
                    }))
            }else{
                sendError(msg, "Tu n'as pas les permissions de kick.");
            }
        }else{
            sendError(msg, "Tu n'as pas les permissions de kick.");
        }
    }
    }else{
        sendError(msg, "Tu dois mentionner une personne **(!kick @mention)**.");
    }
}

	if (msg.content.startsWith("!ban")) {
        msg.delete(1)
        let args = msg.content.split('!ban ')
        let member = msg.mentions.members.first()
        if (args[1]!=null) {
            if (!member) {
                sendError(msg, args[1] + " n'est pas sur le discord.");
            }else{
        if (msg.member.hasPermission("BAN_MEMBERS")) {		
            if (msg.mentions.members.first().kickable) {
                sendValid(msg, msg.mentions.members.first().displayName + " a été ban du serveur discord.");
                msg.mentions.members.first().ban().then(member => {
                }).then(msg.guild.channels.find('name','admin-logs').sendMessage({
                    embed: {
                      type: 'rich',
                      description: '',
                      fields: [{
                        name: 'Joueur :',
                        value: msg.mentions.members.first().displayName,
                        inline: true
                      }, {
                        name: 'Action :',
                        value: "Ban",
                        inline: true
                    },{
                        name: 'Ban par :',
                        value: msg.author.username,
                        inline: true
                    }],
                    
                      color: 0x32A402,
                    }
                    }))
            }else{
                sendError(msg, "Tu n'as pas les permissions de ban.");
            }
        }else{
            sendError(msg, "Tu n'as pas les permissions de ban.");
        }
    }
    }else{
        sendError(msg, "Tu dois mentionner une personne **(!ban @mention)**.");
    }
}

else if(msg.content.startsWith('!mute')){
    msg.delete(1)
	let modRole = msg.guild.roles.find("name", "- Staff");
if(!msg.guild.roles.exists("name", "- Staff")) {
return sendError(msg, "Le role mute n'éxiste pas.");
} 
if(!msg.member.roles.has(modRole.id)) {
return sendError(msg, "Tu n'as pas les permissions de mute.");
} 
if(msg.mentions.users.size === 0) {
return sendError(msg, "Tu dois mentionner une personne **(!mute @mention)**.");
}
let muteMember = msg.guild.member(msg.mentions.users.first());
if(!muteMember) {
return sendError(msg, args[1] + " n'est pas sur le discord.");
}
if(!msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
return msg.reply("Je n'ai pas la permissions pour faire cela __(MANAGE_MESSAGES)__ !").catch(console.error);
}
 if(!msg.guild.channels.exists("name", "admin-logs")){
// créer le channel
msg.guild.createChannel('admin-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
return sendError(msg, "Le salon #admin-logs n'éxistait point, je vient de le créer !");
}     
let mutedRole = msg.guild.roles.find("name", "-Mute");
var time = 500000;
muteMember.addRole(mutedRole).then(member => {
sendValid(msg, "Le joueur " + muteMember + " a été mute.");
}).then(msg.guild.channels.find('name','admin-logs').sendMessage({
embed: {
  type: 'rich',
  description: '',
  fields: [{
	name: 'Joueur :',
	value: muteMember.user.username,
	inline: true
  }, {
	name: 'Action :',
	value: "Mute",
	inline: true
},{
	name: 'Mute par :',
	value: msg.author.username,
	inline: true
}],

  color: 0x32A402,
}
}))
}

else if(msg.content.startsWith('!unmute')){
    msg.delete(1)
    let modRole = msg.guild.roles.find("name", "- Staff");
    if(!msg.guild.roles.exists("name", "- Staff")) {
    return sendError(msg, "Le role Modération n'éxiste pas.");
}
if(!msg.guild.roles.exists("name", "-Mute")) {
    return sendError(msg, "Le role mute n'éxiste pas.");
} 
if(!msg.member.roles.has(modRole.id)) {
    return sendError(msg, "Vous n'avez pas la permission de unmute.");
} 
if(msg.mentions.users.size === 0) {
    return sendError(msg, "Tu dois mentionner une personne **(!unmute @mention)**.");
}
let muteMember = msg.guild.member(msg.mentions.users.first());
if(!muteMember) {
    return sendError(msg, "L'utilisateur n'éxiste pas.");
}
if(!msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
return msg.reply("Je n'ai pas la permissions pour faire cela __(MANAGE_MESSAGES)__ !").catch(console.error);
}
 if(!msg.guild.channels.exists("name", "admin-logs")){
// créer le channel
msg.guild.createChannel('admin-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
return sendError(msg, "Le salon #admin-logs n'éxistait pas, je viens de le créer ! Retape ta commande.");
}   
let mutedRole = msg.guild.roles.find("name", "-Mute");
var time = 500000;
muteMember.removeRole(mutedRole).then(member => {
    return sendValid(msg, "Le joueur " + muteMember + " a été demute.");
}).then(msg.guild.channels.find('name','admin-logs').sendMessage({
    embed: {
        type: 'rich',
        description: '',
        fields: [{
          name: 'Joueur :',
          value: muteMember.user.username,
          inline: true
        }, {
          name: 'Action :',
          value: "Unmute",
          inline: true
      },{
          name: 'Unmute par :',
          value: msg.author.username,
          inline: true
      }],
      
        color: 0x32A402,
      }
      }))
}
		
});
    client.on("message", message => {
    
        const embed = new Discord.RichEmbed()
          .setAuthor('JimmBOT', 'https://cdn.discordapp.com/attachments/384387213112377356/384438828829507589/IMG_20171027_132524.jpg')
          .setFooter('© Ganni')
          .setThumbnail('https://i.ytimg.com/vi/JjPZJa-anaE/hqdefault.jpg?sqp=-oaymwEXCPYBEIoBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBTuXKhQqH378HAQms7Jf0_tgyKtg')
    
          .setColor(0xA9A9F5)
          .setDescription("Derniere vidéo")

          .addField('Dernière vidéo de JimmGamer :', 'https://www.youtube.com/watch?v=JjPZJa-anaE');
    
            if (message.content === prefix + 'dernierevideo') {
                message.delete(1)
                message.channel.send({ embed })
            }
        })

       /* client.on("message", message => {
            
                    if (message.content === prefix + 'vu') {

                        let modRole = message.guild.roles.find("name", "- Manager Bot");

                        message.delete(1)
                        message.channel.send("@everyone Pour ceux qui ne l'auraient pas vu ! - RUSH AVEC DES ABONNÉS ! IL FAIT DE LA FLÛTE XDD ! - MCPE FR https://youtu.be/JjPZJa-anaE");
                        
                        if(!message.member.roles.has(modRole.id)) {
                            sendError(message, "Tu n'as pas les permissions");
                        }
                    }
                })*/









client.login("Mzg0NDEwMTE3ODg3NDkyMTA2.DPyxUQ.SZ2EBE0ynuK1rD1qyFTJgmv65g0")
