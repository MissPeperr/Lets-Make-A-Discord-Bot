const Discord = require('discord.js')
const auth = require('./auth.json')
const giphyManager = require("./giphy.js")
const insults = require('./insult.js')

// Create an instance of a Discord client
const client = new Discord.Client()

const ifServerOwner = (message) => message.guild.ownerID === message.member.id

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => console.log('I am ready!'))

// TODO: Change all these if/else's to damn switch/cases
// Create an event listener for messages
client.on('message', message => {
    let content = message.content.toUpperCase()

    // Lists available commands
    if (content === '.HELP') {
        message.channel.send(`▫\`.help\`\n▫\`.surprise me\`\n▫\`.surprise {@mention}\`\n▫\`.surprise {name}\`\n▫\`.insult me\`\n▫\`.insult {@mention}\`\n▫\`.insult {name}\`\n▫\`.ping\`\n${ifServerOwner(message) ? '▫\`.mute\`\n▫\`.unmute\`' : ''}`)
    }

    if (content === '.PING') {
        message.channel.send('pong')
    }

    // Print users to console
    if (content === '.LOG USERS' && ifServerOwner(message)) {
        client.users.forEach(user => {
            if (user.presence.status === 'online') {
                console.log(user)
            }
        })
        message.channel.send('Sending users except for Dalton...')
    } else if (content === '.LOG USERS' && ifServerOwner(message)) {
        message.channel.send("🙅‍♂️ You do not have permission to use this command 🙅‍♂️")
    }

    // Dumb surprise
    if (content.includes('.SURPRISE') && (message.member.user.id.toString() !== '600096634558218315')) {
        const text = content.split(" ")[1]
        if (text === 'ME') {
            giphyManager.surprise(message).then(x => message.channel.send(`Are you surprised, ${message.member.nickname}?`))
        } else if (text !== 'ME') {
            let [member] = Array.from(message.mentions.members.values())
            member ? giphyManager.surprise(message).then(x => message.channel.send(`Are you surprised, ${member.nickname ? member.nickname : member.user.username}?`))
                : giphyManager.surprise(message).then(x => message.channel.send(`Are you surprised, ${message.content.split(" ")[1]}?`))
        } else {
            giphyManager.surprise(message).then(x => message.channel.send(`Are you surprised, ${message.member.nickname}?`))

        }
    }

    // Insult people using old timey insults
    if (content.includes('.INSULT')) {
        const messageArray = content.split(" ")
        let breakLoop = false
        client.users.forEach(user => {
            if (!breakLoop) {
                if (user.lastMessage && user.lastMessage.content.toUpperCase() === content.toUpperCase() && content.toUpperCase() === '.INSULT ME') {
                    message.channel.send(insults.randomInsultForMe())
                    breakLoop = true
                } else if (message.isMemberMentioned(user) || content.toUpperCase().includes(`${user.username}`)) {
                    message.channel.send(insults.randomInsultForUser(user))
                    breakLoop = true
                } else if (user.lastMessage && user.lastMessage.content.toUpperCase() === content.toUpperCase() && messageArray.length === 2) {
                    message.channel.send(insults.randomInsultForName(messageArray[1]))
                    breakLoop = true
                }
            }
        })
    }

    
    // TODO: Allow people with an Among Us role to mute
    // TODO: Allow people with certain permissions to mute
    // TODO: Allow people to change whether or not they want the among us role to mute people or just admin users

    // Mute everyone in the voice channel message user is in. Command MUST be used in a channel called #bot-commands.
    if (content === '.MUTE' && (ifServerOwner(message)
        || message.member.user.username === 'Pumpkin Head Harvey'
        || Array.from(message.member.roles.values()).find(role => role.name === 'Server Stalin') || Array.from(message.member.roles.values()).find(role => role.name === 'Among Us'))) {
        if (message.member.voiceChannel && message.channel.name === 'bot-commands') {
            let channel = message.member.voiceChannel
            for (let member of channel.members) {
                member[1].setMute(true)
            }
            message.channel.send(`🤫 Muting everyone in ${message.member.voiceChannel.name}...`)
        } else if (message.member.voiceChannel && message.channel.name !== 'bot-commands') {
            message.channel.send(`Please use the <#${message.guild.channels.find(chnl => chnl.name === 'bot-commands').id}> channel 🤖`)
        } else {
            message.channel.send("You must be in a voice channel to use this command 💁‍♂️")
        }
    } else if (content === '.MUTE' && !ifServerOwner(message)) {
        message.channel.send("Fuck you I won't do what you tell me 😡")
    }

    // Mute everyone in the voice channel message user is in. Command MUST be used in a channel called #bot-commands.
    if (content === '.UNMUTE' && (ifServerOwner(message)
    || message.member.user.username === 'Pumpkin Head Harvey'
    || Array.from(message.member.roles.values()).find(role => role.name === 'Server Stalin') || Array.from(message.member.roles.values()).find(role => role.name === 'Among Us'))) {
        if (message.member.voiceChannel && message.channel.name === 'bot-commands') {
            let channel = message.member.voiceChannel
            for (let member of channel.members) {
                member[1].setMute(false)
            }
            message.channel.send(`🎙 Unmuting everyone in ${message.member.voiceChannel.name}...`)
        } else if (message.member.voiceChannel && message.channel.name !== 'bot-commands') {
            message.channel.send(`Please use the <#${message.guild.channels.find(chnl => chnl.name === 'bot-commands').id}> channel 🤖`)
        } else {
            message.channel.send("You must be in a voice channel to use this command 💁‍♂️")
        }
    } else if (content === '.UNMUTE' && !ifServerOwner(message)) {
        message.channel.send("YOU'RE NOT MY MOM! 😝")
    }

    // For funsies
    if (content === '.FUNTIMES') {
        giphyManager.fun(message)
    }

    // If someone wanted to thank Clarence
    if (content === 'I LOVE YOU CLARENCE' || content === 'GOOD JOB CLARENCE' || content === 'THANK YOU CLARENCE') {
        message.channel.send(`Thank you ${message.member.nickname}! I'm trying my best ♥`)
    }

})

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token)