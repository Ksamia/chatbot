const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	if (message.content === 'ping') {
		message.reply('pong');
	}
	console.log(message);
});

client.on('presenceUpdate', function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
	console.log('oldmember username :',oldMember.user.username);
	console.log('newmember username :',newMember.user.username);
	console.log('newMember object : ', newMember);
	if((newMember.user.username === "bramas") && (newMember.presence === "online")){
		console.log("blabla");
		console.log(newMember.user.dmChannel);
	}
});

client.login(process.env.DISCORD_TOKEN);
