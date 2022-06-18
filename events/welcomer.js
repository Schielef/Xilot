const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const db = require('../schemas/welcomerDB')
const client = require('../index')
const ultrax = require('ultrax')


client.on('guildMemberAdd', async (member) => {
    db.findOne({ GuildID: member.guild.id }, async (err, data) => {
        if (err) throw err
        if (data) {

            let bg = 'https://cdn.discordapp.com/attachments/731224782665678990/924659966290305054/background.png'
            let avatar = member.user.displayAvatarURL({ format: "png" })
            let text1 = "welcome"
            let text2 = member.user.tag
            let text3 = `You're the ${member.guild.memberCount}. member`
            let color = '#696969'
            const welcomechannel = client.channels.cache.get(data.ChannelID)
            const options = {
                font: "sans-serif",
                attachmentName: `welcome-${member.id}.png`,
                text1_fontSize: 40,
                text2_fontSize: 50,
                text3_fontSize: 30
            }

            const image = await ultrax.welcomeImage(bg, avatar, text1, text2, text3, color, options)

            welcomechannel.send({ files: [image] })

        } else {
            return
        }
    })
})