const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const db = require('../schemas/membercountDB')
const client = require('../index')

client.on('guildMemberAdd', async (member) => {
    db.findOne({ GuildID: member.guild.id }, async (err, data) => {
        if (err) throw err
        if (data) {

            const guild = client.guilds.cache.get(data.GuildID)

            const channel = guild.channels.cache.get(data.ChannelID)

            channel.setName(`🥂 | Member: ${guild.memberCount}`).catch(console.error)

        } else {
            return
        }
    })
})