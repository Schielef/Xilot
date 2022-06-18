const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('../../schemas/WarnDB')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("remove-warn")
        .setDescription("remove a users warn")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User to remove a warn from")
                .setRequired(true)

        )
        .addStringOption((option) =>
            option
                .setName("warnnumber")
                .setDescription("Number of warn to remove")
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
        const warnnumber = interaction.options.getString('warnnumber')


        db.findOne({ guildid: interaction.guild.id, user: user }, async (err, data) => {
            if (err) throw err;
            if (data) {
                let number = parseInt(warnnumber) - 1
                data.content.splice(number, 1)
                interaction.deleteReply()
                interaction.channel.send({ content: 'deleted the warn', ephemeral: true })

                data.save()
            } else {
                interaction.deleteReply()
                interaction.channel.send({ content: 'This user does not have any warns in this server!', ephemeral: true })
            }

        })
    },
};