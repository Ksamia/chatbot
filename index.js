const Discord = require('discord.js');

const client = new Discord.Client();

const axios = require('axios');

client.on('ready', () => {
	console.log('I am ready!');
});

function repBlague(msg){
	axios.get('https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1').then(function(rep){
		console.log(rep.data[0]);
		msg.reply(rep.data[0]);
	});
}

client.on('message', message => {
	if(message.author.bot){
		return;	
	}
	if(message.channel.type == 'dm'){
		if (message.content == '!blague') {
			repBlague(message);
		}
	}
	if(message.mentions.users.get(client.user.id)){
		if (message.content == '!blague') {
			repBlague(message);
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
