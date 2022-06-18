const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/onJoinRole')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("set-joinrole")
        .setDescription("Set the Auto Join role")
        .addStringOption((option) =>
            option
                .setName("guild")
                .setDescription("Set guildID")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("role")
                .setDescription("Set the roleid")
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
        const roleid = interaction.options.getString('role');

        db.findOne({ GuildID: guild }, async (err, data) => {
            if (err) throw err
            if (!data) {
                data = new db({
                    GuildID: guild,
                    RoleID: roleid,
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
                    { $set: { RoleID: roleid } },
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