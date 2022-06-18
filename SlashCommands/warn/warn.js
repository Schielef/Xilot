const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/WarnDB')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("warn")
        .setDescription("warn a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User to warn")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("Reason for the warn")
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
            .setDescription("You need MANAGE_MESSAGES permissions to use this command")
            .setFooter('Xilot')
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.editReply({ embeds: [noPermissions], ephemeral: true })

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason')


        db.findOne({ guildid: interaction.guild.id, user: user }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new db({
                    guildid: interaction.guild.id,
                    user: user,
                    content: [
                        {
                            moderator: interaction.author,
                            reason: reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: interaction.author,
                    reason: reason
                }
                data.content.push(obj)
            }
            data.save()
            interaction.deleteReply()
            const fertig = new MessageEmbed()
                .setTitle('Server Info')
                .setColor('GREEN')
                .setDescription('Warned the user')
                .setFooter('Xilot')
            interaction.channel.send({ embeds: [fertig], ephemeral: true })
        })
    },
};