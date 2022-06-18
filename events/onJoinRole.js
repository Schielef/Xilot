const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const db = require('../schemas/onJoinRole')
const client = require('../index')


client.on('guildMemberAdd', async (member) => {
    db.findOne({ GuildID: member.guild.id }, async (err, data) => {
        if (err) throw err
        if (data) {

            const role = member.guild.roles.cache.find(r => r.id === data.RoleID)
            member.roles.add(role)

        } else {
            return
        }
    })
})