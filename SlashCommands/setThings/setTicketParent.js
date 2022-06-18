const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/TicketDB')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("set-ticket-options")
        .setDescription("Set the Ticket options")
        .addStringOption((option) =>
            option
                .setName("guild")
                .setDescription("Set guildID")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("support")
                .setDescription("Set the Role that should have access to the tickets")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("category")
                .setDescription("Set the catecory where the tickets should be created")
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
        const ParentID = interaction.options.getString('category');
        const SupportRoleID = interaction.options.getString('support')

        db.findOne({ GuildID: guild }, async (err, data) => {
            if (err) throw err
            if (!data) {
                data = new db({
                    GuildID: guild,
                    ParentID: ParentID,
                    SupportID: SupportRoleID
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
                    { $set: { ParentID: ParentID, SupportID: SupportRoleID } },
                    { new: true }).exec((err, data) => {
                        console.error(err)
                    })
                    interaction.deleteReply()
                const updated = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Server Info')
                    .setDescription(`updated the DB`)
                    .setFooter('Xilot')
                interaction.channel.send({ embeds: [updated], ephemeral: true })
            }
            data.save()
        })





    },
};