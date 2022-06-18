const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const ms = require('ms')

module.exports = {
    ...new SlashCommandBuilder()
        .setName("ga-end")
        .setDescription("end a giveaway")
        .addStringOption((option) =>
            option
                .setName("ga_message_id")
                .setDescription("Giveaway Message ID")
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


        const messageId = interaction.options.getString('ga_message_id')

        client.giveaways.end(messageId).then(() => {

            const willEnd = new MessageEmbed()
                .setColor('AQUA')
                .setTitle('Server Info')
                .setDescription(`Giveaway ended!`)
                .setFooter('Xilot')
            interaction.reply({ embeds: [willEnd], ephemeral: true })
        }).catch(error => {
            console.error(error)
            interaction.deleteReply()
            const errorMessage = new MessageEmbed()
                .setColor('RED')
                .setTitle('Server Info')
                .setDescription('An error occurred')
                .setFooter('Xilot')
            interaction.channek.send({ embeds: [errorMessage], ephemeral: true })
        })

    },
};