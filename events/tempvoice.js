const client = require('../index')
const Discord = require('discord.js')
const db = require('../schemas/TempVoiceDB')

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

client.on('voiceStateUpdate', (newState) => {

    db.findOne({ GuildID: newState.guild.id }, async (err, data) => {
        if (err) throw err
        if (data) {

            tempChannels.registerChannel(data.ChannelID, {
                childCategory: data.ParentID,
                childAutoDeleteIfEmpty: true,
                childFormat: (member, count) => `#${count} | ${member.user.username}'s Talk`
            });

        } else {
            return
        }
    })
})
