const { Client, Collection, version } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);


const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

const { Fish } = require('anti-phish-advanced');
const fish = new Fish();

client.on('phishingMessage', (message, data) => {
    message.delete()

    const memberid = message.author.id
    const member = message.guild.members.cache.get(memberid)

    member.timeout(ms('1h'), 'scam link').catch(() => { })

    console.log(`Timeouted ${member.username}`);

});

const { GiveawaysManager } = require('discord-giveaways')

client.giveaways = new GiveawaysManager(client, {
    storage: './SlashCommands/giveaway/giveaway.json',
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉",
        lastChance: {
            enabled: true,
            content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
            threshold: 5000,
            embedColor: '#FF0000'
        }
    }
})

//Initialize the anti-phish 
fish.init(client, version);
//Log into discord
client.login(client.config.token);
