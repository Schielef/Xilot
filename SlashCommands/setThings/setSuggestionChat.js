const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/SuggestionSetDB')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("set-suggestion-channel")
        .setDescription("Set the Suggestion channels")
        .addStringOption((option) =>
            option
                .setName("guild")
                .setDescription("Set guildID")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("sendinto")
                .setDescription("Set channelID from the channel where the Suggestion should be send in")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("createdin")
                .setDescription("Set channelID from the channel where the Suggestion should be created")
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
        const SendTo = interaction.options.getString('sendinto');
        const CreateIn = interaction.options.getString('createdin');

        db.findOne({ GuildID: guild }, async (err, data) => {
            if (err) throw err
            if (!data) {
                data = new db({
                    GuildID: guild,
                    SendToID: SendTo,
                    CreatedID: CreateIn
                })
                interaction.deleteReply()
                const embed1 = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Server Info')
                    .setDescription(`Set!`)
                    .setFooter('Xilot')
                interaction.channel.send({ embeds: [embed1], ephemeral: true })
            } else {
                db.findOneAndUpdate({ GuildID: guild },
                    { $set: { SendToID: SendTo, CreatedID: CreateIn } },
                    { new: true }).exec((err, data) => {
                        console.error(err)
                    })
                    interaction.deleteReply()
                const updated = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Server Info')
                    .setDescription(`updated the Suggestion channel`)
                    .setFooter('Xilot')
                interaction.channel.send({ embeds: [updated], ephemeral: true })
            }
            data.save()
        })





    },
};