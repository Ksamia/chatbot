const Discord = require('discord.js');

const client = new Discord.Client();

const getBlague = require('./blague.js');

const getMeteo = require('./meteo.js');

var getImage = require('./image.js');

var getIss = require('./iss.js');

var express = require('express');

var app = express();

var imgLink;

app.get('/', function(req, res){
	res.send('hello world !!! ');
});

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	if(message.author.bot){
		return;	
	}
	
	if(message.channel.type == 'dm'){
		var content = message.content.split(" ");
		if (content[0].trim() == '!blague') {
			getBlague(function(fact){
				message.reply(fact);
			});
		}else if(content[0].trim() == '!meteo'){
			if(content.length < 2){
				message.reply('Message incompris');
			}else{
				var city = message.content.replace('!meteo','').trim();	
				getMeteo(city, client.user.id,function(meteo){
					message.reply(meteo);
				});
			}
		}else if(content[0].trim() == '!image'){
			if(content.length < 2){
				message.reply('Message incompris');
			}else{
				var theme = message.content.replace('!image','').trim();	
				getImage(theme, function(imageLink){
					message.reply(imageLink);
				});
			} 
		}else if(content[0].trim() == '!iss'){
			console.log('index.js if iss condition');
			getIss.getImgLink(function(imagebuff){
				console.log(imagebuff.options);
				message.author.sendFile(message, imagebuff,'iss.png','Satellite Position');
			});
			//console.log('display compose return value');
			//getIss.Compose(console.log);
		}
		else{
			message.reply('Message incompris');
		}
	}

	if(message.mentions.users.get(client.user.id)){
		var content = message.content.replace('<@'+client.user.id+'>','').trim();
		var msg = content.split(" ");
		console.log(msg);
		if (msg[0].trim() == '!blague') {
			getBlague(function(fact){
				message.reply(fact);
			});
		}else if(msg[0].trim() == '!meteo'){
			if(msg.length < 2){
				message.reply('Message incompris');
			}else{
				var city = content.replace('!meteo','').trim();	
				getMeteo(city, client.user.id,function(meteo){
					message.reply(meteo);
				});
			}
		}else if(msg[0].trim() == '!image'){
			if(content.length < 2){
				message.reply('Message incompris');
			}else{
				var theme = message.content.replace('!image','').trim();	
				getImage(theme, function(imageLink){
					message.reply(imageLink);
				});
			} 
		}else if(msg[0].trim() == '!iss'){
			getIss(function(issImage){
				message.reply(issImage);
			});
		}
		else{
			message.reply('Message incompris');
		}
	}

});

client.on('presenceUpdate', function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
	console.log('newmember username :',newMember.user.username);

	if(newMember.user.username == "bramas" && newMember.presence.status == "online" ){
		newMember.sendMessage("Bonjour maitre, je suis le bot de Samia et de Coumba. Que puis-je faire pour vous aujourd\'hui ?");
	}
});

client.login(process.env.DISCORD_TOKEN);

app.listen(process.env.PORT || 5000);
