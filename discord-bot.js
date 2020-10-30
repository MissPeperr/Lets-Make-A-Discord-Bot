const Discord = require('discord.js')
const { prefix, token } = require('./config.json')
const giphyManager = require("./giphy.js")
const insults = require('./insult.js')

// Create an instance of a Discord client
const client = new Discord.Client()

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token)

const ifServerOwner = (message) => message.guild.ownerID === message.member.id

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => console.log('I am ready!'))

// Create an event listener for messages
client.on('message', message => {
    let content = message.content.toUpperCase().split(" ")

    switch (content[0]) {
        // Lists available commands
        case `${prefix}HELP`:
            message.channel.send(`▫\`.help\`\n▫\`.surprise me\`\n▫\`.surprise {@mention}\`\n▫\`.surprise {name}\`\n▫\`.insult me\`\n▫\`.insult {@mention}\`\n▫\`.insult {name}\`\n▫\`.ping\`\n${ifServerOwner(message) ? '▫\`.mute\`\n▫\`.unmute\`' : ''}`)
            break

        case `${prefix}PING`:
            message.channel.send('pong')
            break

        // Print users to console
        case `${prefix}LOGUSERS`:
            if (ifServerOwner(message)) {
                client.users.forEach(user => {
                    if (user.presence.status === 'online') {
                        console.log(user)
                    }
                })
                message.channel.send('Sending users except for Dalton...')
            } else {
                message.channel.send("🙅‍♂️ You do not have permission to use this command 🙅‍♂️")
            }
            break

        // Dumb surprise
        case `${prefix}SURPRISE`:
            if (!message.author.bot) {
                const surpriseArgs = content[1]
                if (args === 'ME') {
                    giphyManager.surprise(message).then(x => message.channel.send(`Are you surprised, ${message.member.nickname}?`))
                } else if (surpriseArgs !== 'ME') {
                    let [member] = Array.from(message.mentions.members.values())
                    member ? giphyManager.surprise(message)
                        .then(x => message.channel.send(`Are you surprised, ${member.nickname ? member.nickname : member.user.username}?`)) 
                        : giphyManager.surprise(message).then(x => message.channel.send(`Are you surprised, ${message.content.split(" ")[1]}?`))
                } else {
                    giphyManager.surprise(message).then(x => message.channel.send(`Are you surprised, ${message.member.nickname}?`))
                }
            }
            break
    
        // Insult people using old timey insults
        case `${prefix}INSULT`:
            const insultArgs = content[1]
            const [member] = Array.from(message.mentions.members.values())
            if (member) {
                message.channel.send(insults.randomInsultForUser(member.user))
            } else if (insultArgs === 'ME') {
                message.channel.send(insults.randomInsultForMe())
            } else (
                message.channel.send(insults.randomInsultForName(message.content.split(" ")[1]))
            )
            break
        
        // TODO: Allow people to change whether or not they want the among us role to mute people or just admin users

        // Mute everyone in the voice channel message user is in
        case `${prefix}MUTE`:
            if (ifServerOwner(message) || Array.from(message.member.roles.values()).find(role => role.name === 'Among Us')) {
                if (message.member.voiceChannel) {
                    let channel = message.member.voiceChannel
                    for (let member of channel.members) {
                        member[1].setMute(true)
                    }
                    message.channel.send(`Shhhh... 🤫 Muting everyone in ${message.member.voiceChannel.name}...`)
                } else {
                    message.channel.send("You must be in a voice channel to use this command 💁‍♂️")
                }
            } else {
                message.channel.send("Fuck you I won't do what you tell me 😡")
            }
            break
        
        // Unmute everyone in the voice channel message user is in
        case `${prefix}UNMUTE`:
            if (ifServerOwner(message) || Array.from(message.member.roles.values()).find(role => role.name === 'Among Us')) {
                if (message.member.voiceChannel) {
                    let channel = message.member.voiceChannel
                    for (let member of channel.members) {
                        member[1].setMute(false)
                    }
                    message.channel.send(`Discuss! 🎙 Unmuting everyone in ${message.member.voiceChannel.name}...`)
                } else {
                    message.channel.send("You must be in a voice channel to use this command 💁‍♂️")
                }
            } else {
                message.channel.send("YOU'RE NOT MY MOM! 😝")
            }
            break
        
        // TODO: Make funtimes a customizable command?
        // For funsies
        case `${prefix}FUNTIMES`:
            giphyManager.fun(message)
            break
        
        default:
            break
    }

    // If someone wanted to thank Clarence
    if (content.join(' ') === 'I LOVE YOU CLARENCE' || content.join(' ') === 'GOOD JOB CLARENCE' || content.join(' ') === 'THANK YOU CLARENCE') {
        console.log(message)
        message.channel.send(`Thank you ${message.member.nickname}! I'm trying my best ♥`)
    }

})