const Discord = require('discord.js');
const auth = require('./auth.json');
const insults = require('./insult.js');


// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    if (message.content === 'ping') {
        message.channel.send('pong');
    }
    if (message.content === 'help') {
        message.channel.send('Commands: \`ping\`, \`help\`, \`surprise me\`, \`insult me\`, \`insult {username}\`');
    }
    if (message.content === 'log users') {
        client.users.forEach(user => {
            if (user.presence.status === 'online') {
                console.log(user);
            }
        })
        message.channel.send('Sending users...')
    }
    if (message.content.toUpperCase().includes('PARKER')) {
        message.channel.send('fuck that guy');
    }
    if (message.content.toUpperCase() === 'SURPRISE ME') {
        client.users.forEach(user => {
            if (user.lastMessage) {
                if (user.lastMessage.content.toUpperCase() === 'SURPRISE ME') {
                    message.channel.send(`Are you surprised, ${user.username}?`);
                }
            }
        })
    }
    if (message.content.toUpperCase().includes('INSULT ME')) {
        client.users.forEach(user => {
            if (user.lastMessage) {
                if (user.lastMessage.content.toUpperCase() === 'INSULT ME') {
                    message.channel.send(insults.randomInsultForMe());
                }
            }
        })
    }
    if (message.content.toUpperCase().includes('INSULT')) {
        client.users.forEach(user => {
            if (message.content.toUpperCase().includes('PARKER')) {
                message.channel.send(insults.randomInsultForUser(user));
            } else if (message.isMemberMentioned(user) || message.content.toUpperCase().includes(`${user.username}`)) {
                message.channel.send(insults.randomInsultForUser(user));
            }
        })

    }

});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);