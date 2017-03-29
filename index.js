const Discord = require('discord.js');

const client = new Discord.Client();

const getBlague = require('./blague.js');

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	if(message.author.bot){
		return;	
	}
	if(message.channel.type == 'dm'){
		if (message.content == '!blague') {
			getBlague(function(fact){
				message.reply(fact);
			});
		}
	}
	if(message.mentions.users.get(client.user.id)){
		console.log(message.content);
		if (message.content == '!blague') {
			getBlague(function(fact){
				message.reply(fact);
			});
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
