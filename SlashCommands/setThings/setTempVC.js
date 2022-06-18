const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/TempVoiceDB')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("set-tempvoice-channel")
        .setDescription("Set the tempvoice channel")
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

        )
        .addStringOption((option) =>
            option
                .setName("category")
                .setDescription("Set categoryid")
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
        const category = interaction.options.getString('category')

        db.findOne({ GuildID: guild }, async (err, data) => {
            if (err) throw err
            if (!data) {
                data = new db({
                    GuildID: guild,
                    ChannelID: channel,
                    ParentID: category
                })
                interaction.deleteReply()
                const embed1 = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Server Info')
                    .setDescription(`Temp channel set to ${channel}`)
                    .setFooter('Xilot')
                interaction.channel.send({ embeds: [embed1], ephemeral: true })
            } else {
                db.findOneAndUpdate({ GuildID: guild },
                    { $set: { ChannelID: channel, ParentID: category } },
                    { new: true }).exec((err, data) => {
                        console.error(err)
                    })
                    interaction.deleteReply()
                const updated = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Server Info')
                    .setDescription(`updated the Temp channel to <#${channel}>`)
                    .setFooter('Xilot')
                interaction.channel.send({ embeds: [updated], ephemeral: true })
            }
            data.save()
        })





    },
};