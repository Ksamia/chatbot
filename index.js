const Discord = require('discord.js');

const client = new Discord.Client();
const userBramas = new Discord.User();

userBramas = {"username": "bramas"}

client.on('ready', () => {
	console.log('I am ready!');
	console.log('presence : '+userBramas.presence);
});

client.on('message', message => {
	if (message.content === 'ping') {
		message.reply('pong');
	}
	console.log(message);
});

client.on('presenceUpdate', function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
});

client.login(process.env.DISCORD_TOKEN);
