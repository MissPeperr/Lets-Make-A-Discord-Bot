const Discord = require('discord.js');
const auth = require('./auth.json');
const insults = require('./insult.js');

// Create an instance of a Discord client
const client = new Discord.Client();

const ifServerOwner = (message) => message.guild.ownerID === message.member.id

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => console.log('I am ready!'));

// Create an event listener for messages
client.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send('pong');
    }
    // Lists available commands
    if (message.content === '!help') {
        message.channel.send('▫\`!help\`\n▫\`!surprise me\`\n▫\`!insult me\`\n▫\`!insult {@mention}\`\n▫\`!insult {name}\`\n▫\`!ping\`\n▫\`!mute\`\n');
    }
    // Print users to console
    if (message.content === '!log users' && ifServerOwner(message)) {
        client.users.forEach(user => {
            if (user.presence.status === 'online') {
                console.log(user);
            }
        })
        message.channel.send('Sending users except for Dalton...')
    } else if (message.content === '!log users' && ifServerOwner(message)) {
        message.channel.send("🙅‍♂️ You do not have permission to use this command 🙅‍♂️")
    }
    // Dumb surprise
    if (message.content.toUpperCase().includes('!SURPRISE')) {
        client.users.forEach(user => {
            if (user.lastMessage) {
                if (user.lastMessage.content.toUpperCase() === '!SURPRISE ME') {
                    message.channel.send(`Are you surprised, ${user.username}?`);
                }
            }
        })
    }
    // Insult people using old timey insults
    if (message.content.toUpperCase().includes('!INSULT')) {
        const messageArray = message.content.split(" ");
        let breakLoop = false;
        client.users.forEach(user => {
            if (!breakLoop) {
                if (user.lastMessage && user.lastMessage.content.toUpperCase() === message.content.toUpperCase() && message.content.toUpperCase() === '!INSULT ME') {
                    message.channel.send(insults.randomInsultForMe());
                    breakLoop = true;
                } else if (message.isMemberMentioned(user) || message.content.toUpperCase().includes(`${user.username}`)) {
                    message.channel.send(insults.randomInsultForUser(user));
                    breakLoop = true;
                } else if (user.lastMessage && user.lastMessage.content.toUpperCase() === message.content.toUpperCase() && messageArray.length === 2) {
                    message.channel.send(insults.randomInsultForName(messageArray[1]));
                    breakLoop = true;
                }
            }
        })
    }
    // TODO: Make it to where madi isn't the only one muting people (add a role or something)
    // TODO: as well as make sure the message is contained in the channel #bot-commands
    // TODO: also make sure that dalton can mute ♥
    // Mute everyone in the voice channel message user is in
    if (message.content === '!mute' && ifServerOwner(message)) {
        if (message.member.voiceChannel) {
            let channel = message.member.voiceChannel;
            for (let member of channel.members) {
                member[1].setMute(true)
            }
            message.channel.send(`🤫 Muting everyone in ${message.member.voiceChannel.name}..`)
        } else {
            message.channel.send("You must be in a voice channel to use this command 💁‍♂️")
        }
    } else if (message.content === '!mute' && !ifServerOwner(message)) {
        message.channel.send("Fuck you I won't do what you tell me 😡")
    }
    // TODO: Make sure admin user can still unmute people individually?
    // Unmute everyone in the voice channel user is in
    if (message.content === '!unmute' && ifServerOwner(message)) {
        if (message.member.voiceChannel) {
            let channel = message.member.voiceChannel;
            for (let member of channel.members) {
                member[1].setMute(false) 
            }
            message.channel.send(`🎙 Unmuting everyone in ${message.member.voiceChannel.name}..`)
        } else {
            message.channel.send("You must be in a voice channel to use this command 💁‍♂️")
        }
    } else if (message.content === '!unmute' && !ifServerOwner(message)) {
        message.channel.send("YOU'RE NOT MY MOM! 😝")
    }

});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);