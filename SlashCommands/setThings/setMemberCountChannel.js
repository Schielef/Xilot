const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/membercountDB')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("set-membercount-channel")
        .setDescription("Set the Membercount channel")
        .addStringOption((option) =>
            option
                .setName("guild")
                .setDescription("Set guildID")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("channel")
                .setDescription("Set channelID")
                .setRequired(true)

        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        const noPermissions = new MessageEmbed()
            .setColor('RED')
            .setTitle('Server Info')
            .setDescription("You need ADMINISTRATOR permissions to use this command")
            .setFooter('Xilot')
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.editReply({ embeds: [noPermissions], ephemeral: true })

        const guild = interaction.options.getString('guild')
        const channel = interaction.options.getString('channel');

        db.findOne({ GuildID: guild }, async (err, data) => {
            if (err) throw err
            if (!data) {
                data = new db({
                    GuildID: guild,
                    ChannelID: channel
                })
                interaction.deleteReply()
                const embed1 = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Server Info')
                    .setDescription(`Membercount channel set to ${channel}`)
                    .setFooter('Xilot')
                interaction.channel.send({ embeds: [embed1], ephemeral: true })
            } else {
                db.findOneAndUpdate({ GuildID: guild },
                    { $set: { ChannelID: channel } },
                    { new: true }).exec((err, data) => {
                        console.error(err)
                    })
                    interaction.deleteReply()
                const updated = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Server Info')
                    .setDescription(`updated the membercount channel to <#${channel}>`)
                    .setFooter('Xilot')
                interaction.channel.send({ embeds: [updated], ephemeral: true })
            }
            data.save()
        })





    },
};